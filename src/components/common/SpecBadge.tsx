import React from 'react';

export interface SpecBadgeProps {
  label: string;
  value?: string | number;
  className?: string;
}

export const SpecBadge: React.FC<SpecBadgeProps> = ({ label, value, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 bg-[#EFECE6] border border-[#E3E3DE] text-[#534434] text-[11px] font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-[0.05em] select-none ${className}`}
    >
      <span className="text-[#8D7B68] font-semibold">{label}</span>
      {value !== undefined && <span className="font-mono text-[#1E3A2B]">{value}</span>}
    </span>
  );
};
