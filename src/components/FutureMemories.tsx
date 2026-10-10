import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowLeft, Heart, X, Compass, ArrowRight } from 'lucide-react';
import type { FutureMemory } from '../data/loveStory';
import { loveStoryConfig } from '../data/loveStory';
import { BubuDudu } from './BubuDudu';
import { triggerHeartBurst } from './FloatingHearts';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface FutureMemoriesProps {
  onBack: () => void;
  onProceedToFinale?: () => void;
}

export const FutureMemories: React.FC<FutureMemoriesProps> = ({ onBack, onProceedToFinale }) => {
  const [selectedDream, setSelectedDream] = useState<FutureMemory | null>(null);
  const { playHeartPop } = useSoundEffects();

  const dreams = loveStoryConfig.futureMemories;

  const handleCardClick = (dream: FutureMemory) => {
    setSelectedDream(dream);
    playHeartPop();
    triggerHeartBurst(0.5, 0.45);
  };

  return (
    <div className="min-h-screen w-full relative py-10 px-4 sm:px-6 bg-gradient-to-b from-[#2E1065] via-[#3C1277] to-[#1B0538] text-white overflow-x-hidden">
      {/* Background ambient stars and glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-pink-500/15 blur-[100px] pointer-events-none" />

      {/* Top Bar */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-8">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/60 hover:bg-purple-800 text-purple-200 hover:text-white border border-purple-400/30 transition-all text-xs sm:text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Roadmap</span>
        </button>

        {onProceedToFinale && (
          <button
            type="button"
            onClick={onProceedToFinale}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium shadow-md hover:shadow-pink-500/30 text-xs sm:text-sm border border-pink-300/30"
          >
            <span>Final Anniversary Gift</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Mascot */}
        <div className="mb-2">
          <BubuDudu action="dancing" size="md" speech="So many dreams ahead! 🌟" />
        </div>

        {/* Heading */}
        <div className="text-center mb-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-500/20 border border-purple-300/30 text-pink-200 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5 text-pink-300" />
            <span>The Next Chapters</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 drop-shadow">
            Our Story Is Only Beginning... ✨
          </h1>
          <p className="text-purple-200/90 text-sm sm:text-base font-light">
            Twelve months of memories, and an entire universe of possibilities ahead of us.
          </p>
        </div>

        {/* Future Memory Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-full">
          {dreams.map((dream) => (
            <motion.button
              key={dream.id}
              whileHover={{ scale: 1.05, y: -6 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(dream)}
              className="glass-panel p-5 rounded-3xl border border-purple-400/30 hover:border-pink-300 transition-all duration-300 flex flex-col items-start text-left group cursor-pointer relative shadow-lg hover:shadow-purple-500/30"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-700 to-pink-500 flex items-center justify-center text-2xl mb-4 shadow-md group-hover:scale-110 transition-transform">
                {dream.icon}
              </div>

              {dream.isWish && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30 mb-2">
                  Waiting for our story...
                </span>
              )}

              <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-pink-200 transition-colors mb-2 leading-snug">
                {dream.title}
              </h3>

              <p className="text-xs text-purple-300/80 font-light line-clamp-3">
                {dream.description}
              </p>

              <div className="mt-4 pt-2 border-t border-purple-400/20 w-full flex items-center justify-between text-xs text-pink-300">
                <span>Explore Wish</span>
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Dream Detail Modal */}
      <AnimatePresence>
        {selectedDream && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="relative w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-2 border-pink-400/50"
            >
              <button
                type="button"
                onClick={() => setSelectedDream(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">
                {selectedDream.icon}
              </div>

              <h2 className="text-2xl font-bold text-center text-white mb-2">
                {selectedDream.title}
              </h2>

              <p className="font-handwritten text-2xl text-pink-200 leading-relaxed text-center my-4">
                "{selectedDream.description}"
              </p>

              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setSelectedDream(null)}
                  className="px-6 py-2.5 rounded-full bg-white text-purple-950 font-bold text-sm hover:bg-pink-100 transition-colors shadow-lg flex items-center gap-1.5"
                >
                  <Heart className="w-4 h-4 fill-purple-900 text-purple-900" />
                  <span>I Can't Wait 💜</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
