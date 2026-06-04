import { ReactNode } from 'react';

interface StatusBarProps {
  readonly label: string;
  readonly status?: ReactNode;
}

export default function StatusBar({ label, status }: Readonly<StatusBarProps>) {
  return (
    <div className="bg-cement-light p-4 text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 border-b-[3px] border-iron-dark flex items-center justify-between">
      <span>{label}</span>
      {status && <span className="text-primary-red flex items-center gap-1">{status}</span>}
    </div>
  );
}
