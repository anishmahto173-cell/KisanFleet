import React from 'react';
import { OperationalStatus } from '../../types/fleet';

export interface StatusBadgeProps {
  status: OperationalStatus | 'confirmed' | 'in_field' | 'completed' | 'canceled' | 'pending' | 'escrow_held' | 'released' | 'processing';
  label?: string;
  pulse?: boolean;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  pulse = false,
  size = 'md',
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'available':
        return {
          bg: 'bg-[#ECFDF5]',
          border: 'border-[#A7F3D0]',
          text: 'text-[#065F46]',
          dot: 'bg-[#10B981]',
          defaultLabel: 'Available Now',
        };
      case 'reserved':
        return {
          bg: 'bg-[#FFFBEB]',
          border: 'border-[#FDE68A]',
          text: 'text-[#92400E]',
          dot: 'bg-[#D97706]',
          defaultLabel: 'Reserved / Scheduled',
        };
      case 'maintenance':
        return {
          bg: 'bg-[#FEF2F2]',
          border: 'border-[#FECACA]',
          text: 'text-[#991B1B]',
          dot: 'bg-[#EF4444]',
          defaultLabel: 'Maintenance / Down',
        };
      case 'in_transit':
        return {
          bg: 'bg-[#F0F9FF]',
          border: 'border-[#BAE6FD]',
          text: 'text-[#075985]',
          dot: 'bg-[#0284C7]',
          defaultLabel: 'In Transit',
        };
      case 'in_field':
        return {
          bg: 'bg-[#ECFDF5]',
          border: 'border-[#6EE7B7]',
          text: 'text-[#065F46]',
          dot: 'bg-[#10B981]',
          defaultLabel: 'IN-FIELD ACTIVE',
          pulseDefault: true,
        };
      case 'confirmed':
        return {
          bg: 'bg-[#ECFDF5]',
          border: 'border-[#A7F3D0]',
          text: 'text-[#065F46]',
          dot: 'bg-[#10B981]',
          defaultLabel: 'CONFIRMED & OPERATOR ASSIGNED',
        };
      case 'pending':
        return {
          bg: 'bg-[#FFFBEB]',
          border: 'border-[#FDE68A]',
          text: 'text-[#92400E]',
          dot: 'bg-[#D97706]',
          defaultLabel: 'PENDING ACCEPTANCE',
        };
      case 'completed':
        return {
          bg: 'bg-[#F5F4EF]',
          border: 'border-[#C2C8C2]',
          text: 'text-[#424843]',
          dot: 'bg-[#727973]',
          defaultLabel: 'COMPLETED & SETTLED',
        };
      case 'escrow_held':
        return {
          bg: 'bg-[#FFFBEB]',
          border: 'border-[#FDE68A]',
          text: 'text-[#92400E]',
          dot: 'bg-[#D97706]',
          defaultLabel: 'Escrow Held',
        };
      case 'released':
        return {
          bg: 'bg-[#ECFDF5]',
          border: 'border-[#A7F3D0]',
          text: 'text-[#065F46]',
          dot: 'bg-[#10B981]',
          defaultLabel: 'Settled & Released',
        };
      case 'processing':
        return {
          bg: 'bg-[#F0F9FF]',
          border: 'border-[#BAE6FD]',
          text: 'text-[#075985]',
          dot: 'bg-[#0284C7]',
          defaultLabel: 'Processing',
        };
      case 'canceled':
        return {
          bg: 'bg-[#FEF2F2]',
          border: 'border-[#FECACA]',
          text: 'text-[#991B1B]',
          dot: 'bg-[#EF4444]',
          defaultLabel: 'Canceled',
        };
      default:
        return {
          bg: 'bg-[#F5F4EF]',
          border: 'border-[#E3E3DE]',
          text: 'text-[#424843]',
          dot: 'bg-[#8D7B68]',
          defaultLabel: status,
        };
    }
  };

  const config = getStatusConfig();
  const shouldPulse = pulse || ('pulseDefault' in config && config.pulseDefault);

  return (
    <span
      className={`inline-flex items-center gap-1.5 border font-semibold rounded-[4px] tracking-wide select-none ${
        config.bg
      } ${config.border} ${config.text} ${
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      }`}
    >
      <span className="relative flex h-2 w-2">
        {shouldPulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dot}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`} />
      </span>
      <span>{label || config.defaultLabel}</span>
    </span>
  );
};
