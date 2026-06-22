/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Routes, Route, Navigate, useNavigate, useLocation, useParams } from 'react-router-dom';

// Data & Helpers
import { SYSTEM_DATA } from './data';
import { SystemId } from './types';

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

const SYSTEM_IDS = new Set<string>(SYSTEM_DATA.map((sys) => sys.id));
const isValidSystemId = (id: string | undefined): id is SystemId => !!id && SYSTEM_IDS.has(id);

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useThemeMode();
  const { progress, totalUnits, recordQuizResult } = useAchievements();
  const { isScreenReaderEnabled } = useScreenReader();
  const { language } = useLanguage();

  // Keep the <html lang> attribute in sync with the active language so AT and TTS use the correct language
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Settings modal state
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isOnboarding, setIsOnboarding] = useState(false);

  // High altitude network interruption state tracking (manual simulation & recovery).
  // The error screen is a transient overlay, not a route — the URL is preserved so
  // resolving simply clears the overlay and reveals the screen we were already on.
  const [errorActive, setErrorActive] = useState(false);

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
  }, [location.pathname, errorActive, isScreenReaderEnabled, language]);

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

  // Manually force offline error simulation overlay.
  const triggerSimulationError = () => setErrorActive(true);

  // Successfully reestablished network simulation sequence inside error page.
  const resolveErrorSuccess = () => setErrorActive(false);

  // --- Route wrappers: bridge URL <-> existing screen callback props ---

  const DetailRoute = () => {
    const { systemId } = useParams();
    if (!isValidSystemId(systemId)) return <Navigate to="/dashboard" replace />;
    const system = SYSTEM_DATA.find((sys) => sys.id === systemId)!;
    return (
      <DetailScreen
        system={system}
        onBackToDashboard={() => navigate('/dashboard')}
        onStartQuiz={(id) => navigate(`/quiz/${id}`)}
      />
    );
  };

  const QuizRoute = () => {
    const { systemId } = useParams();
    if (!isValidSystemId(systemId)) return <Navigate to="/dashboard" replace />;
    return (
      <QuizScreen
        systemId={systemId}
        onGoBackToDashboard={() => navigate('/dashboard')}
        onQuizFinished={(id, score) => {
          recordQuizResult(id, score);
        }}
      />
    );
  };

  return (
    <div className="min-h-[100dvh] bg-cement-sand text-iron-dark select-none selection:bg-primary-red selection:text-white flex flex-col items-center">
      {/* Animated screen transitions keyed on the active route (or the error overlay). */}
      <AnimatePresence mode="wait">
        <motion.div
          id="screen-content"
          key={errorActive ? 'error' : location.pathname}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.18 }}
          className="w-full grow flex"
        >
          {errorActive ? (
            <NetworkErrorScreen onResolveSuccess={resolveErrorSuccess} />
          ) : (
            <Routes location={location}>
              <Route
                path="/"
                element={
                  <IntroScreen
                    onExplore={() => navigate('/dashboard')}
                    onSimulateError={triggerSimulationError}
                    onOpenSettings={() => setSettingsOpen(true)}
                  />
                }
              />
              <Route
                path="/dashboard"
                element={
                  <DashboardScreen
                    onSelectSystem={(id) => navigate(`/detail/${id}`)}
                    onGoBackToIntro={() => navigate('/')}
                    onOpenAchievements={() => navigate('/achievements')}
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
                }
              />
              <Route path="/detail/:systemId" element={<DetailRoute />} />
              <Route path="/quiz/:systemId" element={<QuizRoute />} />
              <Route
                path="/achievements"
                element={
                  <AchievementsScreen
                    progress={progress}
                    totalUnits={totalUnits}
                    onBack={() => navigate('/dashboard')}
                    onStartQuiz={(id) => navigate(`/quiz/${id}`)}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
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
