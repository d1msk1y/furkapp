import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, RotateCw, Radio } from 'lucide-react';
import Button from '../ui/Button';
import IconBox from '../ui/IconBox';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Ridgeline from '../diagrams/Ridgeline';
import { useLanguage } from '../../features/i18n/useLanguage';

interface NetworkErrorScreenProps {
  readonly onResolveSuccess: () => void;
}

export default function NetworkErrorScreen({ onResolveSuccess }: Readonly<NetworkErrorScreenProps>) {
  const [loadingState, setLoadingState] = useState<'error' | 'reconnecting'>('error');
  const { t } = useLanguage();

  const handleRetry = () => {
    setLoadingState('reconnecting');
    setTimeout(() => {
      onResolveSuccess();
    }, 2500);
  };

  return (
    <div className="min-h-[100dvh] bg-cement-sand flex flex-col justify-center items-center p-6 select-none relative w-full">
      {/* Alpine ridgeline silhouette — "lost signal in the mountains" */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none">
        <Ridgeline className="text-slate-stone opacity-15" height={140} withTrack />
      </div>

      <main className="w-full max-w-md flex flex-col gap-8 z-10">
        {loadingState === 'error' && (
          <motion.div
            className="flex flex-col items-center justify-center gap-6 text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <IconBox>
              <AlertCircle size={40} className="text-white fill-current shrink-0" />
            </IconBox>

            <Card className="p-6 border-primary-red flex flex-col items-center">
              <Badge variant="outline" className="mb-3">
                <Radio size={12} className="animate-pulse" />
                {t('error.badge')}
              </Badge>

              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-iron-dark leading-tight font-heading">
                {t('error.title')}
              </h1>

              <div className="w-16 h-1.5 bg-primary-red my-4" />

              <p className="text-sm text-iron-dark/80 font-mono font-bold uppercase tracking-wider leading-relaxed">
                {t('error.error_code')}
              </p>

              <p className="text-sm text-neutral-400 font-mono mt-3 leading-tight uppercase">
                {t('error.description')}
              </p>
            </Card>

            <div className="w-full mt-4">
              <Button
                variant="secondary"
                className="w-full h-16 text-xl tracking-wide rounded-sm"
                onClick={handleRetry}
              >
                {t('error.retry_button')}
              </Button>
            </div>
          </motion.div>
        )}

        {loadingState === 'reconnecting' && (
          <motion.div
            className="flex flex-col items-center justify-center gap-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <IconBox bg="bg-primary-red" className="animate-pulse">
              <RotateCw size={40} className="text-white animate-spin shrink-0" style={{ animationDuration: '1s' }} />
            </IconBox>

            <Card className="p-6 flex flex-col items-center">
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-iron-dark leading-tight">
                {t('error.reconnecting_title')}
              </h1>

              <div className="w-16 h-1.5 bg-ink my-4 animate-bounce" />

              <p className="text-sm text-iron-dark/80 font-mono font-bold uppercase tracking-wider">
                {t('error.reconnecting_info')}
              </p>

              <p className="text-sm text-neutral-400 font-mono mt-3 uppercase">
                {t('error.reconnecting_debug')}
              </p>
            </Card>

            <div className="w-full mt-4 opacity-50 pointer-events-none cursor-not-allowed">
              <div className="w-full h-16 bg-cement-light border-3 border-neutral-300 text-neutral-400 flex items-center justify-center uppercase font-bold text-xl tracking-wide rounded-sm select-none">
                {t('error.reconnecting_title')}
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
