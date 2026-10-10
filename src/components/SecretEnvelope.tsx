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
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 bg-gradient-to-b from-[#250d53] via-[#351470] to-[#1e073d] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-purple-500/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-pink-500/20 blur-[90px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-20 flex flex-col items-center text-center">
        {/* Top Titles */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-300/30 text-pink-200 text-xs md:text-sm font-medium mb-3 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-pink-300" />
            <span>A Secret Surprise</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight drop-shadow-md">
            {loveStoryConfig.secretEnvelope.title}
          </h2>
          <p className="text-purple-200/90 text-sm md:text-base font-light">
            {loveStoryConfig.secretEnvelope.subtitle}
          </p>
        </motion.div>

        {/* Mascot & Envelope Stage */}
        <div className="relative w-full flex flex-col items-center">
          {/* Characters Sitting Beside */}
          <div className="mb-2 z-10">
            <BubuDudu
              action={isOpen ? 'dancing' : 'sitting'}
              size="md"
              speech={isOpen ? 'Look how far we\'ve come! 💜' : 'Open it, my love! 💌'}
            />
          </div>

          {/* Floating Lavender Envelope Container */}
          <motion.div
            animate={!isOpen ? { y: [0, -10, 0] } : { y: 0 }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="relative w-full max-w-md flex flex-col items-center"
          >
            {/* The Envelope Body */}
            <div
              onClick={handleOpen}
              className={`w-full max-w-sm relative rounded-2xl transition-all duration-700 cursor-pointer ${
                isOpen
                  ? 'bg-transparent'
                  : 'bg-gradient-to-tr from-[#9361FF] via-[#A879FC] to-[#C4B5FD] p-6 shadow-2xl border-2 border-purple-200/50 hover:shadow-purple-500/40 hover:scale-[1.02]'
              }`}
            >
              {!isOpen ? (
                /* Closed Envelope Visual */
                <div className="flex flex-col items-center py-6 px-4">
                  {/* Flap & Wax Seal Heart */}
                  <div className="relative flex items-center justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-rose-600 flex items-center justify-center shadow-lg border-2 border-white/60 animate-pulse">
                      <Heart className="w-10 h-10 fill-white text-white drop-shadow" />
                    </div>
                    {/* Orbiting stars */}
                    <div className="absolute w-28 h-28 border border-purple-300/40 rounded-full animate-spin-slow pointer-events-none">
                      <div className="w-2 h-2 rounded-full bg-yellow-200 absolute top-0 left-1/2 shadow-sm" />
                    </div>
                  </div>

                  <p className="text-white font-medium text-base mb-1 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-pink-200" />
                    Tap to open your love note
                  </p>
                  <p className="text-purple-100/70 text-xs">A special letter is waiting inside</p>

                  <button
                    type="button"
                    className="mt-6 px-6 py-2.5 rounded-full bg-white text-purple-900 font-semibold text-sm shadow-md hover:bg-pink-50 transition-colors flex items-center gap-2"
                  >
                    <span>Open Your Secret Letter 💗</span>
                  </button>
                </div>
              ) : (
                /* Opened Letter Card */
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="w-full parchment-letter rounded-3xl p-6 md:p-8 text-left shadow-2xl border border-amber-200/60 relative overflow-hidden"
                >
                  {/* Decorative corner doodle */}
                  <div className="absolute top-3 right-3 text-pink-400/40 pointer-events-none">
                    <Heart className="w-8 h-8 fill-pink-300/30" />
                  </div>

                  <div className="font-handwritten text-purple-950 space-y-3 text-xl md:text-2xl leading-relaxed">
                    {loveStoryConfig.secretEnvelope.letterContent.map((paragraph, idx) => (
                      <p key={idx} className={idx === 0 ? 'font-bold text-2xl md:text-3xl text-purple-900' : ''}>
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Continue Button */}
                  <div className="mt-8 pt-4 border-t border-purple-300/30 flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        playHeartPop();
                        onContinue();
                      }}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 text-white font-semibold text-base shadow-xl shadow-purple-900/40 flex items-center justify-center gap-2 cursor-pointer border border-purple-300/30"
                    >
                      <span>{loveStoryConfig.secretEnvelope.buttonText}</span>
                      <ArrowRight className="w-4 h-4" />
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
