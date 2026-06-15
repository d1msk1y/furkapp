import { useEffect, useState } from 'react';
import { AchievementProgress, SystemId } from '../../types';
import { INITIAL_ACHIEVEMENT_PROGRESS, ACHIEVEMENT_THRESHOLD, PRIZES } from '../../data';

const ACHIEVEMENTS_STORAGE_KEY = 'fo_achievements';

function getInitialProgress(): AchievementProgress {
  try {
    const saved = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved) as Partial<AchievementProgress>;
      // Merge with defaults so newly-added systems don't break
      return { ...INITIAL_ACHIEVEMENT_PROGRESS, ...parsed };
    }
  } catch (e) {
    console.warn('Storage access unavailable:', e);
  }
  return { ...INITIAL_ACHIEVEMENT_PROGRESS };
}

function persistProgress(progress: AchievementProgress) {
  try {
    localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new Event('achievementsChanged'));
  } catch (e) {
    console.warn('Error saving achievements:', e);
  }
}

export function useAchievements() {
  const [progress, setProgress] = useState<AchievementProgress>(getInitialProgress);

  useEffect(() => {
    const handleChange = () => {
      setProgress(getInitialProgress());
    };

    window.addEventListener('achievementsChanged', handleChange);
    return () => {
      window.removeEventListener('achievementsChanged', handleChange);
    };
  }, []);

  const totalUnits = Object.values(progress).filter((a) => a.earned).length;

  const unlockedPrizes = PRIZES.filter((p) => totalUnits >= p.requiredUnits);

  const recordQuizResult = (systemId: SystemId, score: number) => {
    setProgress((prev) => {
      const current = prev[systemId];
      const newBest = Math.max(current.bestScore, score);
      const nowEarned = current.earned || score >= ACHIEVEMENT_THRESHOLD;
      const next: AchievementProgress = {
        ...prev,
        [systemId]: { bestScore: newBest, earned: nowEarned },
      };
      persistProgress(next);
      return next;
    });
  };

  return {
    progress,
    totalUnits,
    unlockedPrizes,
    recordQuizResult,
  };
}
