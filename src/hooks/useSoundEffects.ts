/**
 * Universal Romantic Sound Effects using Web Audio API.
 * Ensures zero missing-file errors, ultra-low latency, and gentle dreamy romantic tones.
 */

let sharedCtx: AudioContext | null = null;

function getSharedContext(): AudioContext | null {
  try {
    if (!sharedCtx || sharedCtx.state === 'closed') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        sharedCtx = new AudioCtx();
      }
    }
    if (sharedCtx && sharedCtx.state === 'suspended') {
      sharedCtx.resume().catch(() => {});
    }
    return sharedCtx;
  } catch {
    return null;
  }
}

export function useSoundEffects() {
  const playHeartPop = () => {
    try {
      const ctx = getSharedContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // safe fallback
    }
  };

  const playChime = () => {
    try {
      const ctx = getSharedContext();
      if (!ctx) return;

      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + i * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.65);
      });
    } catch {
      // safe fallback
    }
  };

  const playEnvelopeOpen = () => {
    try {
      const ctx = getSharedContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.36);

      setTimeout(() => {
        playHeartPop();
      }, 180);
    } catch {
      // safe fallback
    }
  };

  const playSuccessChord = () => {
    try {
      const ctx = getSharedContext();
      if (!ctx) return;

      const notes = [392.00, 523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + idx * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.14, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.85);
      });
    } catch {
      // safe fallback
    }
  };

  const playScanHum = (progressRatio: number) => {
    try {
      const ctx = getSharedContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freq = 220 + progressRatio * 300;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch {
      // safe fallback
    }
  };

  return {
    playHeartPop,
    playChime,
    playEnvelopeOpen,
    playSuccessChord,
    playScanHum,
  };
}

