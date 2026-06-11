import { useEffect, useMemo, useState } from 'react';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'fo_theme_preference';

function getInitialThemePreference(): ThemePreference {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved;
    }
  } catch (e) {
    console.warn('Storage-Zugriff nicht verfugbar:', e);
  }
  return 'system';
}

function resolveTheme(preference: ThemePreference, systemPrefersDark: boolean): ResolvedTheme {
  if (preference === 'system') {
    return systemPrefersDark ? 'dark' : 'light';
  }
  return preference;
}

export function useThemeMode() {
  const [themePreference, setThemePreference] = useState<ThemePreference>('system');
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  useEffect(() => {
    setThemePreference(getInitialThemePreference());

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemPrefersDark(media.matches);

    const onMediaChange = (event: MediaQueryListEvent) => {
      setSystemPrefersDark(event.matches);
    };

    media.addEventListener('change', onMediaChange);
    return () => {
      media.removeEventListener('change', onMediaChange);
    };
  }, []);

  const resolvedTheme = useMemo(
    () => resolveTheme(themePreference, systemPrefersDark),
    [themePreference, systemPrefersDark],
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(resolvedTheme === 'dark' ? 'theme-dark' : 'theme-light');
  }, [resolvedTheme]);

  const toggleTheme = () => {
    const nextTheme: ThemePreference = resolvedTheme === 'dark' ? 'light' : 'dark';
    setThemePreference(nextTheme);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (e) {
      console.warn('Fehler beim Speichern des Themes:', e);
    }
  };

  return {
    themePreference,
    resolvedTheme,
    isDarkMode: resolvedTheme === 'dark',
    setThemePreference,
    toggleTheme,
  };
}
