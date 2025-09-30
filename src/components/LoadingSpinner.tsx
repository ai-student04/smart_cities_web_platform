import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export function LoadingSpinner({ size = 'md', fullScreen = false }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const spinner = (
    <Loader2
      className={`${sizeClasses[size]} animate-spin text-primary-600`}
      aria-hidden="true"
    />
  );

  if (fullScreen) {
    return (
      <div
        className="flex items-center justify-center min-h-[400px]"
        role="status"
        aria-live="polite"
      >
        <div className="text-center">
          {spinner}
          <span className="sr-only">Loading content...</span>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div role="status" aria-live="polite" className="inline-block">
      {spinner}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
