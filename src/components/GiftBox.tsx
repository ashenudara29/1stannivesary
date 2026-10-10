import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Sparkles, X } from 'lucide-react';
import { triggerHeartBurst } from './FloatingHearts';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface GiftBoxProps {
  title: string;
  subtitle?: string;
  content: string;
  isOpen?: boolean;
  onClose?: () => void;
  triggerButtonText?: string;
}

export const GiftBox: React.FC<GiftBoxProps> = ({
  title,
  subtitle,
  content,
  isOpen: controlledIsOpen,
  onClose,
  triggerButtonText = 'Open Love Gift 🎁',
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpened = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const { playEnvelopeOpen, playSuccessChord, playHeartPop } = useSoundEffects();

  const handleOpen = () => {
    setInternalIsOpen(true);
    playEnvelopeOpen();
    playSuccessChord();
    triggerHeartBurst(0.5, 0.5);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setInternalIsOpen(false);
    }
    playHeartPop();
  };

  return (
    <>
      {/* Trigger Button if not controlled */}
      {controlledIsOpen === undefined && !isOpened && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpen}
          className="px-4 py-2 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-pink-500/30 flex items-center gap-1.5 border border-pink-300/40 cursor-pointer"
        >
          <Gift className="w-4 h-4 text-pink-200" />
          <span>{triggerButtonText}</span>
        </motion.button>
      )}

      {/* Modal Backdrop & Opened Content */}
      <AnimatePresence>
        {isOpened && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative w-full max-w-md bg-gradient-to-b from-[#2E1065] via-[#3B147D] to-[#250953] border-2 border-pink-400/50 rounded-3xl p-6 sm:p-8 text-center text-white shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close gift"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Glowing Heart rising from box */}
              <motion.div
                initial={{ y: 20, scale: 0.6 }}
                animate={{ y: 0, scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(244,114,182,0.8)] border-2 border-white/40"
              >
                <Heart className="w-10 h-10 fill-white text-white drop-shadow" />
              </motion.div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-200 text-xs font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                <span>{subtitle || 'A Special Surprise'}</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight drop-shadow">
                {title}
              </h3>

              {/* Gift Message Card */}
              <div className="parchment-letter rounded-2xl p-5 text-purple-950 font-handwritten text-xl sm:text-2xl leading-relaxed text-left shadow-inner border border-amber-300/40 my-4">
                {content}
              </div>

              {/* Bottom Close / Return Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleClose}
                className="mt-4 px-6 py-2.5 rounded-full bg-white text-purple-950 font-semibold text-sm shadow-md hover:bg-pink-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-purple-900 text-purple-900" />
                <span>Keep in My Heart 💜</span>
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
