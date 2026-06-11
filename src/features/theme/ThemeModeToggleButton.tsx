import { Moon, Sun } from 'lucide-react';
import Button from '../../components/ui/Button';

interface ThemeModeToggleButtonProps {
  readonly isDarkMode: boolean;
  readonly onToggle: () => void;
}

export default function ThemeModeToggleButton({
  isDarkMode,
  onToggle,
}: Readonly<ThemeModeToggleButtonProps>) {
  return (
    <Button
      variant="icon"
      size="sm"
      onClick={onToggle}
      title={isDarkMode ? 'Hellen Modus aktivieren' : 'Dunklen Modus aktivieren'}
      className="text-primary-red"
      aria-label={isDarkMode ? 'Zu hellem Modus wechseln' : 'Zu dunklem Modus wechseln'}
    >
      {isDarkMode ? <Sun size={18} strokeWidth={3} /> : <Moon size={18} strokeWidth={3} />}
    </Button>
  );
}
