import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Heart, Sparkles } from 'lucide-react';
import type { MonthMilestone } from '../data/loveStory';
import { PhotoSlideshow } from './PhotoSlideshow';
import { GiftBox } from './GiftBox';
import { BubuDudu } from './BubuDudu';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface MemoryGalleryProps {
  month: MonthMilestone;
  onClose: () => void;
  onNextMonth: () => void;
  onPrevMonth: () => void;
  hasNextMonth: boolean;
  hasPrevMonth: boolean;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({
  month,
  onClose,
  onNextMonth,
  onPrevMonth,
  hasNextMonth,
  hasPrevMonth,
}) => {
  const { playHeartPop } = useSoundEffects();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen w-full relative py-8 px-4 sm:px-6 bg-gradient-to-b from-[#2E1065] via-[#3B147D] to-[#1E0742] overflow-x-hidden text-white"
    >
      {/* Top Navigation Bar */}
      <div className="max-w-4xl mx-auto flex items-center justify-between pb-6 border-b border-purple-400/20">
        <button
          type="button"
          onClick={() => {
            playHeartPop();
            onClose();
          }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/60 hover:bg-purple-800 text-purple-200 hover:text-white border border-purple-400/30 transition-all text-xs sm:text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Roadmap</span>
        </button>

        {/* Month Navigation Prev / Next */}
        <div className="flex items-center gap-2">
          {hasPrevMonth && (
            <button
              type="button"
              onClick={() => {
                playHeartPop();
                onPrevMonth();
              }}
              className="px-3 py-1.5 rounded-full bg-purple-900/40 hover:bg-purple-800 text-purple-300 hover:text-white text-xs border border-purple-400/20 transition-all flex items-center gap-1"
            >
              <span>← Month {month.monthNumber - 1}</span>
            </button>
          )}
          {hasNextMonth && (
            <button
              type="button"
              onClick={() => {
                playHeartPop();
                onNextMonth();
              }}
              className="px-3 py-1.5 rounded-full bg-purple-900/40 hover:bg-purple-800 text-pink-300 hover:text-white text-xs border border-purple-400/20 transition-all flex items-center gap-1"
            >
              <span>Month {month.monthNumber + 1} →</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-purple-900/60 hover:bg-purple-800 text-purple-300 hover:text-white flex items-center justify-center border border-purple-400/30 transition-colors ml-2"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto mt-6 flex flex-col items-center">
        {/* Month Header Banner */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-200 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-300" />
            <span>{month.date}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow">
            {month.title}
          </h1>

          <p className="font-romantic text-2xl sm:text-3xl text-pink-300 mt-2">
            "{month.tagline}"
          </p>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-purple-200/90 font-light mt-3 leading-relaxed">
            {month.introDescription}
          </p>
        </div>

        {/* Mascot & Monthly Gift Box Button */}
        <div className="w-full flex items-center justify-between max-w-lg mb-4 px-2">
          <BubuDudu action="dancing" size="sm" speech="Look at our smiles! 🧸" />

          {/* Month surprise gift */}
          <GiftBox
            title={month.gift.title}
            subtitle={month.gift.subtitle}
            content={month.gift.content}
            triggerButtonText="Month's Love Gift 🎁"
          />
        </div>

        {/* Slideshow */}
        <div className="w-full">
          <PhotoSlideshow photos={month.photos} onFinish={() => {}} />
        </div>

        {/* Ending Section for the month */}
        <div className="w-full max-w-lg mt-10 pt-6 border-t border-purple-400/20 text-center">
          <p className="font-handwritten text-2xl sm:text-3xl text-pink-200 mb-6 font-semibold">
            "Every little moment with you is a memory I want to keep forever. 💜"
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                playHeartPop();
                onClose();
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-purple-900/60 hover:bg-purple-800 text-purple-200 hover:text-white border border-purple-400/30 text-sm font-medium transition-all"
            >
              Back to Our Memories
            </button>

            {hasNextMonth ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => {
                  playHeartPop();
                  onNextMonth();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-sm font-semibold shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 border border-pink-300/30"
              >
                <span>Explore Month {month.monthNumber + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => {
                  playHeartPop();
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white text-sm font-semibold shadow-lg flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Celebrate 1 Year of Us 🎉</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
