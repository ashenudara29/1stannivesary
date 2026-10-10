import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Disc3,
  Music,
  ChevronUp,
  ChevronDown,
  Info
} from 'lucide-react';
import type { AudioPlayerState } from '../hooks/useAudio';
import { loveStoryConfig } from '../data/loveStory';

interface MusicPlayerProps {
  audio: AudioPlayerState;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ audio }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDedication, setShowDedication] = useState(false);

  const { songTitle, artist, dedication } = loveStoryConfig.music;

  return (
    <>
      {/* Floating Music Player Bar / Pill */}
      <div className="fixed bottom-4 right-4 z-40 max-w-sm">
        <motion.div
          layout
          className="glass-panel border border-purple-400/40 rounded-3xl p-2.5 sm:p-3 shadow-2xl backdrop-blur-xl text-white flex flex-col gap-2 transition-all"
        >
          {/* Main Mini Controller */}
          <div className="flex items-center gap-3">
            {/* Rotating Vinyl Disc */}
            <motion.div
              animate={{ rotate: audio.isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-purple-950 via-purple-900 to-black border-2 border-purple-300/40 flex items-center justify-center shrink-0 shadow-md cursor-pointer"
              onClick={audio.togglePlay}
              title={audio.isPlaying ? 'Pause Music' : 'Play Music'}
            >
              <Disc3 className="w-6 h-6 text-pink-300" />
              {/* Center Dot */}
              <div className="absolute w-2 h-2 rounded-full bg-pink-400" />
            </motion.div>

            {/* Track Info */}
            <div
              className="flex-1 min-w-[120px] max-w-[180px] cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-semibold text-white truncate">
                  {audio.currentTrackTitle || songTitle}
                </p>
                {audio.isFallbackSynth && (
                  <span className="text-[9px] bg-purple-500/30 text-pink-200 px-1 py-0.2 rounded border border-purple-400/30">
                    Lullaby
                  </span>
                )}
              </div>
              <p className="text-[10px] text-purple-200/70 truncate">
                {artist}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1">
              {/* Play / Pause */}
              <button
                type="button"
                onClick={audio.togglePlay}
                className="w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-500 active:scale-95 text-white flex items-center justify-center shadow transition-colors"
                aria-label={audio.isPlaying ? 'Pause' : 'Play'}
              >
                {audio.isPlaying ? (
                  <Pause className="w-4 h-4 fill-white" />
                ) : (
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                )}
              </button>

              {/* Expand Toggle */}
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-7 h-7 rounded-full hover:bg-purple-800/40 text-purple-300 flex items-center justify-center transition-colors"
                aria-label="Toggle music settings"
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Expanded Settings Panel */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-2 border-t border-purple-400/20 flex flex-col gap-2.5 text-xs text-purple-200"
              >
                {/* Volume Slider and Mute */}
                <div className="flex items-center gap-2 px-1">
                  <button
                    type="button"
                    onClick={audio.toggleMute}
                    className="text-purple-300 hover:text-white transition-colors"
                  >
                    {audio.isMuted || audio.volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-pink-400" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={audio.isMuted ? 0 : audio.volume}
                    onChange={(e) => audio.setVolume(parseFloat(e.target.value))}
                    className="w-full accent-pink-400 h-1.5 bg-purple-900 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] w-7 text-right">
                    {Math.round((audio.isMuted ? 0 : audio.volume) * 100)}%
                  </span>
                </div>

                {/* Dedication info button */}
                <div className="flex justify-between items-center px-1">
                  <button
                    type="button"
                    onClick={() => setShowDedication(true)}
                    className="text-pink-300 hover:text-pink-200 text-[11px] flex items-center gap-1 font-medium transition-colors"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Song Dedication</span>
                  </button>

                  {audio.isPlaying && (
                    <div className="flex items-center gap-1 text-[11px] text-pink-400">
                      <Music className="w-3 h-3 animate-bounce" />
                      <span>Melody Playing</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Song Dedication Modal */}
      <AnimatePresence>
        {showDedication && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm glass-panel p-6 rounded-3xl border border-pink-400/40 text-white text-center shadow-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center mx-auto mb-3 shadow-md">
                <Music className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-xl font-bold text-white mb-1">
                Our Song 💜
              </h3>
              <p className="text-pink-300 text-sm font-medium mb-3">
                "{songTitle}"
              </p>

              <div className="parchment-letter rounded-2xl p-4 text-purple-950 font-handwritten text-xl leading-relaxed text-left shadow-inner border border-amber-200/50 mb-4">
                "{dedication}"
              </div>

              <p className="text-[11px] text-purple-300/80 mb-4 font-light">
                Replace with your custom MP3 file anytime in <span className="font-mono bg-purple-900/60 px-1 py-0.5 rounded">public{loveStoryConfig.music.audioFile}</span>
              </p>

              <button
                type="button"
                onClick={() => setShowDedication(false)}
                className="px-6 py-2 rounded-full bg-white text-purple-900 font-semibold text-xs hover:bg-pink-100 transition-colors shadow"
              >
                Close 💜
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
