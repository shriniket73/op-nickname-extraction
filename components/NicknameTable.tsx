import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

const NicknameTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

// Check if quiz is completed from localStorage
const isQuizCompleted =
  typeof window !== 'undefined' &&
  localStorage.getItem('quizState') !== null &&
  JSON.parse(localStorage.getItem('quizState') || '{}').isCompleted;

// If quiz isn't completed, show message
if (!isQuizCompleted) {
  return (
    <div className="quiz-card bg-[#F5F5F5] rounded-xl shadow-lg p-8 text-center space-y-6 max-w-2xl mx-auto">
      <h2 className="font-chomiku text-2xl text-[#1A1A1A]">
        Complete the Quiz First!
      </h2>
      <p className="font-chomiku text-[#4A4A4A]">
        Take the OG Gang Quiz to unlock the complete list of all nicknames and see how many times they appeared in videos!
      </p>
    </div>
  );
}

  
  const data = [
    { nickname: "Rider OP", frequency: 108 },
    { nickname: "Writer OP", frequency: 100 },
    { nickname: "Shauhar OP", frequency: 94 },
    { nickname: "Prisoner OP", frequency: 90 },
    { nickname: "Banker OP", frequency: 46 },
    { nickname: "Streamer OP", frequency: 26 },
    { nickname: "Gamer OP", frequency: 18 },
    { nickname: "Printer OP", frequency: 15 },
    { nickname: "Subscriber OP", frequency: 13 },
    { nickname: "Advertiser OP", frequency: 13 },
    { nickname: "Hustler OP", frequency: 8 },
    { nickname: "Provider OP", frequency: 8 },
    { nickname: "Simplifier OP", frequency: 7 },
    { nickname: "Kidnapper OP", frequency: 6 },
    { nickname: "Sider OP", frequency: 6 },
    { nickname: "Manager OP", frequency: 5 },
    { nickname: "Amplifier OP", frequency: 5 },
    { nickname: "Player OP", frequency: 5 },
    { nickname: "Rapper OP", frequency: 4 },
    { nickname: "Banger OP", frequency: 4 },
    { nickname: "Father OP", frequency: 4 },
    { nickname: "Shayar OP", frequency: 4 },
    { nickname: "Satisfier OP", frequency: 4 },
    { nickname: "Vlogger OP", frequency: 3 },
    { nickname: "Divider OP", frequency: 3 },
    { nickname: "Struggler OP", frequency: 3 },
    { nickname: "Slower OP", frequency: 2 },
    { nickname: "Blogger OP", frequency: 2 },
    { nickname: "Dancer OP", frequency: 2 },
    { nickname: "Pranker OP", frequency: 2 },
    { nickname: "Humidifier OP", frequency: 2 },
    { nickname: "Cheerleader OP", frequency: 2 },
    { nickname: "Engineer OP", frequency: 2 },
    { nickname: "Driver OP", frequency: 2 },
    { nickname: "Conqueror OP", frequency: 2 },
    { nickname: "Sniper OP", frequency: 2 },
    { nickname: "Paneer OP", frequency: 1 },
    { nickname: "Mind Fryer OP", frequency: 1 },
    { nickname: "Keeper OP", frequency: 1 },
    { nickname: "Actor OP", frequency: 1 },
    { nickname: "Plumber OP", frequency: 1 },
    { nickname: "Her OP", frequency: 1 },
    { nickname: "Poker OP", frequency: 1 },
    { nickname: "Shopkeeper OP", frequency: 1 },
    { nickname: "Butler OP", frequency: 1 },
    { nickname: "Talker OP", frequency: 1 },
    { nickname: "Shooter OP", frequency: 1 },
    { nickname: "Insider OP", frequency: 1 },
    { nickname: "Producer OP", frequency: 1 },
    { nickname: "Pioneer OP", frequency: 1 },
    { nickname: "Brighter OP", frequency: 1 },
    { nickname: "Clasher OP", frequency: 1 },
    { nickname: "Leader OP", frequency: 1 },
    { nickname: "Reservoir OP", frequency: 1 },
    { nickname: "Survivor OP", frequency: 1 },
    { nickname: "Reviewer OP", frequency: 1 },
    { nickname: "Sober OP", frequency: 1 },
    { nickname: "Doppelganger OP", frequency: 1 },
    { nickname: "Diver OP", frequency: 1 },
    { nickname: "Mixer OP", frequency: 1 },
    { nickname: "Zagger OP", frequency: 1 },
    { nickname: "Mother OP", frequency: 1 },
    { nickname: "Theater OP", frequency: 1 },
    { nickname: "Yorker OP", frequency: 1 },
    { nickname: "Annihilator OP", frequency: 1 },
    { nickname: "Brother OP", frequency: 1 },
    { nickname: "Thakkar OP", frequency: 1 },
    { nickname: "Seducer OP", frequency: 1 },
    { nickname: "Lover OP", frequency: 1 },
    { nickname: "Happier OP", frequency: 1 },
    { nickname: "Fighter OP", frequency: 1 },
    { nickname: "Sexualizer OP", frequency: 1 },
    { nickname: "Collider OP", frequency: 1 },
    { nickname: "Master OP", frequency: 1 },
    { nickname: "Multiplier OP", frequency: 1 },
    { nickname: "Air Purifier OP", frequency: 1 },
    { nickname: "Philosopher OP", frequency: 1 },
    { nickname: "Shakya OP", frequency: 1 },
    { nickname: "Commander OP", frequency: 1 },
    { nickname: "Carrier OP", frequency: 1 },
    { nickname: "Hacker OP", frequency: 1 }
  ];

  const handleSort = (key: string | null) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = (data: { nickname: string; frequency: number; }[]) => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (sortConfig.key === 'nickname') {
        if (sortConfig.direction === 'ascending') {
          return a.nickname.localeCompare(b.nickname);
        }
        return b.nickname.localeCompare(a.nickname);
      } else {
        if (sortConfig.direction === 'ascending') {
          return a.frequency - b.frequency;
        }
        return b.frequency - a.frequency;
      }
    });
  };

  const getSortIcon = (columnName: string | null) => {
    if (sortConfig.key !== columnName) {
      return <ArrowUpDown className="w-4 h-4 ml-1" />;
    }
    return sortConfig.direction === 'ascending' ? 
      <ArrowUp className="w-4 h-4 ml-1" /> : 
      <ArrowDown className="w-4 h-4 ml-1" />;
  };

  const filteredData = getSortedData(
    data.filter(item => 
      item.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalNicknames = data.length;
  const totalAppearances = data.reduce((sum, item) => sum + item.frequency, 0);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-[#F5F5F5]">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 rounded-xl">
          <div className="text-center p-4 bg-[#F5F5F5] rounded-xl">
            <p className="font-chomiku text-lg text-[#1A1A1A]">Total Unique Nicknames</p>
            <p className="font-chomiku text-3xl text-[#2D2D2D]">{totalNicknames}</p>
          </div>
          <div className="text-center p-4 bg-[#F5F5F5] rounded-xl">
            <p className="font-chomiku text-lg text-[#1A1A1A]">Total Appearances</p>
            <p className="font-chomiku text-3xl text-[#2D2D2D]">{totalAppearances}</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search nicknames..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm mx-auto font-chomiku text-[#1A1A1A]"
          />
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className="bg-[#F5F5F5]">
              <tr>
                <th 
                  className="text-left p-4 font-chomiku text-[#1A1A1A] cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('nickname')}
                >
                  <div className="flex items-center">
                    Nickname
                    {getSortIcon('nickname')}
                  </div>
                </th>
                <th 
                  className="text-right p-4 font-chomiku text-[#1A1A1A] cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('frequency')}
                >
                  <div className="flex items-center justify-end">
                    Frequency
                    {getSortIcon('frequency')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item: { nickname: boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | React.Key | null | undefined; frequency: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: number) => (
                <tr 
                  key={item.nickname}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-[#F5F5F5]'}
                >
                  <td className="text-left p-4 font-chomiku text-[#1A1A1A]">
                    {item.nickname}
                  </td>
                  <td className="text-right p-4 font-chomiku text-[#1A1A1A]">
                    {item.frequency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-sm text-[#4A4A4A] font-chomiku">
          Showing {filteredData.length} nicknames
        </p>
        <p className="text-center text-xs text-[#4A4A4A] font-chomiku">
          Note: The data is extracted automatically and may not be 100% accurate.
        </p>
      </div>
    </div>
  );
};

export default NicknameTable;