import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowLeft, RefreshCw } from 'lucide-react';
import { BubuDudu } from './BubuDudu';
import { triggerHeartBurst } from './FloatingHearts';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { loveStoryConfig } from '../data/loveStory';

interface ReasonsILoveYouProps {
  onBack: () => void;
}

export const ReasonsILoveYou: React.FC<ReasonsILoveYouProps> = ({ onBack }) => {
  const allReasons = loveStoryConfig.reasonsILoveYou;

  // Deck of unread indices, shuffled
  const [deck, setDeck] = useState<number[]>(() => {
    return Array.from({ length: allReasons.length }, (_, i) => i).sort(() => Math.random() - 0.5);
  });
  const [currentReason, setCurrentReason] = useState<string>(
    "Because your smile makes my entire day brighter the moment I see it. 💜"
  );
  const [seenCount, setSeenCount] = useState<number>(1);

  const { playHeartPop, playSuccessChord } = useSoundEffects();

  const handleNextReason = () => {
    playHeartPop();
    triggerHeartBurst(0.5, 0.45);

    if (deck.length === 0) {
      // Reshuffle deck
      const newDeck = Array.from({ length: allReasons.length }, (_, i) => i).sort(() => Math.random() - 0.5);
      const nextIdx = newDeck.pop()!;
      setDeck(newDeck);
      setCurrentReason(allReasons[nextIdx]);
      setSeenCount(1);
      playSuccessChord();
    } else {
      const nextDeck = [...deck];
      const nextIdx = nextDeck.pop()!;
      setDeck(nextDeck);
      setCurrentReason(allReasons[nextIdx]);
      setSeenCount((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen w-full relative py-10 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#2E1065] via-[#43147E] to-[#1C053B] text-white overflow-hidden">
      {/* Background glowing aura */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-pink-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-[100px] pointer-events-none" />

      {/* Top Back Button */}
      <div className="w-full max-w-xl flex justify-start mb-4 z-20">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/60 hover:bg-purple-800 text-purple-200 hover:text-white border border-purple-400/30 transition-all text-xs sm:text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Our Universe</span>
        </button>
      </div>

      <div className="w-full max-w-lg relative z-20 flex flex-col items-center text-center">
        {/* Mascots */}
        <div className="mb-2">
          <BubuDudu action="holding-hands" size="md" speech="You have my whole heart! 🧸" />
        </div>

        {/* Headings */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-200 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-300" />
            <span>Interactive Heart Machine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2 drop-shadow">
            Little Reasons I Love You 💜
          </h1>
          <p className="text-purple-200/90 text-sm sm:text-base font-light">
            Whenever you need a reminder, come here.
          </p>
        </div>

        {/* Glowing Heart Card Display */}
        <div className="w-full relative my-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReason}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.4 }}
              className="glass-panel rounded-3xl p-6 sm:p-8 border-2 border-pink-300/40 shadow-2xl relative overflow-hidden"
            >
              {/* Giant Watermark Heart */}
              <Heart className="absolute -bottom-8 -right-8 w-44 h-44 text-pink-500/10 fill-pink-500/10 pointer-events-none" />

              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart className="w-6 h-6 fill-white text-white animate-pulse" />
              </div>

              <p className="font-handwritten text-2xl sm:text-3xl md:text-4xl leading-relaxed text-pink-100 font-semibold min-h-[100px] flex items-center justify-center">
                "{currentReason}"
              </p>

              <div className="mt-4 pt-3 border-t border-purple-400/20 text-xs text-purple-300 flex items-center justify-between">
                <span>Reminder #{seenCount}</span>
                <span>{deck.length} more in this round</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleNextReason}
          className="mt-6 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-base sm:text-lg shadow-xl shadow-pink-500/30 border border-pink-300/40 flex items-center gap-2.5 cursor-pointer glow-purple"
        >
          <Heart className="w-5 h-5 fill-white text-white" />
          <span>Give Me a Little Reminder 💗</span>
          <RefreshCw className="w-4 h-4 ml-1 opacity-70" />
        </motion.button>

        <p className="text-xs text-purple-300/60 mt-3 font-light">
          Tap as many times as you like. It will never run out of love.
        </p>
      </div>
    </div>
  );
};
