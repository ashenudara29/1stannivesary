import { useState, useEffect, useRef, useCallback } from 'react';
import { resolveAssetUrl } from '../utils/assets';

/**
 * Procedural romantic melody synthesizer using Web Audio API as a fail-safe
 * when local MP3 audio files are not yet uploaded by the user.
 */
class RomanticSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;

  // Gentle pentatonic music-box notes (Frequencies in Hz)
  // C4, D4, E4, G4, A4, C5, D5, E5, G5
  private notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];
  private arpeggioIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.25;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playNote(freq: number, duration: number = 1.2) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Sweet sine + soft triangle chime
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  start() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    const pattern = [0, 2, 4, 3, 5, 4, 2, 1, 0, 4, 3, 6];
    const playNext = () => {
      if (!this.isPlaying) return;
      const noteIdx = pattern[this.arpeggioIndex % pattern.length];
      const freq = this.notes[noteIdx % this.notes.length];
      this.playNote(freq, 1.4);

      // Occasional gentle harmony
      if (this.arpeggioIndex % 3 === 0) {
        const harmonyFreq = this.notes[(noteIdx + 2) % this.notes.length];
        this.playNote(harmonyFreq, 1.8);
      }

      this.arpeggioIndex++;
      this.timer = window.setTimeout(playNext, 650);
    };

    playNext();
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, vol * 0.3)), this.ctx.currentTime);
    }
  }
}

const synthInstance = new RomanticSynthesizer();

export interface AudioPlayerState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTrackTitle: string;
  isFallbackSynth: boolean;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (val: number) => void;
  loadTrack: (src: string | undefined, title: string) => void;
}

export function useAudio(initialSrc?: string, initialTitle: string = "Our Universe Theme"): AudioPlayerState {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.65);
  const [currentTrackTitle, setCurrentTrackTitle] = useState<string>(initialTitle);
  const [isFallbackSynth, setIsFallbackSynth] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const trackSrcRef = useRef<string | undefined>(initialSrc);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = volume;
    audio.loop = true;

    audio.onerror = () => {
      // Audio file not present or failed, fallback to dreamy synthesizer
      if (isPlaying) {
        setIsFallbackSynth(true);
        synthInstance.setVolume(volume);
        synthInstance.start();
      }
    };

    audio.onended = () => {
      // loop handling
      audio.play().catch(() => {});
    };

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
      synthInstance.stop();
    };
  }, []);

  const play = useCallback(() => {
    setIsPlaying(true);
    const audio = audioRef.current;
    if (audio && trackSrcRef.current) {
      const resolved = resolveAssetUrl(trackSrcRef.current);
      if (audio.src !== resolved && !audio.src.endsWith(resolved)) {
        audio.src = resolved;
      }
      audio.play().then(() => {
        setIsFallbackSynth(false);
        synthInstance.stop();
      }).catch(() => {
        // Fallback to soothing Web Audio synth
        setIsFallbackSynth(true);
        synthInstance.setVolume(isMuted ? 0 : volume);
        synthInstance.start();
      });
    } else {
      setIsFallbackSynth(true);
      synthInstance.setVolume(isMuted ? 0 : volume);
      synthInstance.start();
    }
  }, [volume, isMuted]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    synthInstance.stop();
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.muted = next;
      }
      synthInstance.setVolume(next ? 0 : volume);
      return next;
    });
  }, [volume]);

  const setVolume = useCallback((val: number) => {
    setVolumeState(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    if (!isMuted) {
      synthInstance.setVolume(val);
    }
  }, [isMuted]);

  const loadTrack = useCallback((src: string | undefined, title: string) => {
    trackSrcRef.current = src;
    setCurrentTrackTitle(title);
    if (isPlaying) {
      const resolved = src ? resolveAssetUrl(src) : undefined;
      if (audioRef.current && resolved) {
        audioRef.current.src = resolved;
        audioRef.current.play().then(() => {
          setIsFallbackSynth(false);
          synthInstance.stop();
        }).catch(() => {
          setIsFallbackSynth(true);
          synthInstance.start();
        });
      } else {
        setIsFallbackSynth(true);
        synthInstance.start();
      }
    }
  }, [isPlaying]);

  return {
    isPlaying,
    isMuted,
    volume,
    currentTrackTitle,
    isFallbackSynth,
    play,
    pause,
    togglePlay,
    toggleMute,
    setVolume,
    loadTrack
  };
}
