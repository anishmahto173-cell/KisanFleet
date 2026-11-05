import React from 'react';
import { Fuel, Gauge, Compass, ShieldCheck, MapPin, Eye, CalendarPlus } from 'lucide-react';
import { Equipment } from '../../types/fleet';
import { StatusBadge } from '../common/StatusBadge';
import { SpecBadge } from '../common/SpecBadge';
import { Button } from '../common/Button';

export interface EquipmentCardProps {
  equipment: Equipment;
  currency: 'USD' | 'INR';
  onViewDetails: (equipment: Equipment) => void;
  onBook: (equipment: Equipment) => void;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({
  equipment,
  currency,
  onViewDetails,
  onBook,
}) => {
  const isAvailable = equipment.status === 'available';
  const priceDisplay =
    currency === 'USD'
      ? `$${equipment.hourlyRateUsd}`
      : `₹${equipment.hourlyRateInr}`;
  const dailyDisplay =
    currency === 'USD'
      ? `$${equipment.dailyRateUsd}`
      : `₹${equipment.dailyRateInr}`;

  return (
    <div className="bg-[#FBFBF9] border border-[#EFECE6] rounded-[8px] p-4 flex flex-col justify-between hover:border-[#1E3A2B] transition-all duration-200 shadow-none group">
      <div>
        {/* Card Header Image with Status Chip */}
        <div className="relative rounded-[6px] overflow-hidden border border-[#EFECE6] mb-3 bg-[#EFEEE9] aspect-[16/9]">
          <img
            src={equipment.image}
            alt={equipment.name}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
          <div className="absolute top-2.5 right-2.5">
            <StatusBadge status={equipment.status} label={equipment.statusLabel} />
          </div>
          <div className="absolute bottom-2.5 left-2.5">
            <span className="bg-[#1E3A2B]/85 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded-[4px] border border-white/20">
              {equipment.licensePlate}
            </span>
          </div>
        </div>

        {/* Machine Titles */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-[11px] text-[#8D7B68] font-bold uppercase tracking-wider mb-1">
            <span>{equipment.categoryLabel}</span>
            <span className="flex items-center gap-1 text-[#534434] lowercase">
              <MapPin className="w-3 h-3 text-[#10B981]" />
              {equipment.depotDistance}
            </span>
          </div>
          <h3 className="text-base font-bold text-[#1E3A2B] leading-tight">
            {equipment.name}
          </h3>
          <p className="text-xs text-[#534434] font-medium mt-0.5">{equipment.model}</p>
        </div>

        {/* Spec Micro-Matrix Grid (4 items) */}
        <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#FAF9F4] border border-[#EFECE6] rounded-[6px] mb-3 text-xs">
          <div className="flex items-center gap-1.5 text-[#534434]">
            <Gauge className="w-3.5 h-3.5 text-[#8D7B68] shrink-0" />
            <span className="font-semibold">{equipment.hp} HP</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#534434]">
            <Fuel className="w-3.5 h-3.5 text-[#8D7B68] shrink-0" />
            <span className="truncate">{equipment.fuelLevelPct}% Fuel ({equipment.fuelCapacityGal} gal)</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#534434]">
            <Compass className="w-3.5 h-3.5 text-[#8D7B68] shrink-0" />
            <span className="truncate font-mono">{equipment.capacitySpec}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#534434]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
            <span className="truncate">{equipment.guidanceSpec}</span>
          </div>
        </div>

        {/* Depot Location Badge */}
        <div className="flex items-center justify-between text-[11px] text-[#8D7B68] font-medium px-1 mb-2">
          <span>Depot: <strong className="text-[#1E3A2B]">{equipment.depotHub}</strong></span>
          <span className="font-mono text-[#534434]">{equipment.engineHours} hrs</span>
        </div>
      </div>

      {/* Footer: Pricing & Dual CTA */}
      <div className="pt-3 border-t border-[#EFECE6]">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-lg font-mono font-extrabold text-[#1E3A2B]">
              {priceDisplay}
            </span>
            <span className="text-xs font-semibold text-[#8D7B68]"> / engine hr</span>
          </div>
          <span className="text-[11px] font-mono text-[#8D7B68]">
            est. {dailyDisplay} / 8-hr day
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onViewDetails(equipment)}
            icon={<Eye className="w-3.5 h-3.5" />}
          >
            Inspect
          </Button>
          <Button
            variant="accent"
            size="sm"
            disabled={!isAvailable}
            onClick={() => onBook(equipment)}
            icon={<CalendarPlus className="w-3.5 h-3.5" />}
          >
            {isAvailable ? 'Book / Dispatch' : 'Unavailable'}
          </Button>
        </div>
      </div>
    </div>
  );
};
