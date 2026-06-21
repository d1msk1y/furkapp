export interface Hotspot {
  id: string;
  top: string; // percentage e.g. "30%"
  left: string; // percentage e.g. "25%"
}

export interface ZahnradSystem {
  id: 'abt' | 'strub' | 'locher' | 'riggenbach' | 'von_roll';
  developed: string;
  /** Max gradient as a plain number in percent — drives the InclineGauge visual. */
  maxGradientPercent: number;
  /** Number of tech stat tiles to render (labels/values come from locale). */
  statCount: number;
  hotspots: Hotspot[];
  /** Identity icon key consumed by SystemIcon. */
  iconKey: 'horizontal' | 'layers' | 'monohead' | 'ladder' | 'monoblock';
}

export type SystemId = ZahnradSystem['id'];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface SystemAchievement {
  bestScore: number;
  earned: boolean;
}

export type AchievementProgress = Record<SystemId, SystemAchievement>;

export interface Prize {
  requiredUnits: number;
  nameKey: string;
  descKey: string;
  icon: string;
}
