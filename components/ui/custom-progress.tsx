// components/ui/custom-progress.tsx
import * as React from 'react';

interface ProgressProps {
  value: number;
  className?: string;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, className = '', ...props }, ref) => (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      className={`h-1.5 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
      {...props}
    >
      <div
        className="h-full bg-[#2D2D2D] transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  )
);

Progress.displayName = 'Progress';
