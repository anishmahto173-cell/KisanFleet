import React, { useState, useMemo } from 'react';
import {
  CalendarCheck,
  Search,
  Calendar,
  Filter,
  FileText,
  AlertTriangle,
  Clock,
  User,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  X,
} from 'lucide-react';
import { BookingOrder } from '../../types/fleet';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';

export interface BookingManagementScreenProps {
  bookings: BookingOrder[];
  currency: 'USD' | 'INR';
  onNewBookingClick: () => void;
}

export const BookingManagementScreen: React.FC<BookingManagementScreenProps> = ({
  bookings,
  currency,
  onNewBookingClick,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('Oct 14 - Nov 01, 2025');
  const [selectedDossier, setSelectedDossier] = useState<BookingOrder | null>(null);
  const { showToast } = useToast();

  const currencySymbol = currency === 'USD' ? '$' : '₹';

  const filterTabs = [
    { id: 'all', label: 'All Orders', count: bookings.length },
    {
      id: 'pending',
      label: 'Pending Owner Review',
      count: bookings.filter((b) => b.status === 'pending').length,
    },
    {
      id: 'confirmed',
      label: 'Confirmed',
      count: bookings.filter((b) => b.status === 'confirmed').length,
    },
    {
      id: 'in_field',
      label: 'In-Field Active',
      count: bookings.filter((b) => b.status === 'in_field').length,
    },
    {
      id: 'completed',
      label: 'Completed',
      count: bookings.filter((b) => b.status === 'completed').length,
    },
  ];

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      if (selectedFilter !== 'all' && booking.status !== selectedFilter) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = booking.equipmentName.toLowerCase().includes(q);
        const matchesId = booking.id.toLowerCase().includes(q);
        const matchesOp = booking.operatorName.toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesOp) return false;
      }

      return true;
    });
  }, [bookings, selectedFilter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Subtitle Banner Matching Stitch Screen 8 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EFECE6] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-[4px] bg-[#1E3A2B] text-[#10B981]">
              <CalendarCheck className="w-3 h-3 text-[#10B981]" />
              Dispatch Protocols
            </span>
            <span className="text-xs text-[#8D7B68] font-mono">Central Hub Scheduling</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1E3A2B] tracking-tight mt-1">
            Booking Management &amp; Dispatch Orders
          </h1>
          <p className="text-xs text-[#8D7B68] mt-1 max-w-2xl leading-relaxed">
            Coordinate machinery allocations, field deployment schedules, return inspections, and escrow payment holds across regional agricultural hubs.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={onNewBookingClick}>
          + Schedule New Dispatch
        </Button>
      </div>

      {/* Filter Tabs Bar with Status Counts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`shrink-0 px-3.5 py-2 rounded-[6px] text-xs font-semibold transition-all border cursor-pointer flex items-center gap-2 ${
              selectedFilter === tab.id
                ? 'bg-[#1E3A2B] text-white border-[#1E3A2B] shadow-xs'
                : 'bg-white text-[#534434] border-[#E6DFD5] hover:bg-[#F5F4EF]'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                selectedFilter === tab.id
                  ? 'bg-[#10B981] text-[#072417] font-bold'
                  : 'bg-[#EFECE6] text-[#8D7B68]'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search Bar & Date Range Strip */}
      <div className="bg-white border border-[#EFECE6] rounded-[8px] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-none">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-[#8D7B68] absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ID, machine, operator..."
            className="w-full h-10 pl-9 pr-3 bg-[#FAF9F4] border border-[#E6DFD5] rounded-[4px] text-xs text-[#1B1C19] placeholder-[#8D7B68] focus:border-[#1E3A2B] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#534434] w-full sm:w-auto justify-end">
          <Calendar className="w-4 h-4 text-[#10B981]" />
          <span>Active Window: <strong>{dateRange}</strong></span>
        </div>
      </div>

      {/* Booking Order Cards List Matching Stitch Screen 8 */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white border border-[#EFECE6] rounded-[8px] p-12 text-center">
            <CalendarCheck className="w-10 h-10 text-[#C2C8C2] mx-auto mb-2" />
            <h3 className="font-bold text-sm text-[#1E3A2B]">No dispatch bookings found</h3>
            <p className="text-xs text-[#8D7B68] mt-1">Try switching status filters or clearing the search bar.</p>
          </div>
        ) : (
          filteredBookings.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-[#EFECE6] hover:border-[#1E3A2B] transition-all rounded-[8px] p-5 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
            >
              {/* Order Info & Image */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                <img
                  src={order.equipmentImage}
                  alt={order.equipmentName}
                  className="w-full sm:w-32 h-20 object-cover rounded-[6px] border border-[#EFECE6]"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-extrabold text-[#1E3A2B]">{order.id}</span>
                    <StatusBadge status={order.status} label={order.statusLabel} />
                  </div>
                  <h3 className="text-base font-bold text-[#1E3A2B] leading-tight">
                    {order.equipmentName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#534434]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#8D7B68]" />
                      {order.startDate} - {order.endDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono text-[#8D7B68]">
                      <Clock className="w-3.5 h-3.5" />
                      {order.shift}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#8D7B68] flex items-center gap-1 pt-0.5">
                    <User className="w-3 h-3 text-[#10B981]" />
                    <span>Assigned: <strong className="text-[#1E3A2B]">{order.operatorName}</strong> ({order.operatorCert})</span>
                  </div>
                </div>
              </div>

              {/* Escrow Deposit & Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col sm:items-end justify-between w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-[#EFECE6] gap-3">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-[#8D7B68] uppercase font-bold tracking-wider block">
                    Escrow Deposit Held
                  </span>
                  <span className="font-mono font-extrabold text-lg text-[#1E3A2B]">
                    {currencySymbol}
                    {currency === 'USD'
                      ? order.escrowAmountUsd.toLocaleString()
                      : order.escrowAmountInr.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#10B981] font-semibold block">
                    Secured by KisanFleet Contract
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDossier(order)}
                  >
                    View Dispatch Dossier
                  </Button>
                  {order.status === 'confirmed' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => showToast('Schedule Conflict Check: No regional schedule conflicts detected across cooperative hubs.', 'info')}
                    >
                      Schedule Conflict
                    </Button>
                  )}
                  {order.status === 'pending' && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => showToast('Booking request withdrawal submitted for operator and dispatcher review.', 'warning')}
                    >
                      Withdraw Request
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Dispatch Dossier Modal Dialog */}
      {selectedDossier && (
        <div className="fixed inset-0 z-50 bg-[#072417]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EFECE6] rounded-[10px] max-w-xl w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFECE6]">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#10B981] uppercase">
                  Dispatch Dossier Record
                </span>
                <h3 className="text-lg font-bold text-[#1E3A2B]">{selectedDossier.id}</h3>
              </div>
              <button
                onClick={() => setSelectedDossier(null)}
                className="p-1 text-[#8D7B68] hover:text-[#1E3A2B] rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#534434]">
              <div className="p-3 bg-[#FAF9F4] border border-[#EFECE6] rounded-[6px]">
                <span className="text-[10px] text-[#8D7B68] font-bold uppercase block">Implement Unit</span>
                <span className="font-bold text-sm text-[#1E3A2B] block">{selectedDossier.equipmentName}</span>
                <span className="text-[11px] text-[#8D7B68]">{selectedDossier.depotHub}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="p-2.5 bg-[#FAF9F4] border border-[#EFECE6] rounded-[4px]">
                  <span className="text-[10px] text-[#8D7B68] uppercase font-bold block">Scheduled Window</span>
                  <span className="font-semibold text-[#1E3A2B]">{selectedDossier.startDate} - {selectedDossier.endDate}</span>
                </div>
                <div className="p-2.5 bg-[#FAF9F4] border border-[#EFECE6] rounded-[4px]">
                  <span className="text-[10px] text-[#8D7B68] uppercase font-bold block">Assigned Operator</span>
                  <span className="font-semibold text-[#1E3A2B]">{selectedDossier.operatorName}</span>
                </div>
              </div>

              <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded-[6px] space-y-1">
                <span className="font-bold text-[#065F46] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  Telematics Escrow Guarantee
                </span>
                <p className="text-[11px] text-[#065F46] leading-relaxed">
                  Deposit of {currencySymbol}{currency === 'USD' ? selectedDossier.escrowAmountUsd : selectedDossier.escrowAmountInr} is held in secure regional escrow until post-harvest telemetry data and equipment return inspection are signed off.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-[#EFECE6]">
              <Button variant="secondary" size="sm" onClick={() => setSelectedDossier(null)}>
                Close Dossier
              </Button>
              <Button
                variant="accent"
                size="sm"
                onClick={() => {
                  showToast(`Telemetry sensor log downloaded for dispatch ${selectedDossier.id}.`, 'success');
                  setSelectedDossier(null);
                }}
              >
                Download Sensor Log (PDF)
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
