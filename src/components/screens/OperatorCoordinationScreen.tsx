import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Phone,
  UserCheck,
  Award,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { OperatorProfile, Equipment } from '../../types/fleet';
import { KpiCard } from '../common/KpiCard';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';

export interface OperatorCoordinationScreenProps {
  operators: OperatorProfile[];
  equipmentList: Equipment[];
  currency: 'USD' | 'INR';
}

export const OperatorCoordinationScreen: React.FC<OperatorCoordinationScreenProps> = ({
  operators,
  equipmentList,
  currency,
}) => {
  const [operatorList, setOperatorList] = useState<OperatorProfile[]>(operators);
  const [standbyEngaged, setStandbyEngaged] = useState(false);
  const { showToast } = useToast();

  const currencySymbol = currency === 'USD' ? '$' : '₹';

  const handleReassignOperator = (operatorId: string, newEquipment: string) => {
    setOperatorList((prev) =>
      prev.map((op) =>
        op.id === operatorId ? { ...op, assignedEquipment: newEquipment } : op
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Subtitle Matching Stitch Screen 10 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EFECE6] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-[4px] bg-[#1E3A2B] text-[#10B981]">
              <Users className="w-3 h-3 text-[#10B981]" />
              Workforce Optimization
            </span>
            <span className="text-xs text-[#8D7B68] font-mono">Hub Code #08-NW</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1E3A2B] tracking-tight mt-1">
            Fleet Machinery &amp; Operator Coordination
          </h1>
          <p className="text-xs text-[#8D7B68] mt-1 max-w-2xl leading-relaxed">
            Assign certified operators to high-tonnage machinery, manage depot listings, and verify telemetric safety compliance across regional hubs.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => showToast('New Fleet Listing wizard initialized for cooperative dispatch.', 'info')}
        >
          + Add New Fleet Listing
        </Button>
      </div>

      {/* 4 KPI Cards Matching Stitch Screen 10 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Active Fleet Listings"
          value="04"
          subValue="listed in depot"
          trend="100% telemetry synced"
          trendPositive={true}
          icon={<Layers className="w-5 h-5 text-[#10B981]" />}
        />
        <KpiCard
          label="Revenue MTD"
          value={currency === 'USD' ? '$4,820' : '₹48,200'}
          subValue="fleet owner earnings"
          trend="+18.4% vs benchmark"
          trendPositive={true}
          icon={<Award className="w-5 h-5 text-[#D97706]" />}
        />
        <KpiCard
          label="Operators On Duty"
          value="02"
          subValue="certified Class IV"
          trend="Standby roster active"
          trendPositive={true}
          icon={<UserCheck className="w-5 h-5 text-[#10B981]" />}
        />
        <KpiCard
          label="Hub Safety Score"
          value="99.4%"
          subValue="zero OSHA violations"
          trend="Top tier rating"
          trendPositive={true}
          icon={<ShieldCheck className="w-5 h-5 text-[#1E3A2B]" />}
        />
      </div>

      {/* 12-Column Grid Matching Stitch Screen 10 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (lg:col-span-8): Machinery Assignment Rows */}
        <div className="lg:col-span-8 bg-white border border-[#EFECE6] rounded-[8px] p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#EFECE6]">
            <h3 className="font-bold text-sm text-[#1E3A2B]">Machinery &amp; Certified Operator Pairings</h3>
            <span className="text-xs text-[#8D7B68] font-mono">4 Units Monitored</span>
          </div>

          <div className="space-y-3">
            {equipmentList.slice(0, 4).map((eq, idx) => {
              const assignedOp = operatorList.find((op) =>
                op.assignedEquipment.toLowerCase().includes(eq.name.toLowerCase().split(' ')[0])
              ) || operatorList[idx % operatorList.length];

              const isUnassigned = idx === 2; // Kubota M7-172 as shown in Stitch!

              return (
                <div
                  key={eq.id}
                  className="p-4 bg-[#FAF9F4] border border-[#EFECE6] hover:border-[#1E3A2B] transition-colors rounded-[6px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <img
                      src={eq.image}
                      alt={eq.name}
                      className="w-16 h-14 object-cover rounded-[4px] border border-[#EFECE6] shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#1E3A2B]">{eq.licensePlate}</span>
                        <StatusBadge
                          status={isUnassigned ? 'available' : eq.status}
                          label={isUnassigned ? 'Unassigned / Available' : eq.statusLabel}
                          size="sm"
                        />
                      </div>
                      <h4 className="font-bold text-sm text-[#1E3A2B] leading-snug">{eq.name}</h4>
                      <p className="text-[11px] text-[#8D7B68]">{eq.depotHub}</p>
                    </div>
                  </div>

                  {/* Operator Assignment Dropdown */}
                  <div className="w-full sm:w-auto text-left sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EFECE6]">
                    <span className="text-[10px] uppercase font-bold text-[#8D7B68] block mb-1">
                      Assigned Operator
                    </span>
                    {isUnassigned ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#D97706] bg-[#FFFBEB] px-2.5 py-1 rounded border border-[#FDE68A]">
                          Requires Operator
                        </span>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleReassignOperator(operatorList[1].id, eq.name)}
                        >
                          Assign
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="text-left">
                          <span className="text-xs font-bold text-[#1E3A2B] block">{assignedOp.name}</span>
                          <span className="text-[10px] text-[#10B981] font-semibold block">{assignedOp.certLevel.split(' ')[0]} {assignedOp.certLevel.split(' ')[1]}</span>
                        </div>
                        <select
                          value={assignedOp.id}
                          onChange={(e) => {
                            const newOp = operatorList.find((o) => o.id === e.target.value);
                            if (newOp) handleReassignOperator(newOp.id, eq.name);
                          }}
                          className="bg-white border border-[#E6DFD5] text-xs font-semibold text-[#1E3A2B] px-2 py-1 rounded-[4px] focus:outline-none cursor-pointer"
                        >
                          {operatorList.map((op) => (
                            <option key={op.id} value={op.id}>
                              {op.name} ({op.certLevel.split(' ')[0]})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (lg:col-span-4): Protocols & Active Operator Roster */}
        <div className="lg:col-span-4 space-y-6">
          {/* Operator Fallback Protocol & Certification Checklist */}
          <div className="bg-white border border-[#EFECE6] rounded-[8px] p-5 space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-[#1E3A2B] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              Operator Fallback Protocol
            </h3>

            <div className="space-y-2 text-xs text-[#534434]">
              <div className="p-2.5 bg-[#FAF9F4] rounded-[4px] border border-[#EFECE6]">
                <strong className="block text-[#1E3A2B] font-bold">Class IV Specialist</strong>
                <span className="text-[11px] text-[#8D7B68]">High-throughput combines (&gt;400 HP), dynamic slope leveling &amp; chemical booms.</span>
              </div>
              <div className="p-2.5 bg-[#FAF9F4] rounded-[4px] border border-[#EFECE6]">
                <strong className="block text-[#1E3A2B] font-bold">Class III Row-Crop</strong>
                <span className="text-[11px] text-[#8D7B68]">Heavy tillage tractors, GPS ISOBUS hydraulic implements &amp; auto-guidance.</span>
              </div>
              <div className="p-2.5 bg-[#FAF9F4] rounded-[4px] border border-[#EFECE6]">
                <strong className="block text-[#1E3A2B] font-bold">Class II Planter Calibration</strong>
                <span className="text-[11px] text-[#8D7B68]">Precision vacuum meters &amp; bulk fill electric seed singulation.</span>
              </div>
            </div>

            <Button
              variant={standbyEngaged ? 'secondary' : 'outline'}
              size="sm"
              fullWidth
              onClick={() => {
                const nextState = !standbyEngaged;
                setStandbyEngaged(nextState);
                showToast(
                  nextState
                    ? 'Standby Operator Roster Engaged: 3 on-call certified drivers notified.'
                    : 'Standby operator roster disengaged.',
                  nextState ? 'success' : 'info'
                );
              }}
            >
              {standbyEngaged ? 'Standby Roster Engaged' : 'Engage Standby Roster'}
            </Button>
          </div>

          {/* Active Operator Roster */}
          <div className="bg-white border border-[#EFECE6] rounded-[8px] p-5 space-y-3 shadow-xs">
            <h3 className="font-bold text-sm text-[#1E3A2B] flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#10B981]" />
              Active Operator Roster
            </h3>

            <div className="space-y-3">
              {operatorList.map((operator) => (
                <div
                  key={operator.id}
                  className="flex items-center justify-between p-2.5 bg-[#FAF9F4] rounded-[6px] border border-[#EFECE6]"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={operator.avatar}
                      alt={operator.name}
                      className="w-9 h-9 rounded-full object-cover border border-[#10B981]"
                    />
                    <div>
                      <span className="font-bold text-xs text-[#1E3A2B] block">{operator.name}</span>
                      <span className="text-[10px] text-[#8D7B68] block">{operator.certLevel}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#065F46] bg-[#ECFDF5] px-1.5 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                      {operator.status === 'deployed' ? 'Deployed' : 'On Duty'}
                    </span>
                    <span className="text-[10px] font-mono text-[#8D7B68] block mt-0.5">
                      {operator.shiftHoursToday}h logged
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
