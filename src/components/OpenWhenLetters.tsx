import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, ArrowLeft, X } from 'lucide-react';
import type { OpenWhenLetter } from '../data/loveStory';
import { loveStoryConfig } from '../data/loveStory';
import { BubuDudu } from './BubuDudu';
import { triggerHeartBurst } from './FloatingHearts';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface OpenWhenLettersProps {
  onBack: () => void;
}

export const OpenWhenLetters: React.FC<OpenWhenLettersProps> = ({ onBack }) => {
  const [selectedLetter, setSelectedLetter] = useState<OpenWhenLetter | null>(null);
  const { playEnvelopeOpen, playHeartPop } = useSoundEffects();

  const letters = loveStoryConfig.openWhenLetters;

  const handleOpenLetter = (letter: OpenWhenLetter) => {
    setSelectedLetter(letter);
    playEnvelopeOpen();
    triggerHeartBurst(0.5, 0.45);
  };

  const handleClose = () => {
    setSelectedLetter(null);
    playHeartPop();
  };

  return (
    <div className="min-h-screen w-full relative py-10 px-4 sm:px-6 bg-gradient-to-b from-[#2E1065] via-[#381270] to-[#1A0536] text-white overflow-x-hidden">
      {/* Top Bar */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-8">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/60 hover:bg-purple-800 text-purple-200 hover:text-white border border-purple-400/30 transition-all text-xs sm:text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Our Universe</span>
        </button>

        <div className="flex items-center gap-2">
          <BubuDudu action="waving" size="sm" speech="Letters for your heart! 💌" />
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-200 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-300" />
            <span>Treasured Keepsakes</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 drop-shadow">
            Little Letters for Your Heart 💌
          </h1>
          <p className="text-purple-200/90 text-sm sm:text-base font-light">
            Whenever life gets a little much, choose an envelope made just for that feeling.
          </p>
        </div>

        {/* 8 Illustrated Envelopes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-full">
          {letters.map((item, idx) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05, y: -6 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOpenLetter(item)}
              className="glass-panel p-5 rounded-3xl border border-purple-400/30 hover:border-pink-300 transition-all duration-300 flex flex-col items-center text-center group cursor-pointer relative shadow-lg hover:shadow-purple-500/30"
            >
              {/* Envelope Graphic */}
              <div className="w-20 h-16 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#C4B5FD] flex items-center justify-center mb-4 relative shadow-md group-hover:from-purple-500 group-hover:to-pink-400 transition-all">
                <span className="text-2xl">{item.icon}</span>
                {/* Pink Heart Seal */}
                <div className="absolute -bottom-2 w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center border-2 border-white shadow">
                  <Heart className="w-3 h-3 fill-white text-white" />
                </div>
              </div>

              {/* Category */}
              <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-pink-200 transition-colors mb-1.5 leading-snug">
                {item.category}
              </h3>

              {/* Teaser */}
              <p className="text-xs text-purple-300/80 font-light line-clamp-2">
                {item.teaser}
              </p>

              <div className="mt-4 text-xs text-pink-300 font-medium group-hover:underline flex items-center gap-1">
                <Mail className="w-3 h-3" />
                <span>Open letter #{idx + 1}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Letter Reading Modal */}
      <AnimatePresence>
        {selectedLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-lg parchment-letter rounded-3xl p-6 sm:p-8 text-purple-950 shadow-2xl border-2 border-amber-300/80 max-h-[85vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-900 flex items-center justify-center transition-colors"
                aria-label="Close letter"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="border-b border-purple-200 pb-3 mb-4">
                <div className="flex items-center gap-2 text-pink-600 text-xs font-semibold uppercase tracking-wider mb-1">
                  <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                  <span>{selectedLetter.category}</span>
                </div>
                <h2 className="font-handwritten text-3xl font-bold text-purple-950">
                  A Letter for My Sweet Bubu 💌
                </h2>
              </div>

              {/* Letter Content */}
              <div className="font-handwritten text-xl sm:text-2xl leading-relaxed whitespace-pre-line text-purple-900 space-y-3">
                {selectedLetter.letter}
              </div>

              {/* Signoff */}
              <div className="mt-6 pt-4 border-t border-purple-200/60 font-handwritten text-right">
                <p className="text-xl sm:text-2xl text-purple-800 font-semibold">
                  {selectedLetter.signoff}
                </p>
              </div>

              {/* Modal footer close */}
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2 rounded-full bg-purple-900 text-white font-medium text-xs sm:text-sm hover:bg-purple-800 transition-colors shadow-md"
                >
                  Fold and Put Back 💌
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
