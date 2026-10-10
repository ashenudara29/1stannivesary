import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Gift } from 'lucide-react';
import type { MonthMilestone } from '../data/loveStory';
import { BubuDudu } from './BubuDudu';

interface MonthNodeProps {
  month: MonthMilestone;
  isSelected?: boolean;
  onSelect: (monthNumber: number) => void;
  showMascot?: boolean;
  align?: 'left' | 'right' | 'center';
}

export const MonthNode: React.FC<MonthNodeProps> = ({
  month,
  isSelected = false,
  onSelect,
  showMascot = false,
  align = 'center',
}) => {
  return (
    <div className={`relative flex flex-col items-center ${align === 'left' ? 'md:items-start' : align === 'right' ? 'md:items-end' : 'items-center'} group`}>
      {/* Optional Mascot at selected milestones */}
      {showMascot && (
        <div className="mb-2 z-10 pointer-events-none">
          <BubuDudu
            action={month.monthNumber === 1 ? 'waving' : month.monthNumber === 6 ? 'hugging' : 'dancing'}
            size="sm"
            speech={month.monthNumber === 1 ? 'Where it started! 💜' : month.monthNumber === 6 ? 'Halfway there! 🧸' : 'A special milestone ✨'}
          />
        </div>
      )}

      {/* Interactive Milestone Heart Card */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.06, y: -4 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => onSelect(month.monthNumber)}
        className={`relative z-20 p-4 sm:p-5 rounded-3xl transition-all duration-300 text-left cursor-pointer max-w-xs sm:max-w-sm w-full ${
          isSelected
            ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-2xl shadow-purple-500/50 border-2 border-pink-300'
            : 'glass-panel hover:border-purple-300/60 text-white shadow-xl hover:shadow-purple-500/30'
        }`}
      >
        {/* Glow badge & month indicator */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-sm shadow-md ${
              isSelected ? 'bg-white text-purple-900' : 'bg-purple-600/60 text-pink-200 border border-purple-400/30'
            }`}>
              {month.monthNumber}
            </div>
            <span className="text-xs uppercase tracking-wider font-semibold text-pink-300">
              {month.date}
            </span>
          </div>

          {/* Gift indicator badge */}
          <div className="flex items-center gap-1 bg-pink-500/20 px-2 py-0.5 rounded-full border border-pink-400/30 text-pink-200 text-[11px]">
            <Gift className="w-3 h-3 text-pink-300" />
            <span>Surprise</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-1 text-white flex items-center gap-1.5">
          <span>{month.title}</span>
          <Sparkles className="w-4 h-4 text-pink-300 opacity-80" />
        </h3>

        {/* Tagline */}
        <p className="text-xs sm:text-sm text-purple-200/90 line-clamp-2 font-light">
          {month.tagline}
        </p>

        {/* Subtle photo count & click hint */}
        <div className="mt-3 pt-2.5 border-t border-purple-300/20 flex items-center justify-between text-xs text-purple-200/80">
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
            <span>{month.photos.length} {month.photos.length === 1 ? 'Memory' : 'Memories'}</span>
          </span>
          <span className="text-pink-300 font-medium group-hover:underline">
            Open Scrapbook →
          </span>
        </div>
      </motion.button>
    </div>
  );
};
