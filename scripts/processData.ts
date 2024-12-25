// scripts/processData.ts
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import Papa from 'papaparse';

interface RawVideo {
  videoId: string;
  title: string;
  link: string;
  whisperRegexNicknames: string[];
  whisperGPTNicknames: string[];
  deepgramRegexNicknames: string[];
  deepgramGPTNicknames: string[];
  processedAt: string;
}

interface ProcessedVideo {
  title: string;
  link: string;
  thumbnailUrl: string;
  nicknames: string[];
}

interface NicknameData {
  nickname: string;
  frequency: number;
  videos: string[]; // videoIds
}

interface ProcessedData {
  metadata: {
    totalVideos: number;
    totalUniqueNicknames: number;
    lastProcessedAt: string;
  };
  uniqueNicknames: NicknameData[];
  videoData: {
    [videoId: string]: ProcessedVideo;
  };
  analytics: {
    mostUsedNicknames: Array<{nickname: string; count: number}>;
    nicknameFrequencyDistribution: Array<{frequency: number; count: number}>;
    timelineData: Array<{date: string; newNicknames: string[]}>;
  };
}

interface NicknameCorrection {
  nickname: string;
  corrected_nickname: string;
}

async function processData(): Promise<void> {
  try {
    // Read the raw data
    const rawData: RawVideo[] = JSON.parse(
      readFileSync(join(process.cwd(), 'public', 'data', 'results.json'), 'utf8')
    );

    // Read and parse the corrections CSV
    const correctionsCSV = readFileSync(
      join(process.cwd(), 'public', 'data', 'correct-names.csv'), 
      'utf8'
    );
    const parsedCorrections = Papa.parse<NicknameCorrection>(correctionsCSV, {
      header: true,
      skipEmptyLines: true
    });

    // Create corrections map
    const nicknameCorrections = new Map<string, string>();
    parsedCorrections.data.forEach(row => {
      nicknameCorrections.set(row.nickname, row.corrected_nickname);
    });

    // Function to correct and filter nicknames
    const correctNicknames = (nicknames: string[]): string[] => {
      return nicknames
        .map(nickname => nicknameCorrections.get(nickname))
        .filter((corrected): corrected is string => 
          corrected !== undefined && corrected !== 'NA'
        );
    };

    // Initialize data structures
    const nicknameMap = new Map<string, NicknameData>();
    const videoData: { [videoId: string]: ProcessedVideo } = {};
    const timelineMap = new Map<string, Set<string>>();

    // Process each video
    rawData.forEach(video => {
      // Get corrected nicknames
      const correctedNicknames = correctNicknames([
        ...(video.whisperRegexNicknames || []),
        ...(video.whisperGPTNicknames || []),
        ...(video.deepgramRegexNicknames || []),
        ...(video.deepgramGPTNicknames || [])
      ]);

      // Remove duplicates
      const uniqueCorrectedNicknames = Array.from(new Set(correctedNicknames));

      // Store video data
      videoData[video.videoId] = {
        title: video.title,
        link: video.link,
        thumbnailUrl: `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`,
        nicknames: uniqueCorrectedNicknames
      };

      // Update nickname statistics
      uniqueCorrectedNicknames.forEach(nickname => {
        if (!nicknameMap.has(nickname)) {
          nicknameMap.set(nickname, {
            nickname,
            frequency: 0,
            videos: []
          });
        }
        const nicknameData = nicknameMap.get(nickname)!;
        nicknameData.frequency += 1;
        nicknameData.videos.push(video.videoId);
      });

      // Track timeline data
      const date = new Date(video.processedAt).toISOString().split('T')[0];
      if (!timelineMap.has(date)) {
        timelineMap.set(date, new Set());
      }
      uniqueCorrectedNicknames.forEach(nickname => {
        timelineMap.get(date)?.add(nickname);
      });
    });

    // Generate analytics
    const sortedNicknames = Array.from(nicknameMap.values())
      .sort((a, b) => b.frequency - a.frequency);

    const frequencyDistribution = new Map<number, number>();
    sortedNicknames.forEach(({ frequency }) => {
      frequencyDistribution.set(frequency, (frequencyDistribution.get(frequency) || 0) + 1);
    });

    const timelineData = Array.from(timelineMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, nicknames]) => ({
        date,
        newNicknames: Array.from(nicknames)
      }));

    // Construct final processed data
    const processedData: ProcessedData = {
      metadata: {
        totalVideos: rawData.length,
        totalUniqueNicknames: nicknameMap.size,
        lastProcessedAt: new Date().toISOString()
      },
      uniqueNicknames: sortedNicknames,
      videoData,
      analytics: {
        mostUsedNicknames: sortedNicknames
          .slice(0, 20)
          .map(({ nickname, frequency }) => ({ nickname, count: frequency })),
        nicknameFrequencyDistribution: Array.from(frequencyDistribution.entries())
          .map(([frequency, count]) => ({ frequency, count }))
          .sort((a, b) => a.frequency - b.frequency),
        timelineData
      }
    };

    // Write processed data to file
    const outputPath = join(process.cwd(), 'public', 'data', 'processed_data.json');
    writeFileSync(
      outputPath,
      JSON.stringify(processedData, null, 2)
    );

    console.log('Data processing completed successfully!');
    console.log(`Total videos processed: ${processedData.metadata.totalVideos}`);
    console.log(`Total unique nicknames after corrections: ${processedData.metadata.totalUniqueNicknames}`);
    console.log(`Output saved to: ${outputPath}`);

  } catch (error) {
    console.error('Error processing data:', error);
    throw error;
  }
}

// Run the processing
processData();