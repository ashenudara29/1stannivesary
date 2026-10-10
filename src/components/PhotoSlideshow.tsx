import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Heart,
  MapPin,
  Calendar,
  Image as ImageIcon,
  MessageCircleHeart,
  X
} from 'lucide-react';
import type { PhotoMemory } from '../data/loveStory';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface PhotoSlideshowProps {
  photos: PhotoMemory[];
  onFinish?: () => void;
}

export const PhotoSlideshow: React.FC<PhotoSlideshowProps> = ({ photos, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [secretNoteOpen, setSecretNoteOpen] = useState(false);

  const { playHeartPop } = useSoundEffects();
  const touchStartX = useRef<number | null>(null);

  const currentPhoto = photos[currentIndex];
  const hasMultiple = photos.length > 1;

  // Auto-play slideshow timer
  useEffect(() => {
    if (!isPlaying || photos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= photos.length - 1) {
          if (onFinish) onFinish();
          return 0;
        }
        return prev + 1;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlaying, photos.length, onFinish]);

  const goToNext = () => {
    playHeartPop();
    if (currentIndex < photos.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      if (onFinish) onFinish();
      setCurrentIndex(0);
    }
  };

  const goToPrev = () => {
    playHeartPop();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(photos.length - 1);
    }
  };

  // Touch Swipe gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX < -50) {
      goToNext(); // Swiped left -> next
    } else if (deltaX > 50) {
      goToPrev(); // Swiped right -> prev
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="relative w-full max-w-lg mx-auto flex flex-col items-center select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Polaroid Photo Frame */}
      <div className="w-full polaroid-frame relative overflow-hidden bg-white rounded-xl shadow-2xl">
        {/* Decorative Tape Sticker on Top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-pink-200/80 backdrop-blur-sm -rotate-2 z-20 shadow-sm border-t border-b border-pink-300/40" />

        {/* Photo Display Area */}
        <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50 rounded-lg overflow-hidden flex items-center justify-center border border-purple-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              {/* Photo Image or Romantic Placeholder */}
              {!imageError[currentPhoto?.id || ''] && currentPhoto?.url ? (
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.caption}
                  onError={() => {
                    setImageError((prev) => ({ ...prev, [currentPhoto.id]: true }));
                  }}
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Elegant Placeholder when user has not yet uploaded custom photo */
                <div className="flex flex-col items-center justify-center p-6 text-center text-purple-900 bg-gradient-to-br from-purple-50 via-pink-50 to-lavender-mist/30 w-full h-full">
                  <div className="w-16 h-16 rounded-full bg-purple-200/60 flex items-center justify-center mb-3 text-purple-600 shadow-inner">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <p className="font-handwritten text-2xl font-bold text-purple-900 mb-1">
                    Our next memory belongs here 💜
                  </p>
                  <p className="text-xs text-purple-600/80 max-w-xs font-light">
                    Add your photo to <span className="font-mono text-[11px] bg-purple-100 px-1 py-0.5 rounded">public{currentPhoto?.url || '/images/'}</span>
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Secret Note Heart Button in Corner if available */}
          {currentPhoto?.secretNote && (
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                playHeartPop();
                setSecretNoteOpen(true);
              }}
              className="absolute top-3 right-3 z-30 p-2 rounded-full bg-white/90 hover:bg-pink-100 text-pink-600 shadow-lg border border-pink-300/80 cursor-pointer"
              title="Reveal Secret Love Note"
            >
              <Heart className="w-5 h-5 fill-pink-500 text-pink-500 animate-pulse" />
            </motion.button>
          )}

          {/* Previous / Next Arrow Overlays */}
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={goToPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition-all active:scale-95"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition-all active:scale-95"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Polaroid Handwritten Caption Section */}
        <div className="pt-4 pb-2 px-2 text-center">
          <p className="font-handwritten text-2xl md:text-3xl font-semibold text-purple-950 leading-snug">
            {currentPhoto?.caption || 'A treasured moment together.'}
          </p>

          {/* Date & Location tags */}
          <div className="flex items-center justify-center gap-4 mt-2 text-xs text-purple-800/70 font-medium">
            {currentPhoto?.date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-pink-500" />
                <span>{currentPhoto.date}</span>
              </span>
            )}
            {currentPhoto?.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-pink-500" />
                <span>{currentPhoto.location}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Slideshow Controls Bar */}
      <div className="w-full mt-4 flex items-center justify-between px-2 text-purple-200 text-xs">
        {/* Counter */}
        <div className="font-medium bg-purple-900/40 px-3 py-1 rounded-full border border-purple-400/20">
          Memory {currentIndex + 1} of {photos.length}
        </div>

        {/* Play/Pause Button */}
        {hasMultiple && (
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/40 hover:bg-purple-800/60 border border-purple-400/20 text-pink-300 font-medium transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Auto Play</span>
              </>
            )}
          </button>
        )}

        {/* Dot Indicators */}
        {hasMultiple && (
          <div className="flex items-center gap-1.5">
            {photos.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === idx ? 'w-5 bg-pink-400' : 'bg-purple-400/40'
                }`}
                aria-label={`Go to photo ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Secret Note Modal */}
      <AnimatePresence>
        {secretNoteOpen && currentPhoto?.secretNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="relative w-full max-w-sm parchment-letter rounded-3xl p-6 text-purple-950 shadow-2xl border-2 border-pink-300/60"
            >
              <button
                type="button"
                onClick={() => setSecretNoteOpen(false)}
                className="absolute top-3 right-3 text-purple-700 hover:text-purple-900 p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-pink-600 mb-3">
                <MessageCircleHeart className="w-5 h-5" />
                <span className="font-semibold text-xs tracking-wider uppercase">
                  A Whisper From My Heart
                </span>
              </div>

              <p className="font-handwritten text-2xl leading-relaxed">
                "{currentPhoto.secretNote}"
              </p>

              <div className="mt-4 pt-3 border-t border-purple-200/50 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSecretNoteOpen(false)}
                  className="px-4 py-1.5 rounded-full bg-purple-800 text-white font-medium text-xs hover:bg-purple-700 transition-colors"
                >
                  Close Note 💜
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
