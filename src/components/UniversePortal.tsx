import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Orbit } from 'lucide-react';
import { BubuDudu } from './BubuDudu';
import { triggerHeartBurst } from './FloatingHearts';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface UniversePortalProps {
  onPortalEnter: () => void;
}

export const UniversePortal: React.FC<UniversePortalProps> = ({ onPortalEnter }) => {
  const [phase, setPhase] = useState<number>(0);
  const { playSuccessChord } = useSoundEffects();

  useEffect(() => {
    // Step 0: Initial build up
    // Step 1: After 1.6s reveal "Welcome to Our Little Universe 💜"
    const timer1 = setTimeout(() => {
      setPhase(1);
      triggerHeartBurst(0.5, 0.5);
      playSuccessChord();
    }, 1800);

    // Step 2: Auto transition or allow click
    const timer2 = setTimeout(() => {
      onPortalEnter();
    }, 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onPortalEnter, playSuccessChord]);

  return (
    <div
      onClick={onPortalEnter}
      className="h-[100dvh] max-h-[100dvh] w-full relative flex flex-col justify-center items-center p-3 sm:p-4 pb-20 sm:pb-6 bg-gradient-to-b from-[#190638] via-[#2A084E] to-[#12032B] overflow-hidden cursor-pointer select-none"
    >
      {/* Nebula clouds */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/30 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute w-[450px] h-[450px] rounded-full bg-pink-500/25 blur-[100px] pointer-events-none"
      />

      {/* Orbiting star rings */}
      <div className="absolute w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] rounded-full border border-purple-400/20 animate-spin-slow pointer-events-none" />
      <div
        className="absolute w-[420px] sm:w-[580px] h-[420px] sm:h-[580px] rounded-full border border-pink-400/15 animate-spin-slow pointer-events-none"
        style={{ animationDirection: 'reverse', animationDuration: '24s' }}
      />

      <div className="relative z-20 flex flex-col items-center text-center max-w-lg my-auto">
        {/* Giant Glowing Heart Portal */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [1, 1.12, 1], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          className="relative mb-3 sm:mb-6 flex items-center justify-center"
        >
          <div className="w-28 sm:w-48 h-28 sm:h-48 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-600 flex items-center justify-center shadow-[0_0_80px_rgba(192,132,252,0.8)] border-4 border-purple-200/50">
            <Heart className="w-16 sm:w-28 h-16 sm:h-28 text-white fill-white drop-shadow-[0_0_20px_#F472B6]" />
          </div>

          {/* Orbiting miniature icons */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            <Sparkles className="absolute -top-3 w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 drop-shadow" />
            <Orbit className="absolute -bottom-3 w-5 h-5 sm:w-6 sm:h-6 text-pink-300 drop-shadow" />
          </motion.div>
        </motion.div>

        {/* Mascot couple hand in hand */}
        <div className="mb-2 sm:mb-4">
          <BubuDudu action="holding-hands" size="sm" speech="Ready for another little memory? 🌌" />
        </div>

        {/* Text Reveal */}
        {phase === 0 ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-purple-200 font-romantic text-2xl sm:text-3xl"
          >
            Every little moment brought us here...
          </motion.p>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-[0_0_20px_#C084FC]">
              Welcome to Our Little Universe 💜
            </h1>
            <p className="text-pink-200 font-light text-sm sm:text-base">
              Twelve months written in the stars... Tap to enter!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
