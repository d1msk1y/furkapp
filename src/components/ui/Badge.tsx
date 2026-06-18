import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'dark' | 'light' | 'outline' | 'pine' | 'glacier';
  className?: string;
}

const variantStyles = {
  dark: 'bg-ink text-white',
  light: 'bg-cement-light border border-iron-dark text-neutral-600',
  outline: 'bg-primary-red/10 border border-primary-red text-primary-red',
  pine: 'bg-pine text-white border border-iron-dark',
  glacier: 'bg-glacier-light border border-iron-dark text-glacier',
};

export default function Badge({ children, variant = 'dark', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-mono font-black uppercase tracking-widest px-2 py-0.5 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
