import { ReactNode } from 'react';

interface IconBoxProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  bg?: string;
  className?: string;
}

const sizeStyles = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-20 h-20',
};

export default function IconBox({
  children,
  size = 'lg',
  bg = 'bg-ink',
  className = '',
}: IconBoxProps) {
  return (
    <div
      className={`${sizeStyles[size]} ${bg} border-3 border-iron-dark flex items-center justify-center shadow-hard rounded-sm ${className}`}
    >
      {children}
    </div>
  );
}
