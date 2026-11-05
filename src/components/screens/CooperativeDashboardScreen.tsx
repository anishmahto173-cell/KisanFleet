import React from 'react';
import {
  Tractor,
  Activity,
  Fuel,
  Wrench,
  TrendingUp,
  MapPin,
  Clock,
  Gauge,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Radio,
  Search,
} from 'lucide-react';
import { Equipment, HubMetrics } from '../../types/fleet';
import { KpiCard } from '../common/KpiCard';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';

export interface CooperativeDashboardScreenProps {
  metrics: HubMetrics;
  currency: 'USD' | 'INR';
  equipmentList: Equipment[];
  onViewEquipment: (equipment: Equipment) => void;
  onNavigateToTab: (tab: string) => void;
}

export const CooperativeDashboardScreen: React.FC<CooperativeDashboardScreenProps> = ({
  metrics,
  currency,
  equipmentList,
  onViewEquipment,
  onNavigateToTab,
}) => {
  const currencySymbol = currency === 'USD' ? '$' : '₹';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Dashboard Sub-Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EFECE6] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-[4px] bg-[#1E3A2B] text-[#10B981]">
              <Radio className="w-3 h-3 text-[#10B981] animate-pulse" />
              Cooperative Fleet Hub
            </span>
            <span className="text-xs text-[#8D7B68] font-mono">Shenandoah Co-op Hub - Sector 4</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1E3A2B] tracking-tight mt-1">
            Service Dashboard &amp; Fleet Operations
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigateToTab('operators')}
          >
            Operator Roster
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigateToTab('discovery')}
          >
            Deploy New Unit
          </Button>
        </div>
      </div>

      {/* 4 Top KPI Cards Matching Stitch Screen 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Active Deployed Units"
          value="01"
          subValue="/ 06 in depot"
          trend="+1 deploy today"
          trendPositive={true}
          icon={<Activity className="w-5 h-5 text-[#10B981]" />}
        />
        <KpiCard
          label="Hub Fuel Level / Reserves"
          value="34.5 gal"
          subValue="avg reserve"
          trend="82% capacity"
          trendPositive={true}
          icon={<Fuel className="w-5 h-5 text-[#D97706]" />}
        />
        <KpiCard
          label="Scheduled Maintenance"
          value="9.2 hrs"
          subValue="until next service"
          trend="All systems nominal"
          trendPositive={true}
          icon={<Wrench className="w-5 h-5 text-[#8D7B68]" />}
        />
        <KpiCard
          label="Network Efficiency"
          value="+18.2%"
          subValue="utilization rate"
          trend="+4.8% vs last week"
          trendPositive={true}
          icon={<TrendingUp className="w-5 h-5 text-[#10B981]" />}
        />
      </div>

      {/* Search Available Agricultural Implements Strip */}
      <div className="bg-white border border-[#EFECE6] rounded-[8px] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-none">
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Search className="w-4 h-4 text-[#8D7B68] shrink-0" />
          <span className="text-xs font-bold text-[#534434] uppercase tracking-wider whitespace-nowrap">
            Find Available Agricultural Implements:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => onNavigateToTab('discovery')}
            className="px-2.5 py-1 text-xs font-semibold rounded-[4px] bg-[#FAF9F4] text-[#1E3A2B] hover:bg-[#EFECE6] border border-[#E6DFD5] cursor-pointer"
          >
            Combine Harvesters (2)
          </button>
          <button
            onClick={() => onNavigateToTab('discovery')}
            className="px-2.5 py-1 text-xs font-semibold rounded-[4px] bg-[#FAF9F4] text-[#1E3A2B] hover:bg-[#EFECE6] border border-[#E6DFD5] cursor-pointer"
          >
            Row-Crop Tractors (2)
          </button>
          <button
            onClick={() => onNavigateToTab('discovery')}
            className="px-2.5 py-1 text-xs font-semibold rounded-[4px] bg-[#FAF9F4] text-[#1E3A2B] hover:bg-[#EFECE6] border border-[#E6DFD5] cursor-pointer"
          >
            Boom Sprayers (1)
          </button>
          <button
            onClick={() => onNavigateToTab('discovery')}
            className="px-2.5 py-1 text-xs font-semibold rounded-[4px] bg-[#FAF9F4] text-[#1E3A2B] hover:bg-[#EFECE6] border border-[#E6DFD5] cursor-pointer"
          >
            Vertical Tillers (2)
          </button>
        </div>
      </div>

      {/* Active Equipment Deployment Live Telemetry Card (Matching Stitch Screen 3) */}
      <div className="bg-white border border-[#1E3A2B] rounded-[8px] p-5 shadow-xs relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#EFECE6] mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-[#10B981] animate-ping"></span>
            <div>
              <span className="text-[11px] font-bold text-[#10B981] uppercase tracking-wider">
                Live Active Field Deployment #DP-2025-081
              </span>
              <h3 className="text-lg font-bold text-[#1E3A2B] leading-tight">
                John Deere 8R 340 + Disc Ripper 2700
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-[#FAF9F4] border border-[#E6DFD5] px-2.5 py-1 rounded-[4px] text-[#534434]">
              GPS: 41.3852° N, 95.0341° W
            </span>
            <StatusBadge status="in_field" label="IN-FIELD ACTIVE" pulse={true} />
          </div>
        </div>

        {/* Active Deployment Card with Image & Telemetry */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-4">
          <div className="md:col-span-4 h-32 rounded-[6px] overflow-hidden border border-[#EFECE6] bg-[#FAF9F4]">
            <img
              src="/images/equipment/case_magnum_tractor.jpg"
              alt="John Deere 8R 340 + Disc Ripper 2700"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-8">
            {/* Telemetry Matrix Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-[#FAF9F4] border border-[#EFECE6] rounded-[6px] text-xs">
              <div>
                <span className="text-[10px] text-[#8D7B68] font-bold uppercase block">Field Speed</span>
                <span className="font-mono font-extrabold text-[#1E3A2B] text-base">5.4 mph</span>
                <span className="text-[10px] text-[#10B981] font-semibold block">Cruise Nominal</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8D7B68] font-bold uppercase block">Engine Load</span>
                <span className="font-mono font-extrabold text-[#1E3A2B] text-base">1,850 RPM</span>
                <span className="text-[10px] text-[#534434] block">74% Capacity</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8D7B68] font-bold uppercase block">Fuel Level</span>
                <span className="font-mono font-extrabold text-[#1E3A2B] text-base">72% Full</span>
                <div className="w-full bg-[#E3E3DE] h-1.5 rounded-full mt-1">
                  <div className="bg-[#10B981] h-1.5 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
              <div>
                <span className="text-[10px] text-[#8D7B68] font-bold uppercase block">Assigned Operator</span>
                <span className="font-bold text-[#1E3A2B] text-sm">Marcus Vance</span>
                <span className="text-[10px] text-[#10B981] font-semibold block">Class IV Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Route Breadcrumb Indicator */}
        <div className="flex flex-wrap items-center justify-between text-xs text-[#534434] pt-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#8D7B68]">Transit Corridor:</span>
            <span className="font-mono text-xs bg-[#EFECE6] px-2 py-0.5 rounded text-[#1E3A2B]">
              Depot Hub #04 -&gt; Transit Corridor B -&gt; South Field Parcel 12
            </span>
          </div>
          <button
            onClick={() => onNavigateToTab('bookings')}
            className="text-xs font-bold text-[#10B981] hover:underline flex items-center gap-1 cursor-pointer"
          >
            View Dispatch Dossier <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 2-Column Section: Recommended Equipment & Owner Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recommended Seasonal Equipment (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-white border border-[#EFECE6] rounded-[8px] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#1E3A2B]">Recommended Seasonal Equipment</h3>
            <button
              onClick={() => onNavigateToTab('discovery')}
              className="text-xs font-semibold text-[#10B981] hover:underline cursor-pointer"
            >
              Browse Full Catalog -&gt;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {equipmentList.slice(0, 2).map((eq) => (
              <div
                key={eq.id}
                className="p-3 bg-[#FAF9F4] border border-[#EFECE6] rounded-[6px] flex flex-col justify-between hover:border-[#1E3A2B] transition-colors"
              >
                <div>
                  <div className="h-24 rounded-[4px] overflow-hidden border border-[#EFECE6] mb-2 bg-white">
                    <img src={eq.image} alt={eq.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase font-bold text-[#8D7B68]">
                      {eq.categoryLabel}
                    </span>
                    <StatusBadge status={eq.status} label={eq.statusLabel} size="sm" />
                  </div>
                  <h4 className="font-bold text-xs text-[#1E3A2B] line-clamp-1">{eq.name}</h4>
                  <div className="mt-1 flex items-center gap-2 text-[11px] font-mono text-[#534434]">
                    <span>{eq.hp} HP</span>
                    <span>•</span>
                    <span className="font-bold text-[#1E3A2B]">
                      {currencySymbol}{currency === 'USD' ? eq.hourlyRateUsd : eq.hourlyRateInr}/hr
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#EFECE6] flex justify-end">
                  <button
                    onClick={() => onViewEquipment(eq)}
                    className="text-xs font-bold text-[#1E3A2B] hover:text-[#10B981] cursor-pointer"
                  >
                    Inspect Unit -&gt;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment Owner Portal Snapshot (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-white border border-[#EFECE6] rounded-[8px] p-5 space-y-4">
          <h3 className="font-bold text-sm text-[#1E3A2B]">Equipment Owner Portal Snapshot</h3>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center p-2.5 bg-[#FAF9F4] rounded-[4px] border border-[#EFECE6]">
              <span className="text-[#534434]">Active Listed Implements</span>
              <span className="font-mono font-bold text-[#1E3A2B]">04 Units</span>
            </div>
            <div className="flex justify-between items-center p-2.5 bg-[#FAF9F4] rounded-[4px] border border-[#EFECE6]">
              <span className="text-[#534434]">Pending Rental Bookings</span>
              <span className="font-mono font-bold text-[#D97706]">02 Requests</span>
            </div>
            <div className="flex justify-between items-center p-2.5 bg-[#FAF9F4] rounded-[4px] border border-[#EFECE6]">
              <span className="text-[#534434]">Escrow Accrued Payout</span>
              <span className="font-mono font-extrabold text-[#10B981]">
                {currencySymbol}{currency === 'USD' ? '8,450.00' : '6,92,900.00'}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => onNavigateToTab('payments')}
          >
            Open Escrow Settlement Ledger
          </Button>
        </div>
      </div>

      {/* Service Operator Shift Handoff & Checklist Table */}
      <div className="bg-white border border-[#EFECE6] rounded-[8px] p-5 space-y-3">
        <h3 className="font-bold text-sm text-[#1E3A2B]">
          Service Operator Shift Handoff &amp; Checklist (Pre-Flight Telematics)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF9F4] text-[#8D7B68] font-bold uppercase text-[10px] tracking-wider border-b border-[#EFECE6]">
              <tr>
                <th className="py-2.5 px-3">Item / Inspection Target</th>
                <th className="py-2.5 px-3">Standard Spec</th>
                <th className="py-2.5 px-3">Sensor Reading</th>
                <th className="py-2.5 px-3">Verification</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE6] font-mono">
              <tr>
                <td className="py-2.5 px-3 font-sans font-semibold text-[#1E3A2B]">Hydraulic Fluid Pressure</td>
                <td className="py-2.5 px-3 text-[#534434]">2,800 - 3,200 PSI</td>
                <td className="py-2.5 px-3 text-[#10B981] font-bold">3,100 PSI</td>
                <td className="py-2.5 px-3 text-[#8D7B68]">Lead Inspector Keller</td>
                <td className="py-2.5 px-3 text-right">
                  <span className="inline-flex items-center gap-1 text-[#065F46] bg-[#ECFDF5] px-2 py-0.5 rounded-[4px] text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3" /> PASSED
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-semibold text-[#1E3A2B]">Hitch Pin Safety Lock &amp; Latch</td>
                <td className="py-2.5 px-3 text-[#534434]">Cat 4 Heavy Double-Pin</td>
                <td className="py-2.5 px-3 text-[#10B981] font-bold">Engaged</td>
                <td className="py-2.5 px-3 text-[#8D7B68]">Field Tech Jenkins</td>
                <td className="py-2.5 px-3 text-right">
                  <span className="inline-flex items-center gap-1 text-[#065F46] bg-[#ECFDF5] px-2 py-0.5 rounded-[4px] text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3" /> PASSED
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-semibold text-[#1E3A2B]">Tire Operating PSI / Track Tension</td>
                <td className="py-2.5 px-3 text-[#534434]">32 - 35 PSI</td>
                <td className="py-2.5 px-3 text-[#10B981] font-bold">34.2 PSI</td>
                <td className="py-2.5 px-3 text-[#8D7B68]">Auto-Telematics Sensor</td>
                <td className="py-2.5 px-3 text-right">
                  <span className="inline-flex items-center gap-1 text-[#065F46] bg-[#ECFDF5] px-2 py-0.5 rounded-[4px] text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3" /> PASSED
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
