export interface Hotspot {
  id: string;
  title: string;
  description: string;
  top: string; // percentage e.g. "30%"
  left: string; // percentage e.g. "25%"
}

export interface TechStat {
  label: string;
  value: string;
}

export interface ZahnradSystem {
  id: 'abt' | 'strub' | 'locher' | 'riggenbach' | 'von_roll';
  name: string;
  developed: string;
  type: string;
  explanationShort: string;
  historyAndPurpose: string;
  steepDangerText: string;
  solutionText: string;
  techStats: TechStat[];
  hotspots: Hotspot[];
  /** Max gradient as a plain number in percent — drives the InclineGauge visual. */
  maxGradientPercent: number;
  /** Famous Swiss railway line the system is associated with (e.g. "Pilatusbahn"). */
  famousLine: string;
  /** Short 3–5 word visual headline. */
  tagline: string;
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
