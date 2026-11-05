import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none focus-double-ring';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-[4px] gap-1.5 h-8',
    md: 'text-sm px-4 py-2.5 rounded-[8px] gap-2 h-11',
    lg: 'text-base px-6 py-3 rounded-[8px] gap-2.5 h-12',
  };

  const variantClasses = {
    primary:
      'bg-[#1E3A2B] text-white hover:bg-[#14281E] active:bg-[#0E1C15] shadow-xs border border-[#1E3A2B]',
    secondary:
      'bg-[#F4F3EE] text-[#1E3A2B] border border-[#8D7B68] hover:bg-[#EFECE6] active:bg-[#E5E1D8]',
    accent:
      'bg-[#10B981] text-white hover:bg-[#059669] active:bg-[#047857] shadow-xs border border-[#10B981]',
    outline:
      'bg-transparent text-[#1E3A2B] border border-[#C2C8C2] hover:bg-[#F5F4EF]',
    ghost:
      'bg-transparent text-[#1E3A2B] hover:bg-[#EFEEE9] active:bg-[#E9E8E3]',
    danger:
      'bg-[#EF4444] text-white hover:bg-[#DC2626] border border-[#DC2626]',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
