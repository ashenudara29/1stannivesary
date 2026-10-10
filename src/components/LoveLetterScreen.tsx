import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, FastForward } from 'lucide-react';
import { BubuDudu } from './BubuDudu';
import { triggerHeartBurst } from './FloatingHearts';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { loveStoryConfig } from '../data/loveStory';

interface LoveLetterScreenProps {
  onEnterUniverse: () => void;
}

export const LoveLetterScreen: React.FC<LoveLetterScreenProps> = ({ onEnterUniverse }) => {
  const [displayedParagraphs, setDisplayedParagraphs] = useState<string[]>([]);
  const [currentParagraphIdx, setCurrentParagraphIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const { playHeartPop } = useSoundEffects();
  const letterRef = useRef<HTMLDivElement | null>(null);

  const letterData = loveStoryConfig.anniversaryLetter;
  const fullParagraphs = letterData.paragraphs;

  // Typewriter effect
  useEffect(() => {
    if (isTypingComplete) return;

    if (currentParagraphIdx >= fullParagraphs.length) {
      setIsTypingComplete(true);
      return;
    }

    const currentTargetText = fullParagraphs[currentParagraphIdx];

    const timer = setTimeout(() => {
      if (currentCharIdx < currentTargetText.length) {
        // Add chunk of characters for pleasant reading speed without feeling sluggish
        const step = 3;
        const nextCharIdx = Math.min(currentTargetText.length, currentCharIdx + step);
        const currentSlice = currentTargetText.slice(0, nextCharIdx);

        setDisplayedParagraphs((prev) => {
          const updated = [...prev];
          updated[currentParagraphIdx] = currentSlice;
          return updated;
        });

        setCurrentCharIdx(nextCharIdx);
      } else {
        // Move to next paragraph
        setCurrentParagraphIdx((prev) => prev + 1);
        setCurrentCharIdx(0);
      }
    }, 28);

    return () => clearTimeout(timer);
  }, [currentParagraphIdx, currentCharIdx, isTypingComplete, fullParagraphs]);

  const handleSkipTyping = () => {
    setIsTypingComplete(true);
    setDisplayedParagraphs(fullParagraphs);
    playHeartPop();
  };

  const handleEnterUniverse = () => {
    triggerHeartBurst(0.5, 0.5);
    onEnterUniverse();
  };

  return (
    <div className="min-h-screen w-full relative py-12 px-4 flex items-center justify-center bg-gradient-to-b from-[#2E1065] via-[#40187E] to-[#250953] overflow-x-hidden">
      {/* Background ambient elements */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-pink-500/15 blur-3xl pointer-events-none" />

      <div className="w-full max-w-2xl relative z-20 flex flex-col items-center">
        {/* Mascot sitting by letter */}
        <div className="mb-4">
          <BubuDudu
            action="sitting"
            size="md"
            speech="A letter written with all my heart... 💌"
          />
        </div>

        {/* Parchment Love Letter Card */}
        <motion.div
          ref={letterRef}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full parchment-letter rounded-3xl p-6 sm:p-10 shadow-2xl relative border-2 border-amber-200/80 text-purple-950"
        >
          {/* Skip Typewriter Button */}
          {!isTypingComplete && (
            <button
              onClick={handleSkipTyping}
              className="absolute top-4 right-4 text-xs bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-1.5 rounded-full font-medium flex items-center gap-1 transition-colors shadow-sm"
              title="Skip typing animation"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>Read All</span>
            </button>
          )}

          {/* Letter Heading */}
          <div className="border-b border-purple-200/60 pb-4 mb-6 text-center sm:text-left">
            <div className="flex items-center gap-1 text-pink-500 mb-1 font-medium text-xs justify-center sm:justify-start">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our 1st Anniversary Love Letter</span>
            </div>
            <h1 className="font-handwritten text-3xl sm:text-4xl font-bold text-purple-950">
              {letterData.heading}
            </h1>
            <p className="font-handwritten text-2xl text-purple-800 mt-2 font-semibold">
              {letterData.salutation}
            </p>
          </div>

          {/* Letter Paragraphs */}
          <div className="font-handwritten text-xl sm:text-2xl leading-relaxed space-y-4 text-purple-950/90">
            {(isTypingComplete ? fullParagraphs : displayedParagraphs).map((para, idx) => (
              <p key={idx} className={idx === fullParagraphs.length - 1 ? 'font-bold text-purple-900' : ''}>
                {para}
              </p>
            ))}
            {/* Blinking cursor if still typing */}
            {!isTypingComplete && (
              <span className="inline-block w-2 h-5 bg-pink-500 animate-pulse ml-1 rounded-sm align-middle" />
            )}
          </div>

          {/* Signoff */}
          <div className="mt-8 pt-4 border-t border-purple-200/60 text-right font-handwritten">
            <p className="text-xl sm:text-2xl text-purple-800">{letterData.signoff}</p>
            <p className="text-2xl sm:text-3xl font-bold text-purple-950 mt-1">
              {letterData.closingName}
            </p>
          </div>
        </motion.div>

        {/* Enter Our Universe CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnterUniverse}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-lg shadow-xl shadow-purple-900/50 border border-purple-300/40 flex items-center gap-2.5 cursor-pointer glow-purple"
          >
            <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
            <span>Enter Our Universe ✨</span>
          </motion.button>
          <p className="text-purple-300/70 text-xs mt-2">
            Click to step into our 12-month galaxy roadmap
          </p>
        </motion.div>
      </div>
    </div>
  );
};
