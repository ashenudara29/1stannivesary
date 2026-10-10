import React from 'react';
import { motion } from 'framer-motion';

export type BubuDuduAction =
  | 'waving'
  | 'holding-hands'
  | 'hugging'
  | 'cheering'
  | 'sitting'
  | 'dancing'
  | 'gift';

interface BubuDuduProps {
  action?: BubuDuduAction;
  speech?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BubuDudu: React.FC<BubuDuduProps> = ({
  action = 'holding-hands',
  speech,
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-24 h-20',
    md: 'w-36 h-28',
    lg: 'w-48 h-36',
  };

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Speech Bubble */}
      {speech && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="mb-2 relative bg-white/95 text-purple-950 font-handwritten text-lg md:text-xl px-4 py-1.5 rounded-2xl shadow-lg border-2 border-purple-200/80 whitespace-nowrap z-20 pointer-events-none"
        >
          {speech}
          {/* Arrow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-white" />
        </motion.div>
      )}

      {/* Characters Graphic */}
      <motion.div
        animate={
          action === 'dancing'
            ? { y: [0, -6, 0], rotate: [-2, 2, -2] }
            : action === 'cheering'
            ? { y: [0, -8, 0], scale: [1, 1.04, 1] }
            : action === 'waving'
            ? { y: [0, -3, 0] }
            : { y: [0, -4, 0] }
        }
        transition={{
          repeat: Infinity,
          duration: action === 'dancing' ? 1.6 : 2.5,
          ease: 'easeInOut',
        }}
        className={`relative ${sizeMap[size]} flex items-center justify-center`}
      >
        <svg
          viewBox="0 0 200 130"
          className="w-full h-full drop-shadow-md overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients for Bubu and Dudu */}
            <radialGradient id="bubuGradient" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F5F0FF" />
            </radialGradient>
            <radialGradient id="duduGradient" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#EAD2B8" />
              <stop offset="100%" stopColor="#D4A77D" />
            </radialGradient>
            <radialGradient id="blushGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF9EAA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF9EAA" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Action-specific Renderings */}
          {action === 'hugging' ? (
            /* Hugging Scene */
            <g id="hugging-bears">
              {/* Dudu Body Behind */}
              <circle cx="112" cy="78" r="32" fill="url(#duduGradient)" />
              {/* Dudu Ears */}
              <circle cx="132" cy="46" r="10" fill="#B8865A" />
              <circle cx="132" cy="46" r="6" fill="#F8B195" />

              {/* Bubu Body in Front */}
              <circle cx="86" cy="78" r="32" fill="url(#bubuGradient)" />
              {/* Bubu Ears */}
              <circle cx="66" cy="46" r="10" fill="#E8D5F5" />
              <circle cx="66" cy="46" r="6" fill="#FFC6FF" />

              {/* Sweet Closed Smiling Eyes */}
              <path d="M 78 72 Q 84 76 90 72" stroke="#4A306D" strokeWidth="3" strokeLinecap="round" />
              <path d="M 108 72 Q 114 76 120 72" stroke="#4A306D" strokeWidth="3" strokeLinecap="round" />

              {/* Blushes */}
              <ellipse cx="76" cy="79" rx="6" ry="4" fill="url(#blushGradient)" />
              <ellipse cx="122" cy="79" rx="6" ry="4" fill="url(#blushGradient)" />

              {/* Hugging Arms Wrapping Each Other */}
              <path d="M 80 84 Q 100 88 116 80" stroke="#E5D9F2" strokeWidth="8" strokeLinecap="round" />
              <path d="M 118 84 Q 102 92 88 84" stroke="#D4A77D" strokeWidth="8" strokeLinecap="round" />

              {/* Little Floating Hearts above hug */}
              <path
                d="M 98 42 C 98 38 94 35 90 35 C 86 35 84 39 84 41 C 84 39 82 35 78 35 C 74 35 70 38 70 42 C 70 48 84 56 84 56 C 84 56 98 48 98 42 Z"
                fill="#F472B6"
                transform="scale(0.6) translate(60, 10)"
              />
              <path
                d="M 116 34 C 116 30 112 28 109 28 C 106 28 104 31 104 32 C 104 31 102 28 99 28 C 96 28 92 30 92 34 C 92 39 104 46 104 46 C 104 46 116 39 116 34 Z"
                fill="#C084FC"
                transform="scale(0.5) translate(100, 18)"
              />
            </g>
          ) : action === 'holding-hands' || action === 'dancing' ? (
            /* Holding Hands / Dancing Couple */
            <g id="holding-hands-couple">
              {/* Bubu (Left) */}
              <g id="bubu-character">
                {/* Ears */}
                <circle cx="56" cy="46" r="10" fill="#ECE2FA" />
                <circle cx="56" cy="46" r="6" fill="#FBCFE8" />
                <circle cx="84" cy="46" r="10" fill="#ECE2FA" />
                <circle cx="84" cy="46" r="6" fill="#FBCFE8" />

                {/* Body & Head */}
                <circle cx="70" cy="74" r="28" fill="url(#bubuGradient)" stroke="#E9D5FF" strokeWidth="1" />

                {/* Eyes */}
                <circle cx="62" cy="70" r="3.5" fill="#3B245B" />
                <circle cx="63" cy="69" r="1.2" fill="#FFFFFF" />
                <circle cx="78" cy="70" r="3.5" fill="#3B245B" />
                <circle cx="79" cy="69" r="1.2" fill="#FFFFFF" />

                {/* Cute Nose and Smile */}
                <ellipse cx="70" cy="74" rx="2.5" ry="1.8" fill="#581C87" />
                <path d="M 67 76 Q 70 79 73 76" stroke="#581C87" strokeWidth="1.8" strokeLinecap="round" />

                {/* Rosy Cheeks */}
                <ellipse cx="58" cy="75" rx="5" ry="3.5" fill="#FDA4AF" opacity="0.75" />
                <ellipse cx="82" cy="75" rx="5" ry="3.5" fill="#FDA4AF" opacity="0.75" />
              </g>

              {/* Dudu (Right) */}
              <g id="dudu-character">
                {/* Ears */}
                <circle cx="116" cy="46" r="10" fill="#C89D74" />
                <circle cx="116" cy="46" r="6" fill="#F8B195" />
                <circle cx="144" cy="46" r="10" fill="#C89D74" />
                <circle cx="144" cy="46" r="6" fill="#F8B195" />

                {/* Body & Head */}
                <circle cx="130" cy="74" r="28" fill="url(#duduGradient)" stroke="#C89D74" strokeWidth="1" />

                {/* Eyes */}
                <circle cx="122" cy="70" r="3.5" fill="#3B245B" />
                <circle cx="123" cy="69" r="1.2" fill="#FFFFFF" />
                <circle cx="138" cy="70" r="3.5" fill="#3B245B" />
                <circle cx="139" cy="69" r="1.2" fill="#FFFFFF" />

                {/* Cute Nose and Smile */}
                <ellipse cx="130" cy="74" rx="2.5" ry="1.8" fill="#451A03" />
                <path d="M 127 76 Q 130 79 133 76" stroke="#451A03" strokeWidth="1.8" strokeLinecap="round" />

                {/* Rosy Cheeks */}
                <ellipse cx="118" cy="75" rx="5" ry="3.5" fill="#FDA4AF" opacity="0.75" />
                <ellipse cx="142" cy="75" rx="5" ry="3.5" fill="#FDA4AF" opacity="0.75" />
              </g>

              {/* Interlocked Hands in the center */}
              <ellipse cx="100" cy="80" rx="8" ry="6" fill="#F3E8FF" />
              <path d="M 94 80 Q 100 84 106 80" stroke="#D4A77D" strokeWidth="4" strokeLinecap="round" />

              {/* Tiny Floating Heart Between Them */}
              <motion.path
                animate={{ y: [0, -5, 0], scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                d="M 100 48 C 100 44 96 41 93 41 C 89 41 87 45 87 47 C 87 45 85 41 81 41 C 77 41 74 44 74 48 C 74 54 87 62 87 62 C 87 62 100 54 100 48 Z"
                fill="#EC4899"
                transform="translate(13, -12) scale(0.7)"
              />
            </g>
          ) : action === 'gift' ? (
            /* Holding Gift */
            <g id="gift-couple">
              {/* Couple sitting close */}
              <circle cx="76" cy="76" r="28" fill="url(#bubuGradient)" />
              <circle cx="124" cy="76" r="28" fill="url(#duduGradient)" />

              {/* Ears */}
              <circle cx="62" cy="50" r="9" fill="#ECE2FA" />
              <circle cx="138" cy="50" r="9" fill="#C89D74" />

              {/* Smiling Happy Eyes */}
              <path d="M 68 74 Q 74 70 80 74" stroke="#4A306D" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 120 74 Q 126 70 132 74" stroke="#4A306D" strokeWidth="2.5" strokeLinecap="round" />

              {/* Rosy Cheeks */}
              <ellipse cx="66" cy="78" rx="5" ry="3" fill="#FDA4AF" />
              <ellipse cx="134" cy="78" rx="5" ry="3" fill="#FDA4AF" />

              {/* Cute Purple Gift Box with Ribbon */}
              <rect x="86" y="74" width="28" height="24" rx="4" fill="#8B5CF6" />
              <rect x="84" y="71" width="32" height="6" rx="2" fill="#A78BFA" />
              <line x1="100" y1="71" x2="100" y2="98" stroke="#FBCFE8" strokeWidth="4" />
              <line x1="86" y1="85" x2="114" y2="85" stroke="#FBCFE8" strokeWidth="4" />
              {/* Ribbon Bow */}
              <circle cx="97" cy="68" r="4" fill="#F472B6" />
              <circle cx="103" cy="68" r="4" fill="#F472B6" />
            </g>
          ) : (
            /* Waving / Cheering / Sitting Default */
            <g id="default-bears">
              {/* Bubu */}
              <circle cx="70" cy="72" r="27" fill="url(#bubuGradient)" />
              <circle cx="56" cy="46" r="9" fill="#ECE2FA" />
              <circle cx="84" cy="46" r="9" fill="#ECE2FA" />
              <circle cx="63" cy="68" r="3.2" fill="#3B245B" />
              <circle cx="77" cy="68" r="3.2" fill="#3B245B" />
              <ellipse cx="70" cy="73" rx="2.5" ry="1.8" fill="#581C87" />
              <path d="M 67 75 Q 70 78 73 75" stroke="#581C87" strokeWidth="1.8" strokeLinecap="round" />
              <ellipse cx="58" cy="74" rx="5" ry="3" fill="#FDA4AF" opacity="0.8" />
              <ellipse cx="82" cy="74" rx="5" ry="3" fill="#FDA4AF" opacity="0.8" />

              {/* Waving Paw for Bubu */}
              {action === 'waving' ? (
                <motion.ellipse
                  animate={{ rotate: [-20, 20, -20] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                  cx="46"
                  cy="62"
                  rx="6"
                  ry="8"
                  fill="#FFFFFF"
                  stroke="#E9D5FF"
                  strokeWidth="1.5"
                />
              ) : null}

              {/* Dudu */}
              <circle cx="130" cy="72" r="27" fill="url(#duduGradient)" />
              <circle cx="116" cy="46" r="9" fill="#C89D74" />
              <circle cx="144" cy="46" r="9" fill="#C89D74" />
              <circle cx="123" cy="68" r="3.2" fill="#3B245B" />
              <circle cx="137" cy="68" r="3.2" fill="#3B245B" />
              <ellipse cx="130" cy="73" rx="2.5" ry="1.8" fill="#451A03" />
              <path d="M 127 75 Q 130 78 133 75" stroke="#451A03" strokeWidth="1.8" strokeLinecap="round" />
              <ellipse cx="118" cy="74" rx="5" ry="3" fill="#FDA4AF" opacity="0.8" />
              <ellipse cx="142" cy="74" rx="5" ry="3" fill="#FDA4AF" opacity="0.8" />

              {/* Tiny Heart */}
              <circle cx="100" cy="65" r="5" fill="#F472B6" />
            </g>
          )}
        </svg>
      </motion.div>
    </div>
  );
};
