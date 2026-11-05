import React from 'react';

export interface KpiCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: string;
  trendPositive?: boolean;
  icon?: React.ReactNode;
  badge?: string;
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  subValue,
  trend,
  trendPositive = true,
  icon,
  badge,
  className = '',
}) => {
  return (
    <div
      className={`bg-[#FBFBF9] border border-[#EFECE6] rounded-[8px] p-4.5 shadow-none transition-colors hover:border-[#C2C8C2] ${className}`}
    >
      <div className="flex items-center justify-between text-[#8D7B68] mb-2">
        <span className="text-xs font-bold uppercase tracking-[0.04em] text-[#534434]">{label}</span>
        {icon && <span className="text-[#1E3A2B] shrink-0">{icon}</span>}
        {badge && (
          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-[4px] bg-[#EFECE6] text-[#1E3A2B]">
            {badge}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="font-extrabold text-2xl md:text-3xl tracking-tight text-[#1E3A2B] font-mono">
          {value}
        </span>
        {subValue && (
          <span className="text-xs text-[#8D7B68] font-medium font-mono">{subValue}</span>
        )}
      </div>

      {trend && (
        <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
          <span
            className={
              trendPositive
                ? 'text-[#10B981] bg-[#ECFDF5] px-1.5 py-0.5 rounded-[4px]'
                : 'text-[#EF4444] bg-[#FEF2F2] px-1.5 py-0.5 rounded-[4px]'
            }
          >
            {trend}
          </span>
          <span className="text-[#8D7B68] text-[11px]">vs regional benchmark</span>
        </div>
      )}
    </div>
  );
};
