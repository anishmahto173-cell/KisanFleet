import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  Gauge,
  Fuel,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  PhoneCall,
  UserCheck,
  Check,
  Zap,
} from 'lucide-react';
import { Equipment } from '../../types/fleet';
import { StatusBadge } from '../common/StatusBadge';
import { SpecBadge } from '../common/SpecBadge';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';

export interface EquipmentDetailScreenProps {
  equipment: Equipment;
  currency: 'USD' | 'INR';
  onBack: () => void;
  onProceedToBooking: (equipment: Equipment, selectedDate: number, shift: string) => void;
}

export const EquipmentDetailScreen: React.FC<EquipmentDetailScreenProps> = ({
  equipment,
  currency,
  onBack,
  onProceedToBooking,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(18); // Default Oct 18, 2025
  const [selectedShift, setSelectedShift] = useState<'morning' | 'afternoon' | 'full_day'>('morning');
  const [requestOperator, setRequestOperator] = useState<boolean>(true);
  const { showToast } = useToast();

  // Calendar dates mock setup for October 2025
  // Day states: 'available' (green), 'reserved' (amber), 'maintenance' (red)
  const getDayStatus = (day: number): 'available' | 'reserved' | 'maintenance' => {
    if (day === 12 || day === 13) return 'maintenance';
    if (day === 15 || day === 16 || day === 17 || day === 22 || day === 23) return 'reserved';
    return 'available';
  };

  const daysInOctober = Array.from({ length: 31 }, (_, i) => i + 1);

  // Calculations
  const engineHours = selectedShift === 'full_day' ? 16 : 8;
  const hourlyRate = currency === 'USD' ? equipment.hourlyRateUsd : equipment.hourlyRateInr;
  const operatorRatePerHour = currency === 'USD' ? 45 : 45; // Localized
  const depotPrepFee = currency === 'USD' ? 120 : 120;
  const escrowDeposit = currency === 'USD' ? 350 : 350;

  const machineCost = engineHours * hourlyRate;
  const operatorCost = requestOperator ? engineHours * operatorRatePerHour : 0;
  const totalCost = machineCost + operatorCost + depotPrepFee + escrowDeposit;

  const currencySymbol = currency === 'USD' ? '$' : '₹';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back button & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#EFECE6]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A2B] hover:text-[#10B981] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Equipment Discovery
        </button>

        <div className="text-xs text-[#8D7B68] font-medium flex items-center gap-1.5">
          <span>Equipment Discovery</span>
          <span>&gt;</span>
          <span className="capitalize">{equipment.category}</span>
          <span>&gt;</span>
          <strong className="text-[#1E3A2B]">{equipment.name}</strong>
        </div>
      </div>

      {/* Screen Title & Metadata Subtitle */}
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A2B] tracking-tight">
            {equipment.name}
          </h1>
          <StatusBadge status={equipment.status} label={equipment.statusLabel} />
        </div>
        <p className="text-xs sm:text-sm text-[#8D7B68] font-mono">
          Location: <span className="text-[#1E3A2B] font-semibold">{equipment.depotHub} - {equipment.depotLocation}</span> |
          License/ID: <span className="text-[#1E3A2B] font-semibold">{equipment.licensePlate}</span> |
          Status: <span className="text-[#10B981] font-bold">Available / Free Morning</span>
        </p>
      </div>

      {/* 12-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (~7 cols): Media, Specs, Inspection, Heritage */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Hero Photo */}
          <div className="relative rounded-[8px] overflow-hidden border border-[#EFECE6] bg-[#FAF9F4] aspect-[16/9]">
            <img
              src={equipment.image}
              alt={equipment.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-[#072417]/90 backdrop-blur-xs text-white text-xs font-mono font-bold px-3 py-1 rounded-[4px] border border-white/20">
                {equipment.model}
              </span>
            </div>
            <div className="absolute bottom-3 right-3">
              <span className="bg-[#10B981] text-[#072417] text-xs font-bold px-3 py-1 rounded-[4px] shadow-sm">
                Certified Operational
              </span>
            </div>
          </div>

          {/* Machinery Specifications & Telemetry */}
          <div className="bg-white border border-[#EFECE6] rounded-[8px] p-6 space-y-4">
            <h3 className="font-extrabold text-base text-[#1E3A2B] flex items-center gap-2">
              <Gauge className="w-5 h-5 text-[#10B981]" />
              Machinery Specifications &amp; Telemetry
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#FAF9F4] border border-[#EFECE6] rounded-[6px]">
                <span className="text-[11px] font-bold text-[#8D7B68] uppercase block">Engine Rating</span>
                <span className="font-mono font-extrabold text-base text-[#1E3A2B]">{equipment.hp} HP</span>
                <span className="text-[10px] text-[#534434] block mt-0.5">PowerTech 13.5L Tier 4</span>
              </div>
              <div className="p-3 bg-[#FAF9F4] border border-[#EFECE6] rounded-[6px]">
                <span className="text-[11px] font-bold text-[#8D7B68] uppercase block">Fuel Capacity</span>
                <span className="font-mono font-extrabold text-base text-[#1E3A2B]">{equipment.fuelCapacityGal} gal</span>
                <span className="text-[10px] text-[#10B981] font-semibold block mt-0.5">{equipment.fuelLevelPct}% Reserve Level</span>
              </div>
              <div className="p-3 bg-[#FAF9F4] border border-[#EFECE6] rounded-[6px]">
                <span className="text-[11px] font-bold text-[#8D7B68] uppercase block">Payload / Tank</span>
                <span className="font-mono font-extrabold text-base text-[#1E3A2B]">{equipment.capacitySpec}</span>
                <span className="text-[10px] text-[#534434] block mt-0.5">High-Capacity Auger</span>
              </div>
              <div className="p-3 bg-[#FAF9F4] border border-[#EFECE6] rounded-[6px]">
                <span className="text-[11px] font-bold text-[#8D7B68] uppercase block">Guidance &amp; AutoTrac</span>
                <span className="font-bold text-sm text-[#1E3A2B]">{equipment.guidanceSpec}</span>
                <span className="text-[10px] text-[#10B981] font-semibold block mt-0.5">StarFire 7000 Linked</span>
              </div>
              <div className="p-3 bg-[#FAF9F4] border border-[#EFECE6] rounded-[6px]">
                <span className="text-[11px] font-bold text-[#8D7B68] uppercase block">Drive Configuration</span>
                <span className="font-bold text-sm text-[#1E3A2B]">{equipment.driveType}</span>
                <span className="text-[10px] text-[#534434] block mt-0.5">Low Ground Compaction</span>
              </div>
              <div className="p-3 bg-[#FAF9F4] border border-[#EFECE6] rounded-[6px]">
                <span className="text-[11px] font-bold text-[#8D7B68] uppercase block">Unload Throughput</span>
                <span className="font-mono font-extrabold text-base text-[#1E3A2B]">4.0 bu/s</span>
                <span className="text-[10px] text-[#534434] block mt-0.5">Foldable Clean Spout</span>
              </div>
            </div>
          </div>

          {/* Depot Health & Sensor Readiness */}
          <div className="bg-white border border-[#EFECE6] rounded-[8px] p-6 space-y-4">
            <h3 className="font-extrabold text-base text-[#1E3A2B] flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#10B981]" />
              Depot Health &amp; Sensor Readiness
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-[#FAF9F4] border border-[#EFECE6] rounded-[6px] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#534434]">Engine Hours Ticker</span>
                  <span className="font-mono font-extrabold text-[#1E3A2B] bg-[#EFECE6] px-2 py-0.5 rounded">
                    {equipment.engineHours} hrs
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#534434]">Hydraulic Fluid Pressure</span>
                  <span className="font-mono text-[#10B981] font-bold">{equipment.hydraulicPressure}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#534434]">Telematics Signal Beacon</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#10B981]">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span> 99.4% RSSI
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-[#FAF9F4] border border-[#EFECE6] rounded-[6px] space-y-2">
                <span className="block text-xs font-bold text-[#534434]">Fuel Tank Level</span>
                <div className="w-full bg-[#E3E3DE] h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-[#10B981] h-full rounded-full transition-all duration-500"
                    style={{ width: `${equipment.fuelLevelPct}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-[#8D7B68]">
                  <span>{equipment.fuelLevelPct}% Fuel</span>
                  <span>{equipment.fuelCapacityGal} gal capacity</span>
                </div>
              </div>
            </div>
          </div>

          {/* Condition & Service Heritage */}
          <div className="bg-[#FAF9F4] border border-[#EFECE6] rounded-[8px] p-5 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#534434]">
              Condition &amp; Service Heritage
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#534434]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Clean engine oil confirmed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Tire tread depth: 92%</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Chopper knives sharpened</span>
              </div>
            </div>
            <div className="pt-2 border-t border-[#EFECE6] text-xs text-[#8D7B68] flex items-center justify-between">
              <span>{equipment.inspector}</span>
              <span className="font-mono">{equipment.lastServiceDate}</span>
            </div>
          </div>

          {/* Operator Notice */}
          <div className="p-4 rounded-[6px] bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] text-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Class IV Operator Required</strong>
              <span>
                This high-tonnage implement mandates a certified agricultural equipment operator for field deployment and transit corridor navigation.
              </span>
            </div>
          </div>
        </div>

        {/* Right Sticky Booking Column (~5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#EFECE6] rounded-[8px] p-6 space-y-5 sticky top-24 shadow-xs">
          {/* Rate Header */}
          <div className="pb-4 border-b border-[#EFECE6]">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="font-mono text-3xl font-extrabold text-[#1E3A2B]">
                  {currencySymbol}{hourlyRate}
                </span>
                <span className="text-sm font-semibold text-[#8D7B68]"> / engine hr</span>
              </div>
              <span className="text-xs font-mono text-[#8D7B68]">
                {currencySymbol}{currency === 'USD' ? equipment.dailyRateUsd : equipment.dailyRateInr} / 8-hr day
              </span>
            </div>
          </div>

          {/* Interactive Month Calendar (October 2025) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#534434] flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-[#10B981]" />
                October 2025 Availability
              </span>
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#8D7B68]">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]"></span> Avail
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#D97706]"></span> Booked
                </span>
              </div>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <span key={i} className="text-[10px] font-bold text-[#8D7B68] py-1">
                  {d}
                </span>
              ))}

              {/* Offset for Oct 1, 2025 (Wednesday) */}
              <div className="py-2"></div>
              <div className="py-2"></div>
              <div className="py-2"></div>

              {daysInOctober.map((day) => {
                const dayStatus = getDayStatus(day);
                const isSelected = selectedDay === day;

                let dotColor = 'bg-[#10B981]';
                if (dayStatus === 'reserved') dotColor = 'bg-[#D97706]';
                if (dayStatus === 'maintenance') dotColor = 'bg-[#EF4444]';

                return (
                  <button
                    key={day}
                    type="button"
                    disabled={dayStatus !== 'available'}
                    onClick={() => setSelectedDay(day)}
                    className={`py-1.5 rounded-[4px] font-mono text-xs relative flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1E3A2B] text-white font-bold ring-2 ring-[#10B981]'
                        : dayStatus === 'available'
                        ? 'hover:bg-[#F5F4EF] text-[#1B1C19]'
                        : 'opacity-40 text-[#8D7B68] cursor-not-allowed bg-[#FAF9F4]'
                    }`}
                  >
                    <span>{day}</span>
                    <span className={`w-1 h-1 rounded-full mt-0.5 ${dotColor}`}></span>
                  </button>
                );
              })}
            </div>
            <div className="mt-2 text-right">
              <span className="text-[11px] font-semibold text-[#10B981]">
                Selected Date: Oct {selectedDay}, 2025
              </span>
            </div>
          </div>

          {/* Operational Shift Selector */}
          <div className="pt-3 border-t border-[#EFECE6]">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#534434] mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#10B981]" />
              Operational Deployment Shift
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedShift('morning')}
                className={`p-2.5 rounded-[4px] border text-left cursor-pointer transition-all ${
                  selectedShift === 'morning'
                    ? 'border-[#1E3A2B] bg-[#1E3A2B] text-white'
                    : 'border-[#E6DFD5] bg-white text-[#534434] hover:bg-[#F5F4EF]'
                }`}
              >
                <span className="block font-bold text-xs">Morning</span>
                <span className={`block text-[10px] mt-0.5 ${selectedShift === 'morning' ? 'text-[#AECEB9]' : 'text-[#8D7B68]'}`}>
                  6:00 AM - 2:00 PM (8h)
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedShift('afternoon')}
                className={`p-2.5 rounded-[4px] border text-left cursor-pointer transition-all ${
                  selectedShift === 'afternoon'
                    ? 'border-[#1E3A2B] bg-[#1E3A2B] text-white'
                    : 'border-[#E6DFD5] bg-white text-[#534434] hover:bg-[#F5F4EF]'
                }`}
              >
                <span className="block font-bold text-xs">Afternoon</span>
                <span className={`block text-[10px] mt-0.5 ${selectedShift === 'afternoon' ? 'text-[#AECEB9]' : 'text-[#8D7B68]'}`}>
                  2:00 PM - 10:00 PM (8h)
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedShift('full_day')}
                className={`p-2.5 rounded-[4px] border text-left cursor-pointer transition-all ${
                  selectedShift === 'full_day'
                    ? 'border-[#1E3A2B] bg-[#1E3A2B] text-white'
                    : 'border-[#E6DFD5] bg-white text-[#534434] hover:bg-[#F5F4EF]'
                }`}
              >
                <span className="block font-bold text-xs">Full Day</span>
                <span className={`block text-[10px] mt-0.5 ${selectedShift === 'full_day' ? 'text-[#AECEB9]' : 'text-[#8D7B68]'}`}>
                  6:00 AM - 10:00 PM (16h)
                </span>
              </button>
            </div>
          </div>

          {/* Certified Operator Option Checkbox */}
          <div className="pt-3 border-t border-[#EFECE6] bg-[#FAF9F4] p-3 rounded-[6px] border border-[#EFECE6]">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={requestOperator}
                onChange={(e) => setRequestOperator(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-[#8D7B68] text-[#1E3A2B] focus:ring-[#10B981]"
              />
              <div className="text-xs">
                <span className="font-bold text-[#1E3A2B] flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#10B981]" />
                  Request Certified KisanFleet Operator (+{currencySymbol}45/hr)
                </span>
                <span className="block text-[11px] text-[#8D7B68] mt-0.5">
                  Pre-assigned Class IV operator with certified telemetry safety compliance.
                </span>
              </div>
            </label>
          </div>

          {/* Cost Estimate Breakdown Table */}
          <div className="pt-3 border-t border-[#EFECE6] space-y-2 text-xs">
            <span className="block font-bold text-[#534434] uppercase tracking-wider text-[11px]">
              Rate Breakdown &amp; Escrow Deposit
            </span>
            <div className="space-y-1.5 font-mono text-[#534434]">
              <div className="flex justify-between">
                <span>Machine ({engineHours} hrs × {currencySymbol}{hourlyRate})</span>
                <span className="font-bold text-[#1E3A2B]">{currencySymbol}{machineCost.toLocaleString()}</span>
              </div>
              {requestOperator && (
                <div className="flex justify-between text-[#065F46]">
                  <span>Operator Service ({engineHours} hrs × {currencySymbol}{operatorRatePerHour})</span>
                  <span className="font-bold">{currencySymbol}{operatorCost.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Depot Prep &amp; Mobilization</span>
                <span>{currencySymbol}{depotPrepFee}</span>
              </div>
              <div className="flex justify-between text-[#8D7B68]">
                <span>Refundable Escrow Deposit</span>
                <span>{currencySymbol}{escrowDeposit}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#EFECE6] flex items-baseline justify-between">
              <span className="font-bold text-sm text-[#1E3A2B]">Total Estimate</span>
              <span className="font-mono text-xl font-extrabold text-[#10B981]">
                {currencySymbol}{totalCost.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <Button
              variant="accent"
              size="lg"
              fullWidth
              onClick={() => onProceedToBooking(equipment, selectedDay, selectedShift)}
            >
              Proceed to Booking Request -&gt;
            </Button>

            <Button
              variant="secondary"
              size="md"
              fullWidth
              icon={<PhoneCall className="w-4 h-4 text-[#10B981]" />}
              onClick={() => showToast(`Calling ${equipment.depotHub} Dispatch at 877-99-AGRI-FLEET...`, 'info')}
            >
              Call Depot Dispatch (877-992-4743)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
