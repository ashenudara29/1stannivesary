import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Heart, ArrowRight } from 'lucide-react';
import { BubuDudu } from './BubuDudu';
import { triggerHeartBurst } from './FloatingHearts';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { loveStoryConfig } from '../data/loveStory';

interface SecretEnvelopeProps {
  onContinue: () => void;
}

export const SecretEnvelope: React.FC<SecretEnvelopeProps> = ({ onContinue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { playEnvelopeOpen, playHeartPop } = useSoundEffects();

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      playEnvelopeOpen();
      triggerHeartBurst(0.5, 0.45);
    }
  };

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full relative flex flex-col justify-between sm:justify-center items-center p-3 sm:p-4 pb-24 sm:pb-6 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-purple-500/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-pink-500/20 blur-[90px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-20 flex flex-col items-center text-center my-auto">
        {/* Top Titles */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-2 sm:mb-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/20 border border-purple-300/30 text-pink-200 text-xs sm:text-sm font-medium mb-1 sm:mb-2 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-pink-300" />
            <span>A Secret Surprise</span>
          </div>

          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1 tracking-tight drop-shadow-md">
            {loveStoryConfig.secretEnvelope.title}
          </h2>
          <p className="text-purple-200/90 text-xs sm:text-sm font-light">
            {loveStoryConfig.secretEnvelope.subtitle}
          </p>
        </motion.div>

        {/* Mascot & Envelope Stage */}
        <div className="relative w-full flex flex-col items-center">
          {/* Characters Sitting Beside */}
          <div className="mb-1 sm:mb-2 z-10">
            <BubuDudu
              action={isOpen ? 'dancing' : 'sitting'}
              size="sm"
              speech={isOpen ? 'Look how far we\'ve come! 💜' : 'Open it, my love! 💌'}
            />
          </div>

          {/* Floating Lavender Envelope Container */}
          <motion.div
            animate={!isOpen ? { y: [0, -8, 0] } : { y: 0 }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="relative w-full max-w-md flex flex-col items-center"
          >
            {/* The Envelope Body */}
            <div
              onClick={handleOpen}
              className={`w-full max-w-xs sm:max-w-sm relative rounded-2xl transition-all duration-700 cursor-pointer ${
                isOpen
                  ? 'bg-transparent'
                  : 'bg-gradient-to-tr from-[#9361FF] via-[#A879FC] to-[#C4B5FD] p-3.5 sm:p-6 shadow-2xl border-2 border-purple-200/50 hover:shadow-purple-500/40 hover:scale-[1.02]'
              }`}
            >
              {!isOpen ? (
                /* Closed Envelope Visual */
                <div className="flex flex-col items-center py-2 sm:py-6 px-3">
                  {/* Flap & Wax Seal Heart */}
                  <div className="relative flex items-center justify-center mb-2 sm:mb-4">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-pink-400 to-rose-600 flex items-center justify-center shadow-lg border-2 border-white/60 animate-pulse">
                      <Heart className="w-7 h-7 sm:w-10 sm:h-10 fill-white text-white drop-shadow" />
                    </div>
                    {/* Orbiting stars */}
                    <div className="absolute w-20 h-20 sm:w-28 sm:h-28 border border-purple-300/40 rounded-full animate-spin-slow pointer-events-none">
                      <div className="w-2 h-2 rounded-full bg-yellow-200 absolute top-0 left-1/2 shadow-sm" />
                    </div>
                  </div>

                  <p className="text-white font-medium text-xs sm:text-base mb-0.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-pink-200" />
                    Tap to open your love note
                  </p>
                  <p className="text-purple-100/70 text-[10px] sm:text-xs">A special letter is waiting inside</p>

                  <button
                    type="button"
                    className="mt-2.5 sm:mt-6 px-5 py-1.5 sm:py-2.5 rounded-full bg-white text-purple-900 font-semibold text-xs sm:text-sm shadow-md hover:bg-pink-50 transition-colors flex items-center gap-1.5"
                  >
                    <span>Open Your Secret Letter 💗</span>
                  </button>
                </div>
              ) : (
                /* Opened Letter Card */
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="w-full parchment-letter rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 md:p-8 text-left shadow-2xl border border-amber-200/60 relative overflow-hidden"
                >
                  {/* Decorative corner doodle */}
                  <div className="absolute top-2 right-2 text-pink-400/40 pointer-events-none">
                    <Heart className="w-6 h-6 fill-pink-300/30" />
                  </div>

                  <div className="font-handwritten text-purple-950 space-y-1.5 sm:space-y-3 text-base sm:text-xl md:text-2xl leading-normal sm:leading-relaxed">
                    {loveStoryConfig.secretEnvelope.letterContent.map((paragraph, idx) => (
                      <p key={idx} className={idx === 0 ? 'font-bold text-lg sm:text-2xl md:text-3xl text-purple-900' : ''}>
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Continue Button */}
                  <div className="mt-3 sm:mt-6 pt-2 border-t border-purple-300/30 flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        playHeartPop();
                        onContinue();
                      }}
                      className="w-full sm:w-auto px-6 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 text-white font-semibold text-xs sm:text-base shadow-xl shadow-purple-900/40 flex items-center justify-center gap-1.5 cursor-pointer border border-purple-300/30"
                    >
                      <span>{loveStoryConfig.secretEnvelope.buttonText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
