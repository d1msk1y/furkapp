import { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  title: string;
  onBack: () => void;
  backLabel?: string;
  rightAction?: ReactNode;
  sticky?: boolean;
  className?: string;
}

export default function Header({
  title,
  onBack,
  backLabel = 'Zurück',
  rightAction,
  sticky = false,
  className = '',
}: HeaderProps) {
  return (
    <header
      className={`flex items-center justify-between p-4 border-b-[3px] border-iron-dark bg-white ${
        sticky ? 'sticky top-0 z-10' : ''
      } ${className}`}
    >
      <Button variant="icon" size="sm" onClick={onBack} aria-label={backLabel}>
        <ChevronLeft size={22} strokeWidth={3} className="text-iron-dark" />
      </Button>

      <h2 className="font-sans font-black text-xl tracking-tight uppercase flex-1 text-center">
        {title}
      </h2>

      {rightAction || <div className="w-11 h-11" />}
    </header>
  );
}
