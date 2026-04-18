"use client";

interface StepperProps {
  title: string;
  subtitle: string;
  value: number;
  setter: (v: number) => void;
  min?: number;
}

export function Stepper({ title, subtitle, value, setter, min = 0 }: StepperProps) {
  return (
    <div className="flex items-center justify-between py-6 border-b border-neutral-100 last:border-0">
      <div>
        <div className="text-lg font-bold text-neutral-900">{title}</div>
        <div className="text-neutral-500 font-medium">{subtitle}</div>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setter(Math.max(min, value - 1))}
          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors outline-none focus:outline-none [-webkit-tap-highlight-color:transparent] ${value <= min ? 'border-neutral-200 text-neutral-300 cursor-not-allowed' : 'border-neutral-400 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'}`}
        >
          <svg className="w-5 h-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
        </button>
        <span className="w-6 text-center text-xl font-bold text-neutral-900">{value}</span>
        <button 
          onClick={() => setter(value + 1)}
          className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-neutral-400 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-colors outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]"
        >
          <svg className="w-5 h-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
        </button>
      </div>
    </div>
  );
}
