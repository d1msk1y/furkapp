import { AnimatePresence, motion } from 'motion/react';
import { Settings, X, Sun, Moon } from 'lucide-react';
import 'flag-icons/css/flag-icons.min.css';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../../features/i18n/i18n.config';
import { useLanguage } from '../../features/i18n/useLanguage';
import { useThemeMode } from '../../features/theme/useThemeMode';
import { useChildMode } from '../../features/childMode/useChildMode';
import Button from './Button';
import IconBox from './IconBox';
import Badge from './Badge';

interface SettingsModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  /** When true, hides the close button and requires a language selection first (onboarding mode) */
  readonly isOnboarding?: boolean;
}

export default function SettingsModal({ isOpen, onClose, isOnboarding = false }: Readonly<SettingsModalProps>) {
  const { t, language, setLanguage } = useLanguage();
  const { isDarkMode, toggleTheme } = useThemeMode();
  const { isChildMode, toggleChildMode } = useChildMode();

  const handleLanguageSelect = (lang: SupportedLanguage) => {
    setLanguage(lang);
    if (isOnboarding) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isOnboarding ? undefined : onClose}
            className={`fixed inset-0 bg-ink/70 z-40 ${isOnboarding ? '' : 'cursor-pointer'}`}
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-5 pointer-events-none"
          >
            <div className="w-full max-w-sm pointer-events-auto bg-cement-light border-[3px] border-iron-dark shadow-[6px_6px_0px_0px_var(--app-shadow-color)] flex flex-col">

              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b-[3px] border-iron-dark">
                <div className="flex items-center gap-3">
                  <IconBox size="sm">
                    <Settings size={18} className="text-white" strokeWidth={2.5} />
                  </IconBox>
                  <div>
                    <span className="block text-[10px] font-mono font-extrabold tracking-widest uppercase text-primary-red">
                      {isOnboarding ? t('settings.onboarding_subtitle') : t('settings.subtitle')}
                    </span>
                    <h2 className="text-lg font-black uppercase tracking-tight text-iron-dark leading-none">
                      {isOnboarding ? t('settings.onboarding_title') : t('settings.title')}
                    </h2>
                  </div>
                </div>

                {!isOnboarding && (
                  <Button variant="icon" size="sm" onClick={onClose} aria-label={t('common.close')}>
                    <X size={20} strokeWidth={3} className="text-iron-dark" />
                  </Button>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-6">

                {/* Language Section */}
                <div>
                  <Badge variant="outline" className="mb-3 text-[10px]">
                    {t('settings.language_section')}
                  </Badge>

                  <div className="flex flex-col gap-2">
                    {SUPPORTED_LANGUAGES.map((lang) => {
                      const isActive = language === lang.code || language.startsWith(lang.code);
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => handleLanguageSelect(lang.code)}
                          className={`flex items-center gap-4 w-full px-4 py-3 border-[3px] transition-all duration-75 cursor-pointer select-none
                            ${isActive
                              ? 'border-iron-dark bg-ink text-white shadow-[3px_3px_0px_0px_var(--app-shadow-color)]'
                              : 'border-iron-dark bg-cement-sand text-iron-dark hover:bg-cement-light active:translate-x-[2px] active:translate-y-[2px] shadow-[3px_3px_0px_0px_var(--app-shadow-color)] active:shadow-none'
                            }`}
                        >
                          {/* Flag */}
                          <span
                            className={`fi fi-${lang.flagCode} text-2xl shrink-0 rounded-sm`}
                            aria-hidden="true"
                          />

                          {/* Language name */}
                          <span className="flex-1 text-left font-black uppercase tracking-wide text-sm">
                            {lang.nativeLabel}
                          </span>

                          {/* Active indicator */}
                          <span className={`text-[10px] font-mono font-extrabold tracking-widest uppercase ${isActive ? 'text-primary-red' : 'text-transparent'}`}>
                            ✓ {lang.code.toUpperCase()}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Child Mode Section */}
                {!isOnboarding && (
                  <div>
                    <Badge variant="outline" className="mb-3 text-[10px]">
                      {t('settings.child_mode_section')}
                    </Badge>

                    <button
                      type="button"
                      onClick={() => toggleChildMode()}
                      className={`flex items-center justify-between w-full px-4 py-3 border-[3px] border-iron-dark transition-all duration-75 cursor-pointer select-none font-black uppercase tracking-wide text-sm mb-6
                        ${isChildMode
                          ? 'bg-ink text-white shadow-[3px_3px_0px_0px_var(--app-shadow-color)]'
                          : 'bg-cement-sand text-iron-dark hover:bg-cement-light active:translate-x-[2px] active:translate-y-[2px] shadow-[3px_3px_0px_0px_var(--app-shadow-color)] active:shadow-none'
                        }`}
                    >
                      <span>{t('settings.child_mode_title')}</span>
                      <span className={`text-[10px] font-mono font-extrabold tracking-widest uppercase ${isChildMode ? 'text-primary-red' : 'text-iron-dark/50'}`}>
                        {isChildMode ? t('settings.status_on') : t('settings.status_off')}
                      </span>
                    </button>
                  </div>
                )}

                {/* Theme Section */}
                {!isOnboarding && (
                  <div>
                    <Badge variant="outline" className="mb-3 text-[10px]">
                      {t('settings.theme_section')}
                    </Badge>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => !isDarkMode || toggleTheme()}
                        className={`flex items-center justify-center gap-2 px-4 py-3 border-[3px] border-iron-dark transition-all duration-75 cursor-pointer select-none font-black uppercase tracking-wide text-sm
                          ${!isDarkMode
                            ? 'bg-ink text-white shadow-[3px_3px_0px_0px_var(--app-shadow-color)]'
                            : 'bg-cement-sand text-iron-dark hover:bg-cement-light active:translate-x-[2px] active:translate-y-[2px] shadow-[3px_3px_0px_0px_var(--app-shadow-color)] active:shadow-none'
                          }`}
                      >
                        <Sun size={16} strokeWidth={2.5} />
                        {t('settings.theme_light')}
                      </button>

                      <button
                        type="button"
                        onClick={() => isDarkMode || toggleTheme()}
                        className={`flex items-center justify-center gap-2 px-4 py-3 border-[3px] border-iron-dark transition-all duration-75 cursor-pointer select-none font-black uppercase tracking-wide text-sm
                          ${isDarkMode
                            ? 'bg-ink text-white shadow-[3px_3px_0px_0px_var(--app-shadow-color)]'
                            : 'bg-cement-sand text-iron-dark hover:bg-cement-light active:translate-x-[2px] active:translate-y-[2px] shadow-[3px_3px_0px_0px_var(--app-shadow-color)] active:shadow-none'
                          }`}
                      >
                        <Moon size={16} strokeWidth={2.5} />
                        {t('settings.theme_dark')}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer divider */}
              <div className="w-full h-[3px] bg-iron-dark" />

              {/* Footer action */}
              {isOnboarding && (
                <div className="p-4 bg-cement-sand">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-iron-dark/60 text-center">
                    {t('settings.language_section')} · {t('settings.theme_section')}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
