interface ProgressBarProps {
  readonly total: number;
  readonly current: number;
}

export default function ProgressBar({ total, current }: Readonly<ProgressBarProps>) {
  const steps = Array.from({ length: total }, (_, i) => ({
    id: `step-${i}`,
    bg: i === current ? 'bg-primary-red' : i < current ? 'bg-iron-dark' : 'bg-white',
  }));

  return (
    <div className="flex flex-row w-full gap-2 h-4">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`flex-1 border-3 border-iron-dark transition-colors duration-150 ${step.bg}`}
        />
      ))}
    </div>
  );
}
