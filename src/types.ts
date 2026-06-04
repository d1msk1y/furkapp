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
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}
