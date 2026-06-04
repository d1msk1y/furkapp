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
import NetworkErrorScreen from './components/screens/NetworkErrorScreen';

type ScreenType = 'intro' | 'dashboard' | 'detail' | 'quiz' | 'error';

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('intro');
  const [selectedSystemId, setSelectedSystemId] = useState<ZahnradSystem['id'] | null>(null);
  
  // Persistence for user score state
  const [quizHighScore, setQuizHighScore] = useState<number | null>(null);

  // High altitude network interruption state tracking (manually simulation & recovery)
  const [backtargetScreen, setBacktargetScreen] = useState<ScreenType>('dashboard');

  // Load highscore state from localStorage safely on client boot
  useEffect(() => {
    try {
      const savedScore = localStorage.getItem('fo_quiz_highscore');
      if (savedScore !== null) {
        setQuizHighScore(Number.parseInt(savedScore, 10));
      }
    } catch (e) {
      console.warn('Storage-Zugriff nicht verfügbar:', e);
    }
  }, []);

  const handleQuizFinished = (score: number) => {
    setQuizHighScore((prev) => {
      const newHigh = prev === null ? score : Math.max(prev, score);
      try {
        localStorage.setItem('fo_quiz_highscore', newHigh.toString());
      } catch (e) {
        console.warn('Fehler beim Speichern des Scores:', e);
      }
      return newHigh;
    });
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
    <div className="min-h-screen bg-cement-sand text-iron-dark select-none selection:bg-primary-red selection:text-white flex flex-col items-center">
      
      {/* Absolute parent grid with simple screen routing logic */}
      <AnimatePresence mode="wait">
        <motion.div
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
            />
          )}

          {screen === 'dashboard' && (
            <DashboardScreen 
              onSelectSystem={(id) => navigateTo('detail', id)}
              onGoBackToIntro={() => navigateTo('intro')}
              onStartQuiz={() => navigateTo('quiz')}
              onSimulateError={() => triggerSimulationError('dashboard')}
              quizHighScore={quizHighScore}
            />
          )}

          {screen === 'detail' && (
            <DetailScreen 
              system={currentSystem}
              onBackToDashboard={() => navigateTo('dashboard')}
              onStartQuiz={() => navigateTo('quiz')}
            />
          )}

          {screen === 'quiz' && (
            <QuizScreen 
              onGoBackToDashboard={() => navigateTo('dashboard')}
              onQuizFinished={handleQuizFinished}
            />
          )}

          {screen === 'error' && (
            <NetworkErrorScreen 
              onResolveSuccess={resolveErrorSuccess}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
