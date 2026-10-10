import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Gift, RotateCcw, Compass, Ticket, Image as ImageIcon } from 'lucide-react';
import { BubuDudu } from './BubuDudu';
import { triggerHeartBurst } from './FloatingHearts';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { loveStoryConfig } from '../data/loveStory';

interface AnniversaryFinaleProps {
  onReplay: () => void;
  onReturnToRoadmap: () => void;
}

export const AnniversaryFinale: React.FC<AnniversaryFinaleProps> = ({
  onReplay,
  onReturnToRoadmap,
}) => {
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  const { playEnvelopeOpen, playSuccessChord, playHeartPop } = useSoundEffects();

  // Dynamic days counter from anniversaryDate
  const calculateDaysTogether = () => {
    try {
      const startDate = new Date(loveStoryConfig.couple.anniversaryDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return isNaN(diffDays) ? 365 : diffDays;
    } catch {
      return 365;
    }
  };

  const daysCount = calculateDaysTogether();
  const finaleData = loveStoryConfig.finale;

  const handleOpenGift = () => {
    setIsGiftOpened(true);
    playEnvelopeOpen();
    playSuccessChord();
    triggerHeartBurst(0.5, 0.4);
    // Extra bursts
    setTimeout(() => triggerHeartBurst(0.3, 0.5), 350);
    setTimeout(() => triggerHeartBurst(0.7, 0.5), 700);
  };

  return (
    <div className="min-h-screen w-full relative py-12 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#1C053B] via-[#2D0B58] to-[#120227] text-white overflow-x-hidden">
      {/* Background galaxy effects */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[140px] pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-pink-500/20 blur-[130px] pointer-events-none" />

      <div className="w-full max-w-2xl relative z-20 flex flex-col items-center text-center">
        {/* Mascots Hugging */}
        <div className="mb-4">
          <BubuDudu
            action="hugging"
            size="lg"
            speech="Happy First Anniversary! 🧸💜"
          />
        </div>

        {/* Dynamic Days Counter Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-800/80 to-pink-800/80 border border-pink-400/40 text-pink-200 text-sm font-semibold mb-3 shadow-lg backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-pink-300 animate-spin" />
          <span>{daysCount} Days of Unconditional Love</span>
        </motion.div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 drop-shadow-[0_0_25px_#C084FC]">
          {finaleData.heading}
        </h1>
        <p className="font-romantic text-2xl sm:text-3xl text-pink-200 max-w-lg mb-8 leading-relaxed">
          "{finaleData.subheading}"
        </p>

        {/* Mystery Gift Box Section */}
        {!isGiftOpened ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md glass-panel p-8 rounded-3xl border-2 border-pink-400/40 shadow-2xl flex flex-col items-center"
          >
            {/* Animated 3D-styled Gift Box */}
            <motion.div
              animate={{ y: [0, -10, 0], scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="relative w-32 h-32 mb-6 flex items-center justify-center cursor-pointer"
              onClick={handleOpenGift}
            >
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-700 shadow-[0_0_40px_rgba(236,72,153,0.6)] border-2 border-pink-300/60 flex items-center justify-center">
                <Gift className="w-14 h-14 text-white drop-shadow" />
              </div>
              {/* Glowing ribbon cross */}
              <div className="absolute w-28 h-4 bg-pink-300/80 rounded-full blur-[1px]" />
              <div className="absolute h-28 w-4 bg-pink-300/80 rounded-full blur-[1px]" />
            </motion.div>

            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {finaleData.giftBoxTitle}
            </h2>
            <p className="text-purple-200/80 text-xs sm:text-sm font-light mb-6">
              A little box holding all my deepest gratitude, our favorite memory, and a special date token.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenGift}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-pink-600/40 border border-pink-300/50 flex items-center gap-2 cursor-pointer glow-purple"
            >
              <Heart className="w-5 h-5 fill-white text-white" />
              <span>Open Your Gift 💗</span>
            </motion.button>
          </motion.div>
        ) : (
          /* Opened Gift Box Content */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full space-y-6"
          >
            {/* Letter & Photo Scrapbook Card */}
            <div className="w-full parchment-letter rounded-3xl p-6 sm:p-10 text-purple-950 text-left shadow-2xl border-2 border-amber-300/70 relative">
              <div className="flex items-center justify-between border-b border-purple-200/60 pb-3 mb-4">
                <div className="flex items-center gap-2 text-pink-600 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Anniversary Dedication</span>
                </div>
                <span className="font-handwritten text-xl font-bold text-purple-900">
                  Forever & Always 💜
                </span>
              </div>

              {/* Finale Letter Paragraphs */}
              <div className="font-handwritten text-xl sm:text-2xl leading-relaxed space-y-3.5 text-purple-950">
                {finaleData.letterParagraphs.map((p, idx) => (
                  <p key={idx} className={idx === finaleData.letterParagraphs.length - 1 ? 'font-bold text-2xl text-purple-900' : ''}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Favorite Photo Showcase */}
              <div className="mt-6 pt-6 border-t border-purple-200/60 flex flex-col items-center">
                <div className="polaroid-frame max-w-sm w-full mx-auto">
                  <div className="aspect-[4/3] bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg overflow-hidden flex items-center justify-center border border-purple-100">
                    {!photoError && finaleData.favoritePhotoUrl ? (
                      <img
                        src={finaleData.favoritePhotoUrl}
                        alt="Our Favorite Memory"
                        onError={() => setPhotoError(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-center text-purple-900">
                        <ImageIcon className="w-10 h-10 text-purple-400 mb-2" />
                        <p className="font-handwritten text-xl font-bold">
                          Our Most Treasured Picture 💜
                        </p>
                        <p className="text-[11px] text-purple-600 font-mono mt-1">
                          public/images/finale/our-favorite-memory.jpg
                        </p>
                      </div>
                    )}
                  </div>
                  <p className="font-handwritten text-xl text-center text-purple-950 mt-3 font-semibold">
                    {finaleData.favoritePhotoCaption || '365 days of us 💜'}
                  </p>
                </div>
              </div>
            </div>

            {/* Real-life Romantic Date Invitation / Coupon */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-6 rounded-3xl border-2 border-pink-400/40 text-left relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-pink-300 font-semibold text-sm">
                  <Ticket className="w-5 h-5 text-pink-400" />
                  <span>{finaleData.dateCoupon.title}</span>
                </div>
                <span className="text-xs bg-pink-500/20 px-2.5 py-1 rounded-full text-pink-200 border border-pink-400/30">
                  {finaleData.dateCoupon.validUntil}
                </span>
              </div>

              <p className="text-xs text-purple-200/80 mb-3 font-light">
                This coupon is officially issued to you. Redeemable anytime, anywhere with no expiration date!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-purple-100 font-medium">
                {finaleData.dateCoupon.perks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-2 bg-purple-950/50 p-2.5 rounded-xl border border-purple-400/20">
                    <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Final Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={onReturnToRoadmap}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-purple-900/70 hover:bg-purple-800 text-purple-200 hover:text-white border border-purple-400/40 font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Compass className="w-4 h-4" />
                <span>Return to Our Universe ✨</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => {
                  playHeartPop();
                  onReplay();
                }}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-pink-600/30 border border-pink-300/40"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay Our Love Story 💜</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
