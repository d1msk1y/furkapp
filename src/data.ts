import { ZahnradSystem, QuizQuestion, SystemId, AchievementProgress, Prize } from './types';

export const SYSTEM_DATA: ZahnradSystem[] = [
  {
    id: 'abt',
    developed: '1882',
    maxGradientPercent: 25,
    statCount: 4,
    iconKey: 'layers',
    hotspots: [
      { id: 'lamellen',          top: '50%', left: '50%' },
      { id: 'geteiltes_zahnrad', top: '70%', left: '60%' },
      { id: 'laufruhe',          top: '35%', left: '72%' },
    ],
  },
  {
    id: 'locher',
    developed: '1889',
    maxGradientPercent: 48,
    statCount: 4,
    iconKey: 'horizontal',
    hotspots: [
      { id: 'zahnstange',  top: '45%', left: '10%' },
      { id: 'treibraeder', top: '72%', left: '48%' },
      { id: 'fuehrung',    top: '40%', left: '78%' },
    ],
  },
  {
    id: 'strub',
    developed: '1896',
    maxGradientPercent: 25,
    statCount: 4,
    iconKey: 'monohead',
    hotspots: [
      { id: 'konischer_kopf',    top: '20%', left: '47%' },
      { id: 'einfache_verlegung', top: '60%', left: '47%' },
      { id: 'sicherheit',        top: '30%', left: '70%' },
    ],
  },
  {
    id: 'riggenbach',
    developed: '1863',
    maxGradientPercent: 25,
    statCount: 4,
    iconKey: 'ladder',
    hotspots: [
      { id: 'U_profile', top: '42%', left: '25%' },
      { id: 'sprossen',  top: '75%', left: '55%' },
      { id: 'durchlass', top: '25%', left: '55%' },
    ],
  },
  {
    id: 'von_roll',
    developed: '1900-er',
    maxGradientPercent: 25,
    statCount: 4,
    iconKey: 'monoblock',
    hotspots: [
      { id: 'monoblock',        top: '28%', left: '20%' },
      { id: 'abt_kompatibel',   top: '40%', left: '75%' },
      { id: 'lange_lebensdauer', top: '55%', left: '48%' },
    ],
  },
];

/** Per-system quiz questions. Each system has exactly 5 questions. */
export const SYSTEM_QUIZ_QUESTIONS: Record<SystemId, QuizQuestion[]> = {
  locher: [
    { id: 1, question: '', options: ['', '', '', ''], correctOptionIndex: 1, explanation: '' },
    { id: 2, question: '', options: ['', '', '', ''], correctOptionIndex: 2, explanation: '' },
    { id: 3, question: '', options: ['', '', '', ''], correctOptionIndex: 0, explanation: '' },
    { id: 4, question: '', options: ['', '', '', ''], correctOptionIndex: 2, explanation: '' },
    { id: 5, question: '', options: ['', '', '', ''], correctOptionIndex: 3, explanation: '' },
  ],
  abt: [
    { id: 1, question: '', options: ['', '', '', ''], correctOptionIndex: 1, explanation: '' },
    { id: 2, question: '', options: ['', '', '', ''], correctOptionIndex: 0, explanation: '' },
    { id: 3, question: '', options: ['', '', '', ''], correctOptionIndex: 2, explanation: '' },
    { id: 4, question: '', options: ['', '', '', ''], correctOptionIndex: 1, explanation: '' },
    { id: 5, question: '', options: ['', '', '', ''], correctOptionIndex: 0, explanation: '' },
  ],
  strub: [
    { id: 1, question: '', options: ['', '', '', ''], correctOptionIndex: 2, explanation: '' },
    { id: 2, question: '', options: ['', '', '', ''], correctOptionIndex: 0, explanation: '' },
    { id: 3, question: '', options: ['', '', '', ''], correctOptionIndex: 1, explanation: '' },
    { id: 4, question: '', options: ['', '', '', ''], correctOptionIndex: 3, explanation: '' },
    { id: 5, question: '', options: ['', '', '', ''], correctOptionIndex: 0, explanation: '' },
  ],
  riggenbach: [
    { id: 1, question: '', options: ['', '', '', ''], correctOptionIndex: 0, explanation: '' },
    { id: 2, question: '', options: ['', '', '', ''], correctOptionIndex: 2, explanation: '' },
    { id: 3, question: '', options: ['', '', '', ''], correctOptionIndex: 1, explanation: '' },
    { id: 4, question: '', options: ['', '', '', ''], correctOptionIndex: 0, explanation: '' },
    { id: 5, question: '', options: ['', '', '', ''], correctOptionIndex: 3, explanation: '' },
  ],
  von_roll: [
    { id: 1, question: '', options: ['', '', '', ''], correctOptionIndex: 1, explanation: '' },
    { id: 2, question: '', options: ['', '', '', ''], correctOptionIndex: 0, explanation: '' },
    { id: 3, question: '', options: ['', '', '', ''], correctOptionIndex: 2, explanation: '' },
    { id: 4, question: '', options: ['', '', '', ''], correctOptionIndex: 1, explanation: '' },
    { id: 5, question: '', options: ['', '', '', ''], correctOptionIndex: 3, explanation: '' },
  ],
};

/** Number of questions per system quiz. */
export const QUESTIONS_PER_SYSTEM = 5;

/** Minimum correct answers to earn 1 achievement unit. */
export const ACHIEVEMENT_THRESHOLD = 3;

/** Prize tiers unlocked by accumulating achievement units. */
export const PRIZES: Prize[] = [
  { requiredUnits: 1, nameKey: 'achievements.prize_bronze_name', descKey: 'achievements.prize_bronze_desc', icon: '🎫' },
  { requiredUnits: 3, nameKey: 'achievements.prize_silver_name', descKey: 'achievements.prize_silver_desc', icon: '🥈' },
  { requiredUnits: 5, nameKey: 'achievements.prize_gold_name', descKey: 'achievements.prize_gold_desc', icon: '🏆' },
];

/** Default empty achievement state for all systems. */
export const INITIAL_ACHIEVEMENT_PROGRESS: AchievementProgress = {
  locher: { bestScore: 0, earned: false },
  abt: { bestScore: 0, earned: false },
  strub: { bestScore: 0, earned: false },
  riggenbach: { bestScore: 0, earned: false },
  von_roll: { bestScore: 0, earned: false },
};

