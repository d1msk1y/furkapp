import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, RotateCw, Radio } from 'lucide-react';
import Button from '../ui/Button';
import IconBox from '../ui/IconBox';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface NetworkErrorScreenProps {
  readonly onResolveSuccess: () => void;
}

export default function NetworkErrorScreen({ onResolveSuccess }: Readonly<NetworkErrorScreenProps>) {
  const [loadingState, setLoadingState] = useState<'error' | 'reconnecting'>('error');

  const handleRetry = () => {
    setLoadingState('reconnecting');
    setTimeout(() => {
      onResolveSuccess();
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-cement-sand flex flex-col justify-center items-center p-6 select-none relative w-full">
      {/* Background mountains */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex items-end justify-center overflow-hidden">
        <svg className="w-full h-1/2" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0,100 30,20 60,100" fill="#f22b0d" />
          <polygon points="40,100 70,40 100,100" fill="#f22b0d" />
        </svg>
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
                DOKUMENTATION INSTABIL
              </Badge>

              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-iron-dark leading-tight font-sans">
                Verbindung Fehlgeschlagen
              </h1>

              <div className="w-16 h-1.5 bg-primary-red my-4" />

              <p className="text-xs sm:text-sm text-iron-dark/80 font-mono font-bold uppercase tracking-wider leading-relaxed">
                FEHLERCODE: E-749 // SIGNAL IM HOCHGEBIRGE VERLOREN
              </p>

              <p className="text-[11px] text-neutral-400 font-mono mt-3 leading-tight uppercase">
                Analyse: In alpinen Bergregionen der Furka-Bergstrecke kommt es regelmässig zu schwankenden Netzabdeckungen.
              </p>
            </Card>

            <div className="w-full mt-4">
              <Button
                variant="secondary"
                className="w-full h-16 text-xl tracking-wide rounded-sm"
                onClick={handleRetry}
              >
                ERNEUT VERSUCHEN
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
                System Lädt...
              </h1>

              <div className="w-16 h-1.5 bg-iron-dark my-4 animate-bounce" />

              <p className="text-xs sm:text-sm text-iron-dark/80 font-mono font-bold uppercase tracking-wider">
                Telemetrie wird synchronisiert
              </p>

              <p className="text-[11px] text-neutral-400 font-mono mt-3 uppercase">
                PINGE BASISSTATION MUTTHORNHOF // BANDBREITE OPTIMIERT
              </p>
            </Card>

            <div className="w-full mt-4 opacity-50 pointer-events-none cursor-not-allowed">
              <div className="w-full h-16 bg-white border-3 border-neutral-300 text-neutral-400 flex items-center justify-center uppercase font-bold text-xl tracking-wide rounded-sm select-none">
                VERBINDUNG WIRD AUFGEBAUT...
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
