import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Gift } from 'lucide-react';
import type { MonthMilestone } from '../data/loveStory';
import { MonthNode } from './MonthNode';
import { BubuDudu } from './BubuDudu';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface MemoryRoadmapProps {
  months: MonthMilestone[];
  onSelectMonth: (monthNumber: number) => void;
  onOpenReasons: () => void;
  onOpenFinale: () => void;
}

export const MemoryRoadmap: React.FC<MemoryRoadmapProps> = ({
  months,
  onSelectMonth,
  onOpenReasons,
  onOpenFinale,
}) => {
  const { playHeartPop } = useSoundEffects();

  return (
    <div className="min-h-screen w-full relative py-12 px-4 sm:px-6 bg-gradient-to-b from-[#250B54] via-[#330F6C] to-[#160333] text-white overflow-x-hidden">
      {/* Background galaxy nebulas */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-purple-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-pink-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 left-20 w-96 h-96 rounded-full bg-indigo-500/15 blur-[120px] pointer-events-none" />

      {/* Main Roadmap Header */}
      <div className="max-w-4xl mx-auto text-center mb-10 relative z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-300/30 text-pink-200 text-xs font-semibold mb-3">
          <Sparkles className="w-4 h-4 text-pink-300" />
          <span>Our Twelve-Month Love Roadmap</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 drop-shadow-[0_0_20px_#C084FC]">
          Our First Year, Written in the Stars 💜
        </h1>
        <p className="font-romantic text-2xl sm:text-3xl text-pink-200 max-w-xl mx-auto">
          "Twelve months, countless memories, one love story."
        </p>

        {/* Mascot Greeting */}
        <div className="mt-4 mb-2">
          <BubuDudu action="holding-hands" size="sm" speech="Tap a month to explore our scrapbook! 🗺️" />
        </div>

        {/* Feature Navigation Quick Access Hub */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playHeartPop();
              onOpenReasons();
            }}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-pink-500/80 to-purple-600/80 hover:from-pink-500 hover:to-purple-600 text-white font-medium text-xs sm:text-sm border border-pink-300/40 shadow-md flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
          >
            <Heart className="w-4 h-4 fill-pink-300 text-pink-300" />
            <span>Reasons I Love You</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playHeartPop();
              onOpenFinale();
            }}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm border border-pink-200/50 shadow-lg shadow-pink-600/30 flex items-center gap-1.5 cursor-pointer animate-pulse"
          >
            <Gift className="w-4 h-4" />
            <span>Final Anniversary Gift 🎁</span>
          </motion.button>
        </div>
      </div>

      {/* The Roadmap Path Stage */}
      <div className="max-w-4xl mx-auto relative z-20 py-8">
        {/* Glowing Center Line for Mobile & Desktop */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-purple-500 via-pink-400 to-purple-600 shadow-[0_0_15px_rgba(236,72,153,0.6)] rounded-full hidden md:block" />
        <div className="absolute left-6 top-4 bottom-4 w-1 bg-gradient-to-b from-purple-500 via-pink-400 to-purple-600 shadow-[0_0_15px_rgba(236,72,153,0.6)] rounded-full md:hidden" />

        {/* 12 Milestones */}
        <div className="space-y-10 sm:space-y-16">
          {months.map((month, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={month.monthNumber}
                className="relative flex items-center md:justify-between w-full pl-12 md:pl-0"
              >
                {/* Desktop Left Side */}
                <div className={`hidden md:flex w-5/12 justify-end ${!isEven ? 'invisible' : ''}`}>
                  {isEven && (
                    <MonthNode
                      month={month}
                      onSelect={onSelectMonth}
                      showMascot={idx === 0 || idx === 5}
                      align="right"
                    />
                  )}
                </div>

                {/* Center Glowing Marker Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-30">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 border-2 border-white flex items-center justify-center shadow-[0_0_20px_rgba(244,114,182,0.9)] cursor-pointer"
                    onClick={() => {
                      playHeartPop();
                      onSelectMonth(month.monthNumber);
                    }}
                  >
                    <Heart className="w-5 h-5 fill-white text-white" />
                  </motion.div>
                </div>

                {/* Desktop Right Side / Mobile Target */}
                <div className="w-full md:w-5/12 md:flex justify-start">
                  {/* On Mobile, show every month here */}
                  <div className="md:hidden w-full">
                    <MonthNode
                      month={month}
                      onSelect={onSelectMonth}
                      showMascot={idx === 0 || idx === 5}
                      align="left"
                    />
                  </div>

                  {/* On Desktop, show only odd items here */}
                  <div className="hidden md:block w-full">
                    {!isEven && (
                      <MonthNode
                        month={month}
                        onSelect={onSelectMonth}
                        showMascot={idx === 11}
                        align="left"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Roadmap Ending Celebration Pin */}
        <div className="mt-16 text-center flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenFinale}
            className="cursor-pointer glass-panel p-6 rounded-3xl border-2 border-pink-400/60 max-w-md shadow-2xl flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center mb-3 shadow-[0_0_30px_#F472B6]">
              <Gift className="w-8 h-8 text-white animate-bounce" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">
              The 365th Day & Our Forever
            </h3>
            <p className="text-xs text-purple-200/90 mb-4 font-light">
              You've walked through all twelve months of our first year! Tap here for your grand anniversary surprise.
            </p>
            <button
              type="button"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-md"
            >
              Open Grand Anniversary Gift 🎁
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
