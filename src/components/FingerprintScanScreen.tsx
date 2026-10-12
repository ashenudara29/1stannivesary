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
  const [isScanning, setIsScanning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const { playScanHum, playSuccessChord, playHeartPop } = useSoundEffects();
  const startTimeRef = useRef<number>(0);
  const isScanningRef = useRef<boolean>(false);
  const isCompletedRef = useRef<boolean>(false);
  const animFrameRef = useRef<number | null>(null);
  const lastHumTimeRef = useRef<number>(0);
  const TOTAL_DURATION_MS = 3000;

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
    isScanningRef.current = false;

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    setIsScanning(false);
    setIsCompleted(true);
    setProgress(100);

    playSuccessChord();
    triggerHeartBurst(0.5, 0.45);

    setTimeout(() => {
      onVerified();
    }, 600);
  }, [onVerified, playSuccessChord]);

  const startScan = useCallback(() => {
    if (isCompletedRef.current || isScanningRef.current) return;

    isScanningRef.current = true;
    setIsScanning(true);
    startTimeRef.current = Date.now();
    lastHumTimeRef.current = 0;
    playHeartPop();

    const tick = () => {
      if (isCompletedRef.current) return;

      const elapsed = Date.now() - startTimeRef.current;
      const currentPct = Math.min(100, (elapsed / TOTAL_DURATION_MS) * 100);

      setProgress(currentPct);

      // Soft romantic heartbeat pulses during scan
      if (elapsed - lastHumTimeRef.current > 700 && currentPct < 98) {
        lastHumTimeRef.current = elapsed;
        playScanHum(currentPct / 100);
      }

      if (currentPct >= 100) {
        completeScan();
      } else {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, [playHeartPop, playScanHum, completeScan]);

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Keyboard accessibility: press Space or Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === 'Space' || e.code === 'Enter') && !isScanningRef.current && !isCompletedRef.current) {
        e.preventDefault();
        startScan();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [startScan]);

  // Radius for circular SVG indicator
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full relative flex flex-col justify-between sm:justify-center items-center p-3 sm:p-4 pb-24 sm:pb-6 overflow-hidden select-none">
      {/* Background ambient glowing rings */}
      <div className="absolute w-[450px] h-[450px] rounded-full border border-purple-500/15 pointer-events-none animate-spin-slow" />
      <div className="absolute w-[600px] h-[600px] rounded-full border border-pink-500/10 pointer-events-none animate-spin-slow" style={{ animationDirection: 'reverse' }} />

      <div className="w-full max-w-md relative z-20 flex flex-col items-center text-center my-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-2 sm:mb-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/20 border border-purple-300/30 text-purple-200 text-xs font-medium mb-1 sm:mb-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-300" />
            <span>Heartbeat Verification</span>
          </div>

          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1 tracking-tight">
            {loveStoryConfig.fingerprint.heading}
          </h2>
          <p className="text-pink-200 text-xs sm:text-base font-medium">
            {loveStoryConfig.fingerprint.instruction}
          </p>
          <p className="text-purple-300/80 text-[11px] sm:text-xs font-light mt-0.5">
            {loveStoryConfig.fingerprint.subtext}
          </p>
        </motion.div>

        {/* Interactive Fingerprint Scanner Container */}
        <div className="relative flex flex-col items-center justify-center my-1 sm:my-3">
          {/* Circular Progress Ring */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
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
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-400 fill-pink-400 drop-shadow" />
              </div>
            </motion.div>

            {/* Center Touch / Click Target with Full Touch Resiliency */}
            <button
              type="button"
              onClick={startScan}
              onTouchStart={(e) => {
                e.preventDefault();
                startScan();
              }}
              onPointerDown={(e) => {
                e.preventDefault();
                startScan();
              }}
              onContextMenu={(e) => e.preventDefault()}
              style={{
                touchAction: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                WebkitTouchCallout: 'none',
              }}
              aria-label="Fingerprint verification scanner"
              className={`absolute w-28 h-28 sm:w-34 sm:h-34 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl ${
                isCompleted
                  ? 'bg-gradient-to-tr from-pink-500 to-purple-600 shadow-pink-500/50'
                  : isScanning
                  ? 'bg-gradient-to-tr from-purple-700 to-pink-600 shadow-purple-500/50 ring-4 ring-pink-400/50 scale-95'
                  : 'bg-gradient-to-tr from-purple-900/80 to-purple-800/80 hover:from-purple-800 hover:to-purple-700 shadow-purple-900/50 active:scale-95'
              } border-2 border-purple-300/40`}
            >
              {/* Glowing Scan Line Animation when scanning */}
              {isScanning && !isCompleted && (
                <motion.div
                  animate={{ y: [-30, 30, -30] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                  className="absolute w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent shadow-[0_0_12px_#F472B6] pointer-events-none z-10"
                />
              )}

              {/* Icon Swap */}
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-white fill-white drop-shadow-lg" />
                </motion.div>
              ) : (
                <Fingerprint
                  className={`w-14 h-14 sm:w-18 sm:h-18 transition-colors ${
                    isScanning ? 'text-pink-300 drop-shadow-[0_0_15px_#F472B6] animate-pulse' : 'text-purple-300/80'
                  }`}
                />
              )}
            </button>
          </div>

          {/* Status Message */}
          <div className="h-7 sm:h-9 mt-2 sm:mt-4 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isScanning || isCompleted ? (
                <motion.p
                  key="status"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-pink-200 font-medium text-xs sm:text-base flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-spin" />
                  <span>{getStatusMessage()}</span>
                  <span className="text-[11px] text-pink-300/80 font-mono">({Math.round(progress)}%)</span>
                </motion.p>
              ) : (
                <p className="text-purple-300/70 text-xs sm:text-sm">
                  Touch and hold the circle for 3 seconds
                </p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mascots cheering */}
        <div className="mt-1 sm:mt-3">
          <BubuDudu
            action={isCompleted ? 'cheering' : isScanning ? 'dancing' : 'holding-hands'}
            size="sm"
            speech={isCompleted ? 'Love Verified! 💜' : isScanning ? 'Scanning our heartbeat... 💓' : 'Touch and hold here! 🐾'}
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
            className="mt-2 sm:mt-4 px-3.5 py-1.5 sm:py-2 rounded-full bg-purple-900/40 hover:bg-purple-800/60 border border-purple-400/30 text-purple-200 hover:text-white text-[11px] sm:text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          >
            <KeyRound className="w-3.5 h-3.5 text-pink-300" />
            <span>Tap here to unlock immediately ✨</span>
          </motion.button>
        )}
      </div>
    </div>
  );
};
