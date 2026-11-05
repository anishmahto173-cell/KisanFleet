import React, { useState } from 'react';
import {
  CreditCard,
  Search,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  DollarSign,
  Download,
  Lock,
  ArrowUpRight,
} from 'lucide-react';
import { SettlementTransaction, HubMetrics } from '../../types/fleet';
import { KpiCard } from '../common/KpiCard';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';
import { releaseEscrowApi } from '../../lib/api';

export interface PaymentSettlementScreenProps {
  transactions: SettlementTransaction[];
  metrics: HubMetrics;
  currency: 'USD' | 'INR';
}

export const PaymentSettlementScreen: React.FC<PaymentSettlementScreenProps> = ({
  transactions,
  metrics,
  currency,
}) => {
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [escrowReleased, setEscrowReleased] = useState(false);
  const { showToast } = useToast();

  const currencySymbol = currency === 'USD' ? '$' : '₹';

  const subTabs = [
    { id: 'all', label: 'All Transactions' },
    { id: 'escrow_held', label: 'Escrow Holds' },
    { id: 'released', label: 'Settled Invoices' },
    { id: 'operator', label: 'Operator Dispatches' },
    { id: 'dispute', label: 'Dispute Resolution' },
  ];

  const filteredTransactions = transactions.filter((t) => {
    if (selectedTab !== 'all' && t.status !== selectedTab) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.id.toLowerCase().includes(q) ||
        t.receiptId.toLowerCase().includes(q) ||
        t.equipmentName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleReleaseEscrow = async () => {
    setEscrowReleased(true);
    await releaseEscrowApi('REC-2025-0982');
    showToast('Escrow hold of ₹25,000 for receipt #REC-2025-0982 verified and released to depot ledger.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Subtitle Matching Stitch Screen 9 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EFECE6] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-[4px] bg-[#1E3A2B] text-[#10B981]">
              <CreditCard className="w-3 h-3 text-[#10B981]" />
              Automated Escrow Protocol
            </span>
            <span className="text-xs text-[#8D7B68] font-mono">Cooperative Settlement Ledger</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1E3A2B] tracking-tight mt-1">
            Rental Charges &amp; Settlement Ledger
          </h1>
          <p className="text-xs text-[#8D7B68] mt-1 max-w-2xl leading-relaxed">
            Automated telemetry-based billing, escrow hold releases, fuel surcharges, and operator pay verification across cooperative hubs.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={<Download className="w-3.5 h-3.5" />}
          onClick={() => showToast('Settlement ledger exported: KisanFleet_Settlement_Ledger_Oct2025.csv', 'info')}
        >
          Export CSV Ledger
        </Button>
      </div>

      {/* 4 Financial KPI Cards Matching Stitch Screen 9 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Total Incurred Rentals"
          value={currency === 'USD' ? '$14,285' : '₹1,42,850'}
          subValue="gross billing MTD"
          trend="+12.4% vs last period"
          trendPositive={true}
          icon={<DollarSign className="w-5 h-5 text-[#10B981]" />}
        />
        <KpiCard
          label="In Escrow Hold"
          value={currency === 'USD' ? '$12,840' : '₹1,28,400'}
          subValue="4 active contracts"
          trend="Secured deposits"
          trendPositive={true}
          icon={<Lock className="w-5 h-5 text-[#D97706]" />}
        />
        <KpiCard
          label="Operator Payouts"
          value={currency === 'USD' ? '$1,445' : '₹14,450'}
          subValue="verified shift pay"
          trend="100% on-time"
          trendPositive={true}
          icon={<CheckCircle2 className="w-5 h-5 text-[#10B981]" />}
        />
        <KpiCard
          label="Platform Reserve"
          value={currency === 'USD' ? '$2,500' : '₹25,000'}
          subValue="damage buffer"
          trend="Zero loss claims"
          trendPositive={true}
          icon={<ShieldCheck className="w-5 h-5 text-[#1E3A2B]" />}
        />
      </div>

      {/* Sub Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`shrink-0 px-3.5 py-2 rounded-[6px] text-xs font-semibold transition-all border cursor-pointer ${
              selectedTab === tab.id
                ? 'bg-[#1E3A2B] text-white border-[#1E3A2B] shadow-xs'
                : 'bg-white text-[#534434] border-[#E6DFD5] hover:bg-[#F5F4EF]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 12-Column Layout Matching Stitch Screen 9 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (lg:col-span-8): Transactions Table */}
        <div className="lg:col-span-8 bg-white border border-[#EFECE6] rounded-[8px] p-5 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-[#EFECE6]">
            <h3 className="font-bold text-sm text-[#1E3A2B]">Cooperative Settlement Ledger &amp; Invoices</h3>
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#8D7B68] absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search invoice, receipt..."
                className="w-full h-8 pl-8 pr-3 bg-[#FAF9F4] border border-[#E6DFD5] rounded-[4px] text-xs text-[#1B1C19] placeholder-[#8D7B68] focus:border-[#1E3A2B] focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#FAF9F4] text-[#8D7B68] font-bold uppercase text-[10px] tracking-wider border-b border-[#EFECE6]">
                <tr>
                  <th className="py-2.5 px-3">Receipt / ID</th>
                  <th className="py-2.5 px-3">Machinery Unit</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Hours</th>
                  <th className="py-2.5 px-3">Fuel / Surcharge</th>
                  <th className="py-2.5 px-3">Total Amount</th>
                  <th className="py-2.5 px-3 text-right">Settlement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE6] font-mono">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#FAF9F4] transition-colors">
                    <td className="py-3 px-3">
                      <span className="font-bold text-[#1E3A2B] block">{tx.receiptId}</span>
                      <span className="text-[10px] text-[#8D7B68]">{tx.id}</span>
                    </td>
                    <td className="py-3 px-3 font-sans">
                      <span className="font-semibold text-[#1E3A2B] block line-clamp-1">{tx.equipmentName}</span>
                      <span className="text-[10px] text-[#8D7B68]">{tx.depotHub}</span>
                    </td>
                    <td className="py-3 px-3 text-[#534434]">{tx.date}</td>
                    <td className="py-3 px-3 text-[#1E3A2B] font-bold">{tx.engineHours} hrs</td>
                    <td className="py-3 px-3 text-[#534434]">
                      {currencySymbol}{currency === 'USD' ? tx.fuelSurchargeUsd : tx.fuelSurchargeInr}
                    </td>
                    <td className="py-3 px-3 font-extrabold text-[#1E3A2B]">
                      {currencySymbol}{currency === 'USD' ? tx.totalCostUsd : tx.totalCostInr.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <StatusBadge status={tx.status} label={tx.statusLabel} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (lg:col-span-4): Escrow Safeguard Panel (Matching Stitch Screen 9) */}
        <div className="lg:col-span-4 bg-white border border-[#EFECE6] rounded-[8px] p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#EFECE6]">
            <span className="text-xs font-bold text-[#1E3A2B] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              Escrow Safeguard Panel
            </span>
            <span className="text-[10px] font-mono bg-[#FFFBEB] text-[#92400E] px-2 py-0.5 rounded font-bold">
              {escrowReleased ? 'Released' : 'Active Hold'}
            </span>
          </div>

          <div className="h-28 rounded-[6px] overflow-hidden border border-[#EFECE6] bg-[#FAF9F4]">
            <img
              src="/images/equipment/case_magnum_tractor.jpg"
              alt="Case IH Magnum 340 Tractor"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-3.5 bg-[#FAF9F4] border border-[#EFECE6] rounded-[6px] space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-[#8D7B68]">Outstanding Balance:</span>
              <span className="font-bold text-[#1E3A2B]">{currencySymbol}{currency === 'USD' ? '250.00' : '25,000.00'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8D7B68]">Active Receipt:</span>
              <span className="text-[#10B981] font-bold">#REC-2025-0982</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8D7B68]">Equipment:</span>
              <span className="text-[#1E3A2B] font-sans font-semibold">Case IH Magnum 340</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8D7B68]">Depot Hub:</span>
              <span className="text-[#534434] font-sans">Cedar Creek Farm Hub</span>
            </div>
          </div>

          {/* Itemized Charges */}
          <div className="space-y-2 text-xs">
            <span className="block font-bold text-[#534434] uppercase tracking-wider text-[11px]">
              Itemized Telemetry Charges
            </span>
            <div className="space-y-1.5 font-mono text-xs text-[#534434]">
              <div className="flex justify-between">
                <span>Machine Hours (18.4 hrs × {currencySymbol}145)</span>
                <span>{currencySymbol}{currency === 'USD' ? '2,668.00' : '2,668.00'}</span>
              </div>
              <div className="flex justify-between">
                <span>Fuel Surcharge</span>
                <span>{currencySymbol}{currency === 'USD' ? '68.00' : '5,576.00'}</span>
              </div>
              <div className="flex justify-between">
                <span>Operator Allocation (Marcus Vance)</span>
                <span>{currencySymbol}{currency === 'USD' ? '210.00' : '17,220.00'}</span>
              </div>
              <div className="flex justify-between text-[#8D7B68]">
                <span>Damage Buffer Deposit</span>
                <span>{currencySymbol}{currency === 'USD' ? '250.00' : '25,000.00'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#EFECE6] flex justify-between items-baseline font-mono">
              <span className="font-bold text-sm text-[#1E3A2B]">Total Settled</span>
              <span className="text-lg font-extrabold text-[#10B981]">
                {currencySymbol}{currency === 'USD' ? '3,125.00' : '3,125.00'}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant={escrowReleased ? 'secondary' : 'accent'}
              size="md"
              fullWidth
              disabled={escrowReleased}
              onClick={handleReleaseEscrow}
            >
              {escrowReleased ? 'Escrow Hold Released' : 'Release Escrow Hold'}
            </Button>
            <p className="text-[10px] text-[#8D7B68] mt-1.5 text-center leading-relaxed">
              Releases funds from safe-holding once return diagnostic confirms zero implement damage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
