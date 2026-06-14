import { useEffect, useState } from 'react';

const CHILD_MODE_STORAGE_KEY = 'fo_child_mode';

function getInitialChildMode(): boolean {
  try {
    const saved = localStorage.getItem(CHILD_MODE_STORAGE_KEY);
    if (saved !== null) {
      return saved === 'true';
    }
  } catch (e) {
    console.warn('Storage access unavailable:', e);
  }
  return false;
}

export function useChildMode() {
  const [isChildMode, setIsChildMode] = useState<boolean>(getInitialChildMode());

  useEffect(() => {
    const handleStorageChange = () => {
      setIsChildMode(getInitialChildMode());
    };

    window.addEventListener('childModeChanged', handleStorageChange);
    return () => {
      window.removeEventListener('childModeChanged', handleStorageChange);
    };
  }, []);

  const toggleChildMode = () => {
    const newValue = !isChildMode;
    setIsChildMode(newValue);
    try {
      localStorage.setItem(CHILD_MODE_STORAGE_KEY, String(newValue));
      window.dispatchEvent(new Event('childModeChanged'));
    } catch (e) {
      console.warn('Error saving child mode preference:', e);
    }
  };

  return {
    isChildMode,
    toggleChildMode,
  };
}
