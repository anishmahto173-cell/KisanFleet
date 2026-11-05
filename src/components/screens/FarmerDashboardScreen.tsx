import React, { useState } from 'react';
import {
  Tractor,
  Calendar,
  Clock,
  CheckSquare,
  Square,
  CloudSun,
  AlertCircle,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Gauge,
  Fuel,
} from 'lucide-react';
import { Equipment } from '../../types/fleet';
import { Button } from '../common/Button';
import { StatusBadge } from '../common/StatusBadge';
import { useToast } from '../../context/ToastContext';

export interface FarmerDashboardScreenProps {
  currency: 'USD' | 'INR';
  onNavigateToTab: (tab: string) => void;
  onInspectEquipment: (eq: Equipment) => void;
  featuredEquipment: Equipment;
}

export const FarmerDashboardScreen: React.FC<FarmerDashboardScreenProps> = ({
  currency,
  onNavigateToTab,
  onInspectEquipment,
  featuredEquipment,
}) => {
  const { showToast } = useToast();
  const [checklist, setChecklist] = useState({
    fluids: true,
    hydraulics: true,
    pto: true,
    telemetry: false,
    tirePressure: true,
  });

  const toggleChecklist = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allPassed = Object.values(checklist).every(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EFECE6] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-[4px] bg-[#1E3A2B] text-[#10B981]">
              <Tractor className="w-3 h-3 text-[#10B981]" />
              Farmer &amp; Operator Dashboard
            </span>
            <span className="text-xs text-[#8D7B68] font-mono">Operator ID: #OP-402 (Marcus Vance)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1E3A2B] tracking-tight mt-1">
            In-Field Deployment &amp; Task Execution
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigateToTab('bookings')}
          >
            My Active Bookings
          </Button>
          <Button
            variant="accent"
            size="sm"
            onClick={() => onNavigateToTab('discovery')}
          >
            Browse Implement Catalog
          </Button>
        </div>
      </div>

      {/* Weather & Soil Conditions Strip */}
      <div className="bg-[#FAF9F4] border border-[#EFECE6] rounded-[8px] p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#065F46]">
            <CloudSun className="w-5 h-5 text-[#10B981]" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#1E3A2B] block">Field Conditions: Clear &amp; Favorable</span>
            <span className="text-[11px] text-[#8D7B68] block">Shenandoah Valley Agricultural Zone 4</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono">
          <div>
            <span className="text-[10px] text-[#8D7B68] uppercase font-bold block">Soil Moisture</span>
            <span className="font-extrabold text-[#1E3A2B]">21% (Optimal Tillage)</span>
          </div>
          <div>
            <span className="text-[10px] text-[#8D7B68] uppercase font-bold block">Ground Wind</span>
            <span className="font-extrabold text-[#1E3A2B]">8.2 mph SW</span>
          </div>
          <div>
            <span className="text-[10px] text-[#8D7B68] uppercase font-bold block">Surface Temp</span>
            <span className="font-extrabold text-[#1E3A2B]">58°F / 14°C</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (lg:col-span-7): Active Deployment & Timeline */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Implement in Field */}
          <div className="bg-white border border-[#1E3A2B] rounded-[8px] p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFECE6] mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#10B981] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
                Currently Operating In Field
              </span>
              <StatusBadge status="in_field" label="IN-FIELD ACTIVE" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start mb-4">
              <img
                src={featuredEquipment.image}
                alt={featuredEquipment.name}
                className="w-full sm:w-44 h-28 object-cover rounded-[6px] border border-[#EFECE6]"
              />
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-[#1E3A2B]">{featuredEquipment.name}</h3>
                <p className="text-xs text-[#534434]">{featuredEquipment.model}</p>
                <div className="text-[11px] font-mono text-[#8D7B68] pt-1">
                  License: <strong className="text-[#1E3A2B]">{featuredEquipment.licensePlate}</strong> | Hub: {featuredEquipment.depotHub}
                </div>
                <div className="flex items-center gap-3 pt-2 text-xs font-mono">
                  <span className="flex items-center gap-1 text-[#10B981] font-bold">
                    <Fuel className="w-3.5 h-3.5" /> 72% Fuel
                  </span>
                  <span className="flex items-center gap-1 text-[#534434]">
                    <Clock className="w-3.5 h-3.5 text-[#8D7B68]" /> 9.8 hrs left today
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#EFECE6] flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-[#8D7B68]">
                Escrow hold release scheduled upon depot return inspection.
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onInspectEquipment(featuredEquipment)}
              >
                Inspect Telematics Dossier
              </Button>
            </div>
          </div>

          {/* Today's Operational Shift Timeline */}
          <div className="bg-white border border-[#EFECE6] rounded-[8px] p-5 space-y-4">
            <h3 className="font-bold text-sm text-[#1E3A2B] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#10B981]" />
              Today's Field Deployment Timeline
            </h3>

            <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#EFECE6]">
              {/* Event 1 */}
              <div className="relative pl-8">
                <span className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-[#10B981] ring-4 ring-white"></span>
                <div className="p-3 bg-[#FAF9F4] border border-[#EFECE6] rounded-[6px]">
                  <div className="flex justify-between items-center text-xs font-bold mb-1">
                    <span className="text-[#1E3A2B]">Field Prep &amp; Corn Tillage</span>
                    <span className="font-mono text-[#065F46] bg-[#ECFDF5] px-2 py-0.5 rounded">
                      07:00 - 13:00 (In Progress)
                    </span>
                  </div>
                  <p className="text-[11px] text-[#534434]">
                    Deploying John Deere 8R + Disc Ripper on East Meadow, Parcel 7. Soil fracturing depth: 12 inches.
                  </p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative pl-8">
                <span className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-[#8D7B68] ring-4 ring-white"></span>
                <div className="p-3 bg-[#FAF9F4] border border-[#EFECE6] rounded-[6px]">
                  <div className="flex justify-between items-center text-xs font-bold mb-1">
                    <span className="text-[#1E3A2B]">Depot Return &amp; Sensor Calibration</span>
                    <span className="font-mono text-[#8D7B68]">13:30 - 14:15</span>
                  </div>
                  <p className="text-[11px] text-[#534434]">
                    Mobilization to Shenandoah Co-op Shed #4. Clean filter blower, telemetry upload, and fluid check.
                  </p>
                </div>
              </div>

              {/* Event 3 */}
              <div className="relative pl-8">
                <span className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-[#D97706] ring-4 ring-white"></span>
                <div className="p-3 bg-[#FAF9F4] border border-[#EFECE6] rounded-[6px]">
                  <div className="flex justify-between items-center text-xs font-bold mb-1">
                    <span className="text-[#1E3A2B]">High-Clearance Sprayer Shift</span>
                    <span className="font-mono text-[#D97706]">15:00 - 19:00</span>
                  </div>
                  <p className="text-[11px] text-[#534434]">
                    Hagie STS12 Sprayer late-season fungicide application on North Ridge Farm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-5): Pre-Field Safety Checklist & Quick Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Operator Pre-Field Inspection Checklist */}
          <div className="bg-white border border-[#EFECE6] rounded-[8px] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#1E3A2B] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                Pre-Field Safety Checklist
              </h3>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-[4px] uppercase ${
                  allPassed ? 'bg-[#ECFDF5] text-[#065F46]' : 'bg-[#FFFBEB] text-[#92400E]'
                }`}
              >
                {allPassed ? 'Checklist Complete' : '1 Item Pending'}
              </span>
            </div>

            <p className="text-xs text-[#8D7B68] leading-relaxed">
              Mandatory OSHA &amp; KisanFleet safety protocol checklist before operating heavy agricultural machinery.
            </p>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => toggleChecklist('fluids')}
                className="w-full flex items-center justify-between p-2.5 bg-[#FAF9F4] border border-[#EFECE6] rounded-[4px] text-xs cursor-pointer hover:bg-[#F5F4EF]"
              >
                <span className="text-[#534434] font-medium">1. Fluid levels checked (Engine oil &amp; Coolant)</span>
                {checklist.fluids ? (
                  <CheckSquare className="w-4 h-4 text-[#10B981]" />
                ) : (
                  <Square className="w-4 h-4 text-[#8D7B68]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleChecklist('hydraulics')}
                className="w-full flex items-center justify-between p-2.5 bg-[#FAF9F4] border border-[#EFECE6] rounded-[4px] text-xs cursor-pointer hover:bg-[#F5F4EF]"
              >
                <span className="text-[#534434] font-medium">2. Hydraulic hoses &amp; couplers locked</span>
                {checklist.hydraulics ? (
                  <CheckSquare className="w-4 h-4 text-[#10B981]" />
                ) : (
                  <Square className="w-4 h-4 text-[#8D7B68]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleChecklist('pto')}
                className="w-full flex items-center justify-between p-2.5 bg-[#FAF9F4] border border-[#EFECE6] rounded-[4px] text-xs cursor-pointer hover:bg-[#F5F4EF]"
              >
                <span className="text-[#534434] font-medium">3. Emergency PTO breakaway safety tested</span>
                {checklist.pto ? (
                  <CheckSquare className="w-4 h-4 text-[#10B981]" />
                ) : (
                  <Square className="w-4 h-4 text-[#8D7B68]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleChecklist('telemetry')}
                className="w-full flex items-center justify-between p-2.5 bg-[#FAF9F4] border border-[#EFECE6] rounded-[4px] text-xs cursor-pointer hover:bg-[#F5F4EF]"
              >
                <span className="text-[#534434] font-medium">4. Telemetry beacon GPS sync verified</span>
                {checklist.telemetry ? (
                  <CheckSquare className="w-4 h-4 text-[#10B981]" />
                ) : (
                  <Square className="w-4 h-4 text-[#D97706]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleChecklist('tirePressure')}
                className="w-full flex items-center justify-between p-2.5 bg-[#FAF9F4] border border-[#EFECE6] rounded-[4px] text-xs cursor-pointer hover:bg-[#F5F4EF]"
              >
                <span className="text-[#534434] font-medium">5. Field tire PSI / track tension confirmed</span>
                {checklist.tirePressure ? (
                  <CheckSquare className="w-4 h-4 text-[#10B981]" />
                ) : (
                  <Square className="w-4 h-4 text-[#8D7B68]" />
                )}
              </button>
            </div>

            <Button
              variant={allPassed ? 'accent' : 'secondary'}
              size="md"
              fullWidth
              onClick={() => {
                if (!allPassed) {
                  setChecklist({
                    fluids: true,
                    hydraulics: true,
                    pto: true,
                    telemetry: true,
                    tirePressure: true,
                  });
                }
              }}
            >
              {allPassed ? 'Safety Checklist Confirmed' : 'Complete All Verifications'}
            </Button>
          </div>

          {/* Quick Depot Emergency & Support */}
          <div className="bg-[#FAF9F4] border border-[#EFECE6] rounded-[8px] p-5 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#534434]">
              Field Mechanic Support
            </h4>
            <p className="text-xs text-[#8D7B68]">
              Encountering mechanical faults, hydraulic leaks, or implement detachment issues? Regional dispatch sends a mobile technician within 35 minutes.
            </p>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => showToast('Dispatched mobile mechanic unit request to Shenandoah Co-op Hub (ETA: 35 min).', 'success')}
            >
              Request Field Service Unit (Hotline: 877-99-AGRI-FLEET)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
