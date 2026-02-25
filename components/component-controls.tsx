'use client';

import { ReactNode } from 'react';

interface ControlSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
}

export function ControlSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 0.1,
}: ControlSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[var(--color-foreground)]">
          {label}
        </label>
        <span className="text-sm tabular-nums text-[var(--color-muted-foreground)]">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="slider-input h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-700"
        style={{
          background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${
            ((value - min) / (max - min)) * 100
          }%, rgb(63 63 70) ${((value - min) / (max - min)) * 100}%, rgb(63 63 70) 100%)`,
        }}
      />
    </div>
  );
}

interface ControlColorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ControlColor({ label, value, onChange }: ControlColorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[var(--color-foreground)]">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <div
          className="h-10 w-10 cursor-pointer rounded-lg border-2 border-[var(--color-border)] shadow-sm transition-transform duration-150 hover:scale-110"
          style={{ backgroundColor: value }}
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'color';
            input.value = value;
            input.onchange = (e) => onChange((e.target as HTMLInputElement).value);
            input.click();
          }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm font-mono text-[var(--color-foreground)] transition-colors duration-150 focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20"
        />
      </div>
    </div>
  );
}

interface ControlSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}

export function ControlSelect({
  label,
  value,
  onChange,
  options,
}: ControlSelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[var(--color-foreground)]">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-foreground)] transition-colors duration-150 focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface ControlSectionProps {
  title: string;
  children: ReactNode;
}

export function ControlSection({ title, children }: ControlSectionProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)]">
        {title}
      </h4>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

interface ControlGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3;
}

export function ControlGrid({ children, columns = 3 }: ControlGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={`grid gap-8 ${gridCols[columns]}`}>
      {children}
    </div>
  );
}
