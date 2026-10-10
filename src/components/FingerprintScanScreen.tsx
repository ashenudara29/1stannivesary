import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Heart, Sparkles, KeyRound } from 'lucide-react';
import { BubuDudu } from './BubuDudu';
import { triggerHeartBurst } from './FloatingHearts';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { loveStoryConfig } from '../data/loveStory';

interface FingerprintScanScreenProps {
  onVerified: () => void;
}

export const FingerprintScanScreen: React.FC<FingerprintScanScreenProps> = ({ onVerified }) => {
  const [progress, setProgress] = useState(0); // 0 to 100
  const [isHolding, setIsHolding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [earlyReleaseMessage, setEarlyReleaseMessage] = useState(false);

  const { playScanHum, playSuccessChord, playHeartPop } = useSoundEffects();
  const holdIntervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const isHoldingRef = useRef<boolean>(false);
  const isCompletedRef = useRef<boolean>(false);
  const TOTAL_DURATION_MS = 5000;

  const steps = loveStoryConfig.fingerprint.steps;

  // Determine current scan message based on percentage
  const getStatusMessage = () => {
    if (isCompleted) return steps[3];
    if (progress < 25) return steps[0];
    if (progress < 60) return steps[1];
    if (progress < 95) return steps[2];
    return steps[3];
  };

  const completeScan = useCallback(() => {
    if (isCompletedRef.current) return;
    isCompletedRef.current = true;
    isHoldingRef.current = false;

    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }

    setIsHolding(false);
    setIsCompleted(true);
    setProgress(100);

    playSuccessChord();
    triggerHeartBurst(0.5, 0.45);

    setTimeout(() => {
      onVerified();
    }, 1200);
  }, [onVerified, playSuccessChord]);

  const startHold = useCallback(() => {
    if (isCompletedRef.current || isHoldingRef.current) return;

    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }

    isHoldingRef.current = true;
    setIsHolding(true);
    setEarlyReleaseMessage(false);
    playHeartPop();

    startTimeRef.current = Date.now();

    holdIntervalRef.current = window.setInterval(() => {
      if (!isHoldingRef.current) {
        if (holdIntervalRef.current) {
          clearInterval(holdIntervalRef.current);
          holdIntervalRef.current = null;
        }
        return;
      }

      const elapsed = Date.now() - startTimeRef.current;
      const currentPct = Math.min(100, (elapsed / TOTAL_DURATION_MS) * 100);

      setProgress(currentPct);
      playScanHum(currentPct / 100);

      if (currentPct >= 100) {
        if (holdIntervalRef.current) {
          clearInterval(holdIntervalRef.current);
          holdIntervalRef.current = null;
        }
        completeScan();
      }
    }, 40);
  }, [playHeartPop, playScanHum, completeScan]);

  const cancelHold = useCallback(() => {
    if (isCompletedRef.current || !isHoldingRef.current) return;

    isHoldingRef.current = false;
    setIsHolding(false);

    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }

    setProgress((prev) => {
      if (prev > 10 && prev < 98) {
        setEarlyReleaseMessage(true);
        setTimeout(() => setEarlyReleaseMessage(false), 2500);
      }
      return 0;
    });
  }, []);

  // Keyboard accessibility: hold Space or Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === 'Space' || e.code === 'Enter') && !isHoldingRef.current && !isCompletedRef.current) {
        e.preventDefault();
        startHold();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        cancelHold();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, [startHold, cancelHold]);

  // Radius for circular SVG indicator
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 bg-gradient-to-b from-[#2E1065] via-[#240A52] to-[#160435] overflow-hidden select-none">
      {/* Background ambient glowing rings */}
      <div className="absolute w-[450px] h-[450px] rounded-full border border-purple-500/15 pointer-events-none animate-spin-slow" />
      <div className="absolute w-[600px] h-[600px] rounded-full border border-pink-500/10 pointer-events-none animate-spin-slow" style={{ animationDirection: 'reverse' }} />

      <div className="w-full max-w-md relative z-20 flex flex-col items-center text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-300/30 text-purple-200 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-300" />
            <span>Heartbeat Verification</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
            {loveStoryConfig.fingerprint.heading}
          </h2>
          <p className="text-pink-200 text-base md:text-lg font-medium">
            {loveStoryConfig.fingerprint.instruction}
          </p>
          <p className="text-purple-300/80 text-xs md:text-sm font-light mt-1">
            {loveStoryConfig.fingerprint.subtext}
          </p>
        </motion.div>

        {/* Interactive Fingerprint Scanner Container */}
        <div className="relative flex flex-col items-center justify-center my-4">
          {/* Circular Progress Ring */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform overflow-visible" viewBox="0 0 160 160">
              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-purple-900/50"
                strokeWidth="6"
                fill="transparent"
              />
              {/* Progress Stroke */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-pink-500 transition-all duration-75"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Orbiting Tiny Hearts */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute top-1 left-1/2 -translate-x-1/2">
                <Heart className="w-4 h-4 text-pink-400 fill-pink-400 drop-shadow" />
              </div>
            </motion.div>

            {/* Center Touch / Click Target with Pointer Capture */}
            <button
              type="button"
              onPointerDown={(e) => {
                e.preventDefault();
                try {
                  e.currentTarget.setPointerCapture(e.pointerId);
                } catch {}
                startHold();
              }}
              onPointerUp={(e) => {
                try {
                  e.currentTarget.releasePointerCapture(e.pointerId);
                } catch {}
                cancelHold();
              }}
              onPointerCancel={cancelHold}
              style={{ touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
              aria-label="Fingerprint verification scanner"
              className={`absolute w-36 h-36 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl ${
                isCompleted
                  ? 'bg-gradient-to-tr from-pink-500 to-purple-600 shadow-pink-500/50'
                  : isHolding
                  ? 'bg-gradient-to-tr from-purple-700 to-pink-600 shadow-purple-500/50 ring-4 ring-pink-400/40'
                  : 'bg-gradient-to-tr from-purple-900/80 to-purple-800/80 hover:from-purple-800 hover:to-purple-700 shadow-purple-900/50'
              } border-2 border-purple-300/40`}
            >
              {/* Glowing Scan Line Animation when holding */}
              {isHolding && !isCompleted && (
                <motion.div
                  animate={{ y: [-40, 40, -40] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                  className="absolute w-24 h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent shadow-[0_0_12px_#F472B6] pointer-events-none z-10"
                />
              )}

              {/* Icon Swap */}
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  <Heart className="w-16 h-16 text-white fill-white drop-shadow-lg" />
                </motion.div>
              ) : (
                <Fingerprint
                  className={`w-20 h-20 transition-colors ${
                    isHolding ? 'text-pink-300 drop-shadow-[0_0_15px_#F472B6]' : 'text-purple-300/80'
                  }`}
                />
              )}
            </button>
          </div>

          {/* Status Message */}
          <div className="h-10 mt-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {earlyReleaseMessage ? (
                <motion.p
                  key="early-release"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-pink-400 font-medium text-sm flex items-center gap-1.5 bg-pink-950/40 px-4 py-1.5 rounded-full border border-pink-500/30"
                >
                  <span>Hold for 5 seconds, my love! 🥺💜</span>
                </motion.p>
              ) : isHolding || isCompleted ? (
                <motion.p
                  key="status"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-pink-200 font-medium text-sm md:text-base flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-pink-300 animate-spin" />
                  <span>{getStatusMessage()}</span>
                </motion.p>
              ) : (
                <p className="text-purple-300/70 text-xs md:text-sm">
                  Press and hold the circle for 5 seconds
                </p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mascots cheering */}
        <div className="mt-4">
          <BubuDudu
            action={isCompleted ? 'cheering' : isHolding ? 'dancing' : 'holding-hands'}
            size="md"
            speech={isCompleted ? 'Love Verified! 💜' : 'Put your finger here! 🐾'}
          />
        </div>

        {/* Fallback Direct Unlock Button */}
        {!isCompleted && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            type="button"
            onClick={completeScan}
            className="mt-6 px-4 py-2 rounded-full bg-purple-900/40 hover:bg-purple-800/60 border border-purple-400/30 text-purple-200 hover:text-white text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          >
            <KeyRound className="w-3.5 h-3.5 text-pink-300" />
            <span>Tap here to unlock immediately ✨</span>
          </motion.button>
        )}
      </div>
    </div>
  );
};

