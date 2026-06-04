import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'dark' | 'light' | 'outline';
  className?: string;
}

const variantStyles = {
  dark: 'bg-iron-dark text-white',
  light: 'bg-cement-light border border-iron-dark text-neutral-600',
  outline: 'bg-red-50 border border-primary-red text-primary-red',
};

export default function Badge({ children, variant = 'dark', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[9px] font-mono font-black uppercase tracking-widest px-2 py-0.5 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
