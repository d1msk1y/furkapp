import { motion } from 'motion/react';
import { ArrowRight, HardHat, Layers, TrendingUp, History, SlidersHorizontal } from 'lucide-react';
import ScreenContainer from '../layout/ScreenContainer';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useLanguage } from '../../features/i18n/useLanguage';

interface IntroScreenProps {
  readonly onExplore: () => void;
  readonly onSimulateError: () => void;
  readonly onOpenSettings: () => void;
}

export default function IntroScreen({ onExplore, onSimulateError, onOpenSettings }: Readonly<IntroScreenProps>) {
  const { t } = useLanguage();
  return (
    <ScreenContainer className="overflow-x-hidden relative">

      <div className="flex-1 flex flex-col">
        {/* Hero Image */}
        <div className="w-full h-[40vh] bg-neutral-900 overflow-hidden relative border-b-[3px] border-iron-dark flex flex-col justify-end">
          <img
            src="./hero-intro.jpg"
            alt="Swiss Alps mountain landscape"
            className="absolute inset-0 w-full h-full object-cover select-none"
          />

          <div className="w-full h-1/4 bg-linear-to-t from-black to-transparent absolute bottom-0 left-0" />
        </div>

        {/* Text Area */}
        <div className="p-8 pt-4 bg-cement-light flex-1 flex flex-col justify-start">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge variant="dark" className="mb-4 text-[11px] px-2 py-1">
              <HardHat size={12} className="text-primary-red" />
              {t('intro.badge')}
            </Badge>

            <h1 className="text-4xl xs:text-5xl font-extrabold tracking-tighter uppercase leading-[0.95] text-iron-dark mb-6">
              {t('intro.title_line1')} <span className="text-primary-red">{t('intro.title_line2')}</span>
            </h1>
          </motion.div>

          <motion.p
            className="text-base md:text-lg text-iron-dark font-medium leading-[140%] mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {t('intro.description')}
          </motion.p>

          {/* Visual stat tiles */}
          <motion.div
            className="grid grid-cols-3 gap-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            {[
              { icon: Layers, value: '5', labelKey: 'intro.stat_systems' },
              { icon: TrendingUp, value: '48%', labelKey: 'intro.stat_steepest' },
              { icon: History, value: t('intro.stat_era_value'), labelKey: 'intro.stat_era' },
            ].map((stat) => (
              <div
                key={stat.labelKey}
                className="flex flex-col items-center text-center bg-cement-light border-[3px] border-iron-dark shadow-hard-sm p-3"
              >
                <stat.icon size={20} strokeWidth={2.5} className="text-primary-red mb-2" />
                <span className="text-xl xs:text-2xl font-black tracking-tighter leading-none text-iron-dark">
                  {stat.value}
                </span>
                <span className="text-xs font-mono font-black uppercase tracking-widest text-slate-stone mt-1">
                  {t(stat.labelKey)}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="p-6 bg-cement-light border-t-[3px] border-iron-dark sticky bottom-0 z-10">
        <div className="flex gap-3 items-stretch">
          <Button variant="cta" className="bg-primary-red text-white hover:bg-swiss-orange flex-1" onClick={onExplore}>
            <span>{t('intro.explore_button')}</span>
            <ArrowRight size={28} strokeWidth={3} className="animate-pulse" />
          </Button>
          <Button
            variant="secondary"
            onClick={onOpenSettings}
            aria-label={t('common.settings')}
            className="aspect-square h-16 shrink-0 flex items-center justify-center p-0"
          >
            <SlidersHorizontal size={22} strokeWidth={3} className="text-iron-dark" />
          </Button>
        </div>
      </div>
    </ScreenContainer>
  );
}
