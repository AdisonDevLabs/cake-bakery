// src/components/ui/Button.tsx
import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  children,
  ...props
}) => {
  const variants = {
    primary: 'bg-brand-primary text-white hover:bg-brand-accent shadow-sm',
    secondary: 'bg-brand-secondary text-brand-accent hover:bg-brand-secondary/80',
    outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white',
    // Added hover:text-slate-900 for a snappier interaction state
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
  };

  const sizes = {
    // Added font-medium for consistency with md and lg
    sm: 'px-3 py-1.5 text-sm font-medium',
    md: 'px-6 py-2.5 text-base font-medium',
    lg: 'px-8 py-3 text-lg font-bold',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin border-2 border-current border-t-transparent rounded-full shrink-0" />
      ) : null}
      {children}
    </button>
  );
};