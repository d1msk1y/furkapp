import { ReactNode, ElementType } from 'react';
import { ChevronLeft } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  title: string;
  onBack: () => void;
  backLabel?: string;
  rightAction?: ReactNode;
  sticky?: boolean;
  className?: string;
  /** Optional icon component for the back button. Defaults to ChevronLeft. Use House for a home icon (NF3). */
  BackIcon?: ElementType;
}

export default function Header({
  title,
  onBack,
  backLabel = 'Back',
  rightAction,
  sticky = false,
  className = '',
  BackIcon = ChevronLeft,
}: HeaderProps) {
  return (
    <header
      className={`flex items-center justify-between p-4 border-b-[3px] border-iron-dark bg-cement-light ${
        sticky ? 'sticky top-0 z-10' : ''
      } ${className}`}
    >
      <Button variant="icon" size="sm" onClick={onBack} aria-label={backLabel}>
        <BackIcon size={22} strokeWidth={3} className="text-iron-dark" aria-hidden="true" />
      </Button>

      <h2 className="font-heading font-black text-xl tracking-tight uppercase flex-1 text-center">
        {title}
      </h2>

      {rightAction || <div className="w-11 h-11" />}
    </header>
  );
}
