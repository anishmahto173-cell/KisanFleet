import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  ShieldCheck,
  UserCheck,
  MapPin,
  CheckCircle2,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import { Equipment, BookingOrder } from '../../types/fleet';
import { Button } from '../common/Button';
import { StatusBadge } from '../common/StatusBadge';

export interface BookingModalProps {
  equipment: Equipment | null;
  currency: 'USD' | 'INR';
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (newBooking: BookingOrder) => void;
  initialDate?: number;
  initialShift?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  equipment,
  currency,
  isOpen,
  onClose,
  onConfirmBooking,
  initialDate = 18,
  initialShift = 'morning',
}) => {
  if (!isOpen || !equipment) return null;

  const [date, setDate] = useState<number>(initialDate);
  const [shift, setShift] = useState<string>(initialShift);
  const [farmLocation, setFarmLocation] = useState('East Meadow, Parcel 7');
  const [includeOperator, setIncludeOperator] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const hours = shift === 'full_day' ? 16 : 8;
  const hourlyRate = currency === 'USD' ? equipment.hourlyRateUsd : equipment.hourlyRateInr;
  const operatorFee = includeOperator ? hours * (currency === 'USD' ? 45 : 45) : 0;
  const mobilizationFee = currency === 'USD' ? 120 : 120;
  const escrowHold = currency === 'USD' ? 350 : 350;
  const totalCost = hours * hourlyRate + operatorFee + mobilizationFee + escrowHold;

  const currencySymbol = currency === 'USD' ? '$' : '₹';

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmed(true);

      const newBooking: BookingOrder = {
        id: `BK-2025-${Math.floor(100 + Math.random() * 900)}`,
        equipmentId: equipment.id,
        equipmentName: equipment.name,
        equipmentModel: equipment.model,
        equipmentImage: equipment.image,
        status: 'confirmed',
        statusLabel: 'CONFIRMED & OPERATOR ASSIGNED',
        startDate: `Oct ${date}, 2025`,
        endDate: `Oct ${date + 2}, 2025`,
        shift:
          shift === 'morning'
            ? 'Morning Shift (06:00 - 14:00)'
            : shift === 'afternoon'
            ? 'Afternoon Shift (14:00 - 22:00)'
            : 'Full Day Intensive (06:00 - 22:00)',
        operatorName: includeOperator ? 'Marcus Vance' : 'Self-Driven Operator',
        operatorCert: includeOperator ? 'Operator Class IV Certified' : 'Farmer Standard Class II',
        escrowAmountUsd: currency === 'USD' ? totalCost : Math.round(totalCost * 82),
        escrowAmountInr: currency === 'INR' ? totalCost : Math.round(totalCost * 82),
        engineHoursEstimated: hours,
        engineHoursLogged: 0,
        depotHub: equipment.depotHub,
        farmLocation: farmLocation,
        createdAt: 'Oct 17, 2025',
      };

      setTimeout(() => {
        onConfirmBooking(newBooking);
        setConfirmed(false);
        onClose();
      }, 1000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#072417]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-[#EFECE6] rounded-[10px] max-w-xl w-full p-6 space-y-4 shadow-2xl relative my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EFECE6]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[4px] bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#065F46]">
              <Calendar className="w-4 h-4 text-[#10B981]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1E3A2B] leading-tight">
                Schedule Equipment Dispatch
              </h3>
              <span className="text-[11px] text-[#8D7B68]">KisanFleet Automated Escrow Protocol</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#8D7B68] hover:text-[#1E3A2B] rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmed ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#10B981] mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-extrabold text-[#1E3A2B]">Dispatch Order Confirmed!</h4>
            <p className="text-xs text-[#534434] max-w-sm mx-auto">
              Your reservation has been added to <strong>My Bookings</strong>. Telemetry pre-dispatch check initiated with {equipment.depotHub}.
            </p>
          </div>
        ) : (
          <>
            {/* Equipment Snapshot Card */}
            <div className="p-3 bg-[#FAF9F4] border border-[#EFECE6] rounded-[6px] flex items-center gap-3">
              <img
                src={equipment.image}
                alt={equipment.name}
                className="w-16 h-14 object-cover rounded-[4px] border border-[#EFECE6] shrink-0"
              />
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-[#8D7B68] uppercase block">
                  {equipment.licensePlate} • {equipment.categoryLabel}
                </span>
                <h4 className="font-bold text-sm text-[#1E3A2B]">{equipment.name}</h4>
                <div className="flex items-center gap-2 text-xs font-mono text-[#534434]">
                  <span>{equipment.hp} HP</span>
                  <span>•</span>
                  <span>{equipment.depotHub}</span>
                </div>
              </div>
            </div>

            {/* Date & Shift Selectors */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-[#534434] uppercase tracking-wider text-[11px] mb-1">
                  Deployment Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#8D7B68] absolute left-2.5 top-3" />
                  <select
                    value={date}
                    onChange={(e) => setDate(Number(e.target.value))}
                    className="w-full h-10 pl-8 pr-3 bg-white border border-[#E6DFD5] rounded-[4px] font-mono font-semibold text-[#1B1C19] focus:outline-none focus:border-[#1E3A2B]"
                  >
                    <option value={18}>Oct 18, 2025 (Tomorrow)</option>
                    <option value={19}>Oct 19, 2025</option>
                    <option value={20}>Oct 20, 2025</option>
                    <option value={21}>Oct 21, 2025</option>
                    <option value={24}>Oct 24, 2025</option>
                    <option value={25}>Oct 25, 2025</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#534434] uppercase tracking-wider text-[11px] mb-1">
                  Shift Duration
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-[#8D7B68] absolute left-2.5 top-3" />
                  <select
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                    className="w-full h-10 pl-8 pr-3 bg-white border border-[#E6DFD5] rounded-[4px] font-semibold text-[#1B1C19] focus:outline-none focus:border-[#1E3A2B]"
                  >
                    <option value="morning">Morning Shift (8 hrs)</option>
                    <option value="afternoon">Afternoon Shift (8 hrs)</option>
                    <option value="full_day">Full Day Shift (16 hrs)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Field Location Input */}
            <div>
              <label className="block font-bold text-[#534434] uppercase tracking-wider text-[11px] mb-1">
                Farm Field Delivery Destination
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#8D7B68] absolute left-2.5 top-3" />
                <input
                  type="text"
                  value={farmLocation}
                  onChange={(e) => setFarmLocation(e.target.value)}
                  placeholder="Farm name, field parcel..."
                  className="w-full h-10 pl-8 pr-3 bg-white border border-[#E6DFD5] rounded-[4px] text-xs text-[#1B1C19] focus:outline-none focus:border-[#1E3A2B]"
                />
              </div>
            </div>

            {/* Operator Checkbox */}
            <div className="p-3 bg-[#FAF9F4] border border-[#EFECE6] rounded-[6px]">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeOperator}
                  onChange={(e) => setIncludeOperator(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-[#8D7B68] text-[#1E3A2B] focus:ring-[#10B981]"
                />
                <div className="text-xs">
                  <span className="font-bold text-[#1E3A2B] block">
                    Assign Certified KisanFleet Operator (+{currencySymbol}45/hr)
                  </span>
                  <span className="text-[11px] text-[#8D7B68] block mt-0.5">
                    Recommended: {equipment.operatorClass}
                  </span>
                </div>
              </label>
            </div>

            {/* Total Cost Breakdown */}
            <div className="p-3 bg-[#FAF9F4] border border-[#EFECE6] rounded-[6px] space-y-1.5 font-mono text-xs text-[#534434]">
              <div className="flex justify-between">
                <span>Machine Hours ({hours}h × {currencySymbol}{hourlyRate})</span>
                <span>{currencySymbol}{(hours * hourlyRate).toLocaleString()}</span>
              </div>
              {includeOperator && (
                <div className="flex justify-between text-[#065F46]">
                  <span>Operator Service ({hours}h × {currencySymbol}45)</span>
                  <span>{currencySymbol}{operatorFee.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Depot Mobilization Fee</span>
                <span>{currencySymbol}{mobilizationFee}</span>
              </div>
              <div className="flex justify-between text-[#8D7B68]">
                <span>Escrow Damage Deposit (Refundable)</span>
                <span>{currencySymbol}{escrowHold}</span>
              </div>
              <div className="pt-2 border-t border-[#EFECE6] flex justify-between font-bold text-sm text-[#1E3A2B]">
                <span>Total Escrow Amount</span>
                <span className="text-[#10B981] font-extrabold text-base">
                  {currencySymbol}{totalCost.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex justify-end gap-2 border-t border-[#EFECE6]">
              <Button variant="secondary" size="md" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="accent"
                size="md"
                disabled={isSubmitting}
                onClick={handleConfirm}
              >
                {isSubmitting ? 'Initiating Escrow Hold...' : 'Confirm & Hold in Escrow'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
