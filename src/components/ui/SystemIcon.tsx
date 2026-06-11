import type { LucideIcon } from 'lucide-react';
import { Mountain, Waves, Snowflake, Trophy, Cog } from 'lucide-react';
import type { ZahnradSystem } from '../../types';

const iconMap: Record<ZahnradSystem['iconKey'], LucideIcon> = {
  horizontal: Mountain, // Locher — steepest mountain railway profile
  layers: Waves, // Abt — smooth continuous running (laufruhig)
  monohead: Snowflake, // Strub — winter/snow reliability
  ladder: Trophy, // Riggenbach — first in Europe / pioneer status
  monoblock: Cog, // Von Roll — modern industrial standard
};

interface SystemIconProps {
  readonly iconKey: ZahnradSystem['iconKey'];
  readonly size?: number;
  readonly strokeWidth?: number;
  readonly className?: string;
}

/** Maps a system's iconKey to its identity lucide icon. */
export default function SystemIcon({
  iconKey,
  size = 28,
  strokeWidth = 2.5,
  className = '',
}: SystemIconProps) {
  const Icon = iconMap[iconKey] ?? Cog;
  return <Icon size={size} strokeWidth={strokeWidth} className={className} />;
}
