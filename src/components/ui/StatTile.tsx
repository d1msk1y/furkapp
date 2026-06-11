import { ReactNode } from 'react';

interface StatTileProps {
  readonly icon: ReactNode;
  readonly label: string;
  readonly value: string;
  readonly className?: string;
}

/** Icon-forward stat tile used in the DetailScreen technical grid. */
export default function StatTile({ icon, label, value, className = '' }: StatTileProps) {
  return (
    <div
      className={`flex flex-col justify-between h-28 p-4 bg-white border-[3px] border-iron-dark shadow-hard-sm ${className}`}
    >
      <div className="flex items-center gap-2 text-slate-stone">
        <span className="text-primary-red shrink-0">{icon}</span>
        <span className="text-xs sm:text-sm font-mono font-black uppercase tracking-wider leading-tight">
          {label}
        </span>
      </div>
      <span className="block text-xl sm:text-2xl font-black uppercase text-iron-dark tracking-tight leading-none">
        {value}
      </span>
    </div>
  );
}
