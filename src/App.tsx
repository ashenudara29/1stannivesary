import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FloatingHearts } from './components/FloatingHearts';
import { CursorTrail } from './components/CursorTrail';
import { PasscodeScreen } from './components/PasscodeScreen';
import { SecretEnvelope } from './components/SecretEnvelope';
import { FingerprintScanScreen } from './components/FingerprintScanScreen';
import { LoveLetterScreen } from './components/LoveLetterScreen';
import { UniversePortal } from './components/UniversePortal';
import { MemoryRoadmap } from './components/MemoryRoadmap';
import { MemoryGallery } from './components/MemoryGallery';
import { ReasonsILoveYou } from './components/ReasonsILoveYou';
import { OpenWhenLetters } from './components/OpenWhenLetters';
import { FutureMemories } from './components/FutureMemories';
import { AnniversaryFinale } from './components/AnniversaryFinale';
import { MusicPlayer } from './components/MusicPlayer';
import { useAudio } from './hooks/useAudio';
import { loveStoryConfig } from './data/loveStory';

type AppScreen =
  | 'passcode'
  | 'envelope'
  | 'fingerprint'
  | 'letter'
  | 'portal'
  | 'roadmap'
  | 'gallery'
  | 'reasons'
  | 'open-when'
  | 'future'
  | 'finale';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('passcode');
  const [selectedMonthNumber, setSelectedMonthNumber] = useState<number>(1);

  // Audio system initialized with main song
  const audio = useAudio(
    loveStoryConfig.music.audioFile,
    loveStoryConfig.music.songTitle
  );

  // Transitions
  const handlePasscodeUnlock = () => {
    setCurrentScreen('envelope');
  };

  const handleEnvelopeContinue = () => {
    setCurrentScreen('fingerprint');
  };

  const handleFingerprintVerified = () => {
    // Start gentle music if user hasn't yet started it
    if (!audio.isPlaying) {
      audio.play();
    }
    setCurrentScreen('letter');
  };

  const handleEnterUniverse = () => {
    setCurrentScreen('portal');
  };

  const handlePortalEnter = () => {
    setCurrentScreen('roadmap');
  };

  const handleSelectMonth = (monthNumber: number) => {
    setSelectedMonthNumber(monthNumber);
    const targetMonth = loveStoryConfig.months.find((m) => m.monthNumber === monthNumber);
    if (targetMonth && targetMonth.musicTrack) {
      audio.loadTrack(targetMonth.musicTrack, targetMonth.musicTitle || targetMonth.title);
    }
    setCurrentScreen('gallery');
  };

  const handleCloseGallery = () => {
    audio.loadTrack(loveStoryConfig.music.audioFile, loveStoryConfig.music.songTitle);
    setCurrentScreen('roadmap');
  };

  const handleNextMonth = () => {
    if (selectedMonthNumber < 12) {
      handleSelectMonth(selectedMonthNumber + 1);
    }
  };

  const handlePrevMonth = () => {
    if (selectedMonthNumber > 1) {
      handleSelectMonth(selectedMonthNumber - 1);
    }
  };

  const handleReplay = () => {
    audio.pause();
    setCurrentScreen('passcode');
  };

  const currentMonthData =
    loveStoryConfig.months.find((m) => m.monthNumber === selectedMonthNumber) ||
    loveStoryConfig.months[0];

  return (
    <div className="relative min-h-screen w-full bg-[#2E1065] text-[#3B245B] overflow-x-hidden selection:bg-purple-300 selection:text-purple-950 font-sans">
      {/* Background Floating Hearts & Star Canvas */}
      <FloatingHearts intensity={currentScreen === 'passcode' ? 'medium' : 'high'} />

      {/* Romantic Desktop Sparkle Cursor Trail */}
      <CursorTrail />

      {/* Persistent Floating Music Player (Visible after Passcode screen) */}
      {currentScreen !== 'passcode' && (
        <MusicPlayer audio={audio} />
      )}

      {/* Screen Transitions */}
      <AnimatePresence mode="wait">
        {currentScreen === 'passcode' && (
          <motion.div
            key="passcode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PasscodeScreen onUnlock={handlePasscodeUnlock} />
          </motion.div>
        )}

        {currentScreen === 'envelope' && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SecretEnvelope onContinue={handleEnvelopeContinue} />
          </motion.div>
        )}

        {currentScreen === 'fingerprint' && (
          <motion.div
            key="fingerprint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FingerprintScanScreen onVerified={handleFingerprintVerified} />
          </motion.div>
        )}

        {currentScreen === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoveLetterScreen onEnterUniverse={handleEnterUniverse} />
          </motion.div>
        )}

        {currentScreen === 'portal' && (
          <motion.div
            key="portal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <UniversePortal onPortalEnter={handlePortalEnter} />
          </motion.div>
        )}

        {currentScreen === 'roadmap' && (
          <motion.div
            key="roadmap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MemoryRoadmap
              months={loveStoryConfig.months}
              onSelectMonth={handleSelectMonth}
              onOpenReasons={() => setCurrentScreen('reasons')}
              onOpenLetters={() => setCurrentScreen('open-when')}
              onOpenFuture={() => setCurrentScreen('future')}
              onOpenFinale={() => setCurrentScreen('finale')}
            />
          </motion.div>
        )}

        {currentScreen === 'gallery' && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <MemoryGallery
              month={currentMonthData}
              onClose={handleCloseGallery}
              onNextMonth={handleNextMonth}
              onPrevMonth={handlePrevMonth}
              hasNextMonth={selectedMonthNumber < 12}
              hasPrevMonth={selectedMonthNumber > 1}
            />
          </motion.div>
        )}

        {currentScreen === 'reasons' && (
          <motion.div
            key="reasons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ReasonsILoveYou onBack={() => setCurrentScreen('roadmap')} />
          </motion.div>
        )}

        {currentScreen === 'open-when' && (
          <motion.div
            key="open-when"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <OpenWhenLetters onBack={() => setCurrentScreen('roadmap')} />
          </motion.div>
        )}

        {currentScreen === 'future' && (
          <motion.div
            key="future"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <FutureMemories
              onBack={() => setCurrentScreen('roadmap')}
              onProceedToFinale={() => setCurrentScreen('finale')}
            />
          </motion.div>
        )}

        {currentScreen === 'finale' && (
          <motion.div
            key="finale"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnniversaryFinale
              onReplay={handleReplay}
              onReturnToRoadmap={() => setCurrentScreen('roadmap')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
