// scripts/exportNicknames.ts
import { readFileSync } from 'fs';
import { join } from 'path';
import * as XLSX from 'xlsx';
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

interface NicknameCorrection {
  nickname: string;
  corrected_nickname: string;
}

async function exportNicknames(): Promise<void> {
  try {
    // Read the raw video data
    const rawData: RawVideo[] = JSON.parse(
      readFileSync(join(process.cwd(), 'public', 'data', 'results.json'), 'utf8')
    );

    // Read and parse the corrections CSV
    const correctionsCSV = readFileSync(join(process.cwd(), 'public', 'data', 'correct-names.csv'), 'utf8');
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

    // Process data for Excel
    const worksheetData = rawData.map(video => {
      // Combine all nicknames and apply corrections
      const allOriginalNicknames = [
        ...(video.whisperRegexNicknames || []),
        ...(video.whisperGPTNicknames || []),
        ...(video.deepgramRegexNicknames || []),
        ...(video.deepgramGPTNicknames || [])
      ];

      const correctedNicknames = correctNicknames(allOriginalNicknames);
      const uniqueCorrectedNicknames = Array.from(new Set(correctedNicknames));

      return {
        'Video ID': video.videoId,
        'Title': video.title,
        'Link': video.link,
        'Original Nicknames': allOriginalNicknames.join(', '),
        'Corrected Nicknames': uniqueCorrectedNicknames.join(', '),
        'Original Count': allOriginalNicknames.length,
        'Corrected Count': uniqueCorrectedNicknames.length
      };
    });

    // Create summary of all corrected unique nicknames
    const correctedNicknameFrequency = new Map<string, number>();
    rawData.forEach(video => {
      const correctedNicknames = correctNicknames([
        ...(video.whisperRegexNicknames || []),
        ...(video.whisperGPTNicknames || []),
        ...(video.deepgramRegexNicknames || []),
        ...(video.deepgramGPTNicknames || [])
      ]);

      correctedNicknames.forEach(nickname => {
        correctedNicknameFrequency.set(
          nickname, 
          (correctedNicknameFrequency.get(nickname) || 0) + 1
        );
      });
    });

    const summaryData = Array.from(correctedNicknameFrequency.entries())
      .map(([nickname, count]) => ({
        'Nickname': nickname,
        'Frequency': count,
        'Percentage': `${((count / rawData.length) * 100).toFixed(2)}%`
      }))
      .sort((a, b) => b.Frequency - a.Frequency);

    // Create comparison data showing original vs corrected
    const comparisonData = Array.from(nicknameCorrections.entries())
      .filter(([_, corrected]) => corrected !== 'NA')
      .map(([original, corrected]) => ({
        'Original Nickname': original,
        'Corrected Nickname': corrected,
        'Frequency': correctedNicknameFrequency.get(corrected) || 0
      }))
      .sort((a, b) => b.Frequency - a.Frequency);

    // Create workbook
    const workbook = XLSX.utils.book_new();

    // Add videos worksheet
    const videosWorksheet = XLSX.utils.json_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, videosWorksheet, 'Videos');

    // Add corrected nicknames summary worksheet
    const summaryWorksheet = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summaryWorksheet, 'Corrected Nicknames Summary');

    // Add nickname mapping worksheet
    const comparisonWorksheet = XLSX.utils.json_to_sheet(comparisonData);
    XLSX.utils.book_append_sheet(workbook, comparisonWorksheet, 'Nickname Mapping');

    // Write to file
    XLSX.writeFile(workbook, 'corrected_nickname_analysis.xlsx');

    console.log('Excel file generated successfully!');
    console.log('Total videos:', rawData.length);
    console.log('Total unique corrected nicknames:', correctedNicknameFrequency.size);
    console.log('Original nicknames mapped:', nicknameCorrections.size);
    console.log('Nicknames marked as NA:', 
      parsedCorrections.data.filter(row => row.corrected_nickname === 'NA').length
    );

  } catch (error) {
    console.error('Error exporting nicknames:', error);
    throw error;
  }
}

// Run the export
exportNicknames();