import { ReactNode } from 'react';

interface ScreenContainerProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export default function ScreenContainer({ children, className = '' }: Readonly<ScreenContainerProps>) {
  return (
    <div
      className={`w-full max-w-2xl mx-auto bg-cement-light min-h-[100dvh] border-x-0 sm:border-x-[3px] border-iron-dark flex flex-col justify-between ${className}`}
    >
      {children}
    </div>
  );
}
