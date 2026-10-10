import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, KeyRound, Sparkles, HeartCrack, HelpCircle } from 'lucide-react';
import { BubuDudu } from './BubuDudu';
import { triggerHeartBurst } from './FloatingHearts';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { loveStoryConfig } from '../data/loveStory';

interface PasscodeScreenProps {
  onUnlock: () => void;
}

export const PasscodeScreen: React.FC<PasscodeScreenProps> = ({ onUnlock }) => {
  const [inputCode, setInputCode] = useState('');
  const [hasError, setHasError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isBrokenHeart, setIsBrokenHeart] = useState(false);
  const { playHeartPop, playSuccessChord } = useSoundEffects();

  const correctCode = loveStoryConfig.security.passcode;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim() === correctCode) {
      setHasError(false);
      playSuccessChord();
      triggerHeartBurst(0.5, 0.5);
      setTimeout(() => {
        onUnlock();
      }, 700);
    } else {
      setHasError(true);
      setIsBrokenHeart(true);
      playHeartPop();

      // Transform broken heart back after 1.5 seconds
      setTimeout(() => {
        setIsBrokenHeart(false);
      }, 1500);
    }
  };

  const handleDigitClick = (digit: string) => {
    if (inputCode.length < 6) {
      setInputCode(prev => prev + digit);
      playHeartPop();
    }
  };

  const handleBackspace = () => {
    setInputCode(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setInputCode('');
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 bg-gradient-to-b from-[#2E1065] via-[#3B177D] to-[#1E0847] overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-pink-500/20 blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Main Container Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-md relative z-20 glass-panel rounded-3xl p-6 md:p-8 text-center text-white shadow-2xl border border-purple-400/30"
      >
        {/* Glowing Heart Aura behind characters */}
        <div className="relative mb-3 flex justify-center items-center">
          <div className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-pink-500/30 to-purple-500/40 blur-xl animate-pulse" />
          <BubuDudu action={hasError ? 'waving' : 'holding-hands'} size="md" speech="Someone made this just for you! 💗" />
        </div>

        {/* Headings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/25 border border-purple-300/30 text-purple-200 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-300" />
            <span>Our Little Universe</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2 drop-shadow-md">
            A Little World Made Just for You 💜
          </h1>
          <p className="text-sm md:text-base text-purple-200/90 font-light mb-6">
            Some memories are too special to open without a secret...
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 text-left">
            <div className="flex justify-between items-center text-xs text-purple-200">
              <label htmlFor="passcode-input" className="flex items-center gap-1.5 font-medium">
                <Lock className="w-3.5 h-3.5 text-pink-300" />
                Our Little Secret
              </label>
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-pink-300 hover:text-pink-200 flex items-center gap-1 transition-colors text-xs"
                title="Hint"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                {showHint ? 'Hide Hint' : 'Need a hint?'}
              </button>
            </div>

            {/* Hint Box */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-purple-900/60 border border-purple-400/40 rounded-xl p-2.5 text-xs text-pink-200 font-light overflow-hidden"
                >
                  {loveStoryConfig.security.hintText}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input with gentle shake on error */}
            <motion.div
              animate={hasError ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <input
                id="passcode-input"
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={inputCode}
                onChange={(e) => {
                  setInputCode(e.target.value);
                  if (hasError) setHasError(false);
                }}
                placeholder="Enter the secret code..."
                className="w-full bg-purple-950/60 border-2 border-purple-400/40 focus:border-pink-400 rounded-2xl px-4 py-3.5 text-center text-xl md:text-2xl tracking-[0.3em] text-white placeholder:text-purple-300/40 placeholder:tracking-normal focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all shadow-inner"
                autoComplete="off"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-300/60">
                <KeyRound className="w-5 h-5" />
              </div>
            </motion.div>
          </div>

          {/* Interactive Numeric keypad for easy mobile/desktop clicking */}
          <div className="grid grid-cols-3 gap-2 py-1">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleDigitClick(num)}
                className="py-2.5 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 active:scale-95 text-lg font-medium text-purple-100 border border-purple-400/20 transition-all"
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={handleClear}
              className="py-2.5 rounded-xl bg-purple-900/30 hover:bg-purple-800/50 active:scale-95 text-xs font-medium text-purple-300 border border-purple-400/20 transition-all flex items-center justify-center"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => handleDigitClick('0')}
              className="py-2.5 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 active:scale-95 text-lg font-medium text-purple-100 border border-purple-400/20 transition-all"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              className="py-2.5 rounded-xl bg-purple-900/30 hover:bg-purple-800/50 active:scale-95 text-xs font-medium text-purple-300 border border-purple-400/20 transition-all flex items-center justify-center"
            >
              ⌫
            </button>
          </div>

          {/* Error Message with Broken Heart -> Normal Heart Animation */}
          <AnimatePresence>
            {hasError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 text-pink-300 text-xs md:text-sm bg-pink-950/40 border border-pink-500/40 rounded-xl p-2.5"
              >
                <motion.div
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  {isBrokenHeart ? (
                    <HeartCrack className="w-4 h-4 text-pink-400" />
                  ) : (
                    <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                  )}
                </motion.div>
                <span>{loveStoryConfig.security.errorMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-base shadow-lg shadow-purple-600/30 border border-pink-300/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
            <span>Unlock Our Love 💌</span>
          </motion.button>
        </form>

        <p className="mt-5 text-xs text-purple-300/70 font-light">
          Made with love, just for you.
        </p>
      </motion.div>
    </div>
  );
};
