/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

// Data & Helpers
import { SYSTEM_DATA } from './data';
import { ZahnradSystem } from './types';

// Screen Modules
import IntroScreen from './components/screens/IntroScreen';
import DashboardScreen from './components/screens/DashboardScreen';
import DetailScreen from './components/screens/DetailScreen';
import QuizScreen from './components/screens/QuizScreen';
import AchievementsScreen from './components/screens/AchievementsScreen';
import NetworkErrorScreen from './components/screens/NetworkErrorScreen';
import { useThemeMode } from './features/theme/useThemeMode';
import { useAchievements } from './features/achievements/useAchievements';
import { useScreenReader, speakText, cancelSpeech, extractAccessibleText } from './features/accessibility/useScreenReader';
import { useLanguage } from './features/i18n/useLanguage';
import SettingsModal from './components/ui/SettingsModal';
import Button from './components/ui/Button';
import { SlidersHorizontal } from 'lucide-react';

type ScreenType = 'intro' | 'dashboard' | 'detail' | 'quiz' | 'achievements' | 'error';

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('intro');
  const [selectedSystemId, setSelectedSystemId] = useState<ZahnradSystem['id'] | null>(null);
  const { isDarkMode, toggleTheme } = useThemeMode();
  const { progress, totalUnits, recordQuizResult } = useAchievements();
  const { isScreenReaderEnabled } = useScreenReader();
  const { language } = useLanguage();

  // Settings modal state
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isOnboarding, setIsOnboarding] = useState(false);

  // High altitude network interruption state tracking (manually simulation & recovery)
  const [backtargetScreen, setBacktargetScreen] = useState<ScreenType>('dashboard');

  // Screen Reader global observer
  useEffect(() => {
    if (!isScreenReaderEnabled) {
      cancelSpeech();
      return;
    }

    const timer = setTimeout(() => {
      const container = document.getElementById('screen-content');
      if (container) {
        const textWithPauses = extractAccessibleText(container);
        speakText(textWithPauses, language);
      }
    }, 600); // Wait for transition animation to complete

    return () => {
      clearTimeout(timer);
      cancelSpeech();
    };
  }, [screen, selectedSystemId, isScreenReaderEnabled, language]);

  // Show onboarding modal on first visit
  useEffect(() => {
    try {
      const seen = localStorage.getItem('fo_seen_settings');
      if (!seen) {
        setIsOnboarding(true);
        setSettingsOpen(true);
      }
    } catch (e) {
      console.warn('Storage access unavailable:', e);
    }
  }, []);

  const handleSettingsClose = () => {
    if (isOnboarding) {
      try {
        localStorage.setItem('fo_seen_settings', '1');
      } catch (e) {
        console.warn('Storage access unavailable:', e);
      }
      setIsOnboarding(false);
    }
    setSettingsOpen(false);
  };

  // Helper function to handle navigation with error simulation
  const navigateTo = (target: ScreenType, systemId: ZahnradSystem['id'] | null = null) => {
    // Record screen system payload
    if (systemId) {
      setSelectedSystemId(systemId);
    }

    setScreen(target);
  };

  // Manually force offline error simulation mode
  const triggerSimulationError = (currentActiveScreen: ScreenType) => {
    setBacktargetScreen(currentActiveScreen);
    setScreen('error');
  };

  // Successfully restablished network simulation sequence inside error page
  const resolveErrorSuccess = () => {
    setScreen(backtargetScreen);
  };

  const currentSystem = SYSTEM_DATA.find((sys) => sys.id === selectedSystemId) || SYSTEM_DATA[0];

  return (
    <div className="min-h-[100dvh] bg-cement-sand text-iron-dark select-none selection:bg-primary-red selection:text-white flex flex-col items-center">
      {/* Absolute parent grid with simple screen routing logic */}
      <AnimatePresence mode="wait">
        <motion.div
          id="screen-content"
          key={screen + (selectedSystemId || '')}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.18 }}
          className="w-full grow flex"
        >
          {screen === 'intro' && (
            <IntroScreen
              onExplore={() => navigateTo('dashboard')}
              onSimulateError={() => triggerSimulationError('intro')}
              onOpenSettings={() => setSettingsOpen(true)}
            />
          )}

          {screen === 'dashboard' && (
            <DashboardScreen
              onSelectSystem={(id) => navigateTo('detail', id)}
              onGoBackToIntro={() => navigateTo('intro')}
              onOpenAchievements={() => navigateTo('achievements')}
              totalUnits={totalUnits}
              progress={progress}
              headerRightAction={
                <div className="flex items-center gap-1">
                  <Button
                    variant="icon"
                    size="sm"
                    onClick={() => setSettingsOpen(true)}
                    aria-label="Settings"
                  >
                    <SlidersHorizontal size={18} strokeWidth={3} className="text-iron-dark" />
                  </Button>
                </div>
              }
            />
          )}

          {screen === 'detail' && (
            <DetailScreen
              system={currentSystem}
              onBackToDashboard={() => navigateTo('dashboard')}
              onStartQuiz={(id) => navigateTo('quiz', id)}
            />
          )}

          {screen === 'quiz' && selectedSystemId && (
            <QuizScreen
              systemId={selectedSystemId}
              onGoBackToDashboard={() => navigateTo('dashboard')}
              onQuizFinished={(id, score) => {
                recordQuizResult(id, score);
              }}
            />
          )}

          {screen === 'achievements' && (
            <AchievementsScreen
              progress={progress}
              totalUnits={totalUnits}
              onBack={() => navigateTo('dashboard')}
              onStartQuiz={(id) => navigateTo('quiz', id)}
            />
          )}

          {screen === 'error' && (
            <NetworkErrorScreen
              onResolveSuccess={resolveErrorSuccess}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <SettingsModal
        isOpen={settingsOpen}
        onClose={handleSettingsClose}
        isOnboarding={isOnboarding}
      />
    </div>
  );
}
