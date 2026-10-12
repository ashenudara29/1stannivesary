import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
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
      {/* Backdrop to dismiss popover when tapping outside */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-30 bg-transparent"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Floating Small Music Button & Popover */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
        {/* Expanded Mini Controls Popover */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="mb-2 w-64 glass-panel border border-purple-400/40 rounded-2xl p-3 shadow-2xl backdrop-blur-xl text-white flex flex-col gap-2.5 z-40"
            >
              {/* Header: Title + Close */}
              <div className="flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <p className="text-xs font-semibold text-white truncate">
                      {audio.currentTrackTitle || songTitle}
                    </p>
                  </div>
                  <p className="text-[10px] text-purple-200/70 truncate pl-5">
                    {artist}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="w-5 h-5 rounded-full hover:bg-purple-800/60 text-purple-300 hover:text-white flex items-center justify-center text-xs transition-colors"
                  aria-label="Close settings"
                >
                  ✕
                </button>
              </div>

              {/* Volume Slider and Mute */}
              <div className="flex items-center gap-2 px-1 pt-1 border-t border-purple-400/20">
                <button
                  type="button"
                  onClick={audio.toggleMute}
                  className="text-purple-300 hover:text-white transition-colors"
                  aria-label="Toggle mute"
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
                <span className="text-[10px] w-7 text-right text-purple-200 font-mono">
                  {Math.round((audio.isMuted ? 0 : audio.volume) * 100)}%
                </span>
              </div>

              {/* Dedication info & Play toggle */}
              <div className="flex justify-between items-center px-1 pt-1 border-t border-purple-400/20">
                <button
                  type="button"
                  onClick={() => {
                    setShowDedication(true);
                    setIsExpanded(false);
                  }}
                  className="text-pink-300 hover:text-pink-200 text-[11px] flex items-center gap-1 font-medium transition-colors"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Song Dedication</span>
                </button>

                <button
                  type="button"
                  onClick={audio.togglePlay}
                  className="px-2.5 py-1 rounded-full bg-purple-700/80 hover:bg-purple-600 active:scale-95 text-white text-[11px] font-medium flex items-center gap-1 shadow transition-all"
                >
                  {audio.isPlaying ? (
                    <>
                      <Pause className="w-3 h-3 fill-white" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-white" />
                      <span>Play</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Small Floating Action Button */}
        <div className="relative">
          {/* Animated Glow Aura when playing */}
          {audio.isPlaying && (
            <motion.span
              animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 blur-sm pointer-events-none"
            />
          )}

          {/* Main Circular Button (Toggle Play/Pause) */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={audio.togglePlay}
            className={`relative w-12 h-12 rounded-full glass-panel border ${
              audio.isPlaying
                ? 'border-pink-400/80 shadow-[0_0_15px_rgba(236,72,153,0.45)]'
                : 'border-purple-400/40 shadow-lg'
            } bg-[#1C053B]/90 backdrop-blur-xl flex items-center justify-center p-0 overflow-hidden cursor-pointer transition-all`}
            title={audio.isPlaying ? 'Pause Music' : 'Play Music'}
            aria-label={audio.isPlaying ? 'Pause Music' : 'Play Music'}
          >
            {/* Spinning Vinyl Disc */}
            <motion.div
              animate={{ rotate: audio.isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
              className="absolute inset-1 rounded-full bg-gradient-to-tr from-purple-950 via-purple-900 to-black border border-purple-400/30 flex items-center justify-center pointer-events-none"
            >
              {/* Vinyl grooves */}
              <div className="absolute inset-1 rounded-full border border-purple-400/20" />
              <div className="absolute inset-2 rounded-full border border-purple-300/15" />

              {/* Disc Center Label */}
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-inner">
                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
              </div>
            </motion.div>

            {/* Visual Indicator in Center */}
            {audio.isPlaying ? (
              <div className="relative z-10 flex items-end gap-0.5 h-3 pointer-events-none">
                <motion.span
                  animate={{ height: ['4px', '12px', '6px', '12px'] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                  className="w-0.5 bg-pink-300 rounded-full shadow-sm"
                />
                <motion.span
                  animate={{ height: ['10px', '4px', '12px', '7px'] }}
                  transition={{ repeat: Infinity, duration: 0.7, ease: 'easeInOut', delay: 0.2 }}
                  className="w-0.5 bg-pink-100 rounded-full shadow-sm"
                />
                <motion.span
                  animate={{ height: ['6px', '12px', '5px', '10px'] }}
                  transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut', delay: 0.4 }}
                  className="w-0.5 bg-pink-300 rounded-full shadow-sm"
                />
              </div>
            ) : (
              <div className="relative z-10 w-full h-full bg-purple-950/60 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
                <Play className="w-4 h-4 text-white fill-white ml-0.5 drop-shadow" />
              </div>
            )}
          </motion.button>

          {/* Mini Settings / Volume Trigger Badge */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="absolute -top-1 -left-1 z-20 w-5 h-5 rounded-full bg-purple-800 hover:bg-purple-700 active:scale-95 border border-purple-300/60 text-pink-200 flex items-center justify-center shadow-md transition-colors"
            title="Music settings & volume"
            aria-label="Music settings & volume"
          >
            {audio.isMuted ? (
              <VolumeX className="w-2.5 h-2.5 text-pink-400" />
            ) : (
              <Volume2 className="w-2.5 h-2.5 text-pink-200" />
            )}
          </motion.button>
        </div>
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
                className="px-6 py-2 rounded-full bg-white text-purple-900 font-semibold text-xs hover:bg-pink-100 transition-colors shadow cursor-pointer"
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
