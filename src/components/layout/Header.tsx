import React from 'react';
import {
  Tractor,
  Layers,
  CalendarCheck,
  CreditCard,
  Users,
  Bell,
  MapPin,
  ChevronDown,
  LogOut,
  SlidersHorizontal,
  Compass,
} from 'lucide-react';
import { OperationalRole } from '../../types/fleet';

export interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  currency: 'USD' | 'INR';
  onCurrencyToggle: () => void;
  activeRole: OperationalRole;
  onRoleChange: (role: OperationalRole) => void;
  selectedHub: string;
  onHubChange: (hub: string) => void;
  onSignOut: () => void;
  activeScreenIndex: number;
  onSelectScreen: (index: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  currency,
  onCurrencyToggle,
  activeRole,
  onRoleChange,
  selectedHub,
  onHubChange,
  onSignOut,
  activeScreenIndex,
  onSelectScreen,
}) => {
  const hubs = [
    'Shenandoah Co-op Hub',
    'Cedar Creek Farm Depot',
    'Midwest Central Hub',
    'Northwest Agro Hub',
  ];

  const screens = [
    { id: 1, title: 'Screen 1: Welcome Sign In' },
    { id: 2, title: 'Screen 2: Equipment Discovery' },
    { id: 3, title: 'Screen 3: Cooperative Dashboard' },
    { id: 4, title: 'Screen 4: Detail & Booking (USD)' },
    { id: 5, title: 'Screen 5: Filtered Discovery' },
    { id: 6, title: 'Screen 6: Detail & Booking (INR)' },
    { id: 7, title: 'Screen 7: Farmer / Operator View' },
    { id: 8, title: 'Screen 8: Booking Management' },
    { id: 9, title: 'Screen 9: Settlement Ledger' },
    { id: 10, title: 'Screen 10: Operator Assignment' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#1E3A2B] text-white border-b border-[#072417] shadow-sm">
      {/* Stitch Reference Quick Bar */}
      <div className="bg-[#072417] px-4 py-1.5 text-xs border-b border-[#14281E] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[#AECEB9]">
          <span className="inline-flex items-center gap-1 font-mono font-bold uppercase text-[10px] tracking-wider bg-[#1E3A2B] px-2 py-0.5 rounded text-[#10B981]">
            <Compass className="w-3 h-3 text-[#10B981]" /> Stitch Spec
          </span>
          <span className="hidden sm:inline text-[#C2C8C2]">Target View:</span>
          <select
            value={activeScreenIndex}
            onChange={(e) => onSelectScreen(Number(e.target.value))}
            className="bg-[#1E3A2B] text-white font-medium text-xs px-2.5 py-1 rounded-[4px] border border-[#304D3D] focus:outline-none focus:border-[#10B981] cursor-pointer"
          >
            {screens.map((sc) => (
              <option key={sc.id} value={sc.id} className="bg-[#1E3A2B] text-white">
                {sc.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          {/* Currency Toggle */}
          <button
            onClick={onCurrencyToggle}
            className="inline-flex items-center gap-1 text-[11px] font-mono font-bold bg-[#1E3A2B] hover:bg-[#304D3D] text-[#CAEAD4] px-2 py-0.5 rounded border border-[#304D3D] transition-colors"
            title="Toggle between USD ($) and INR (₹)"
          >
            Currency: <span className="text-[#10B981] underline">{currency === 'USD' ? '$ USD' : '₹ INR'}</span>
          </button>

          {/* Role Indicator */}
          <div className="flex items-center gap-1 text-[11px] text-[#AECEB9]">
            <span className="hidden md:inline">Role:</span>
            <select
              value={activeRole}
              onChange={(e) => onRoleChange(e.target.value as OperationalRole)}
              className="bg-[#1E3A2B] text-[#CAEAD4] font-semibold text-[11px] px-2 py-0.5 rounded border border-[#304D3D] focus:outline-none cursor-pointer"
            >
              <option value="farmer">Farmer / Renter</option>
              <option value="fleet_owner">Co-op Fleet Owner</option>
              <option value="service_operator">Service Operator</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Hub Info */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onTabChange('discovery')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-[6px] bg-[#10B981] flex items-center justify-center text-[#072417] shadow-xs group-hover:bg-[#34D399] transition-colors">
                <Tractor className="w-5 h-5 text-[#072417]" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-white block leading-none">
                  Kisan<span className="text-[#10B981]">Fleet</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase text-[#85A490] font-semibold block mt-0.5">
                  Agritech Network
                </span>
              </div>
            </button>

            {/* Regional Hub Selector */}
            <div className="hidden lg:flex items-center gap-1.5 pl-4 border-l border-[#304D3D] text-xs text-[#CAEAD4]">
              <MapPin className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              <select
                value={selectedHub}
                onChange={(e) => onHubChange(e.target.value)}
                className="bg-transparent text-xs font-semibold text-[#CAEAD4] focus:outline-none cursor-pointer border-none pr-2"
              >
                {hubs.map((hub) => (
                  <option key={hub} value={hub} className="bg-[#1E3A2B] text-white">
                    {hub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Center Tabs */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => onTabChange('discovery')}
              className={`px-3 py-2 rounded-[6px] text-xs lg:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentTab === 'discovery'
                  ? 'bg-[#14281E] text-[#10B981] border border-[#304D3D]'
                  : 'text-[#CAEAD4] hover:bg-[#14281E]/60 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              Equipment Discovery
            </button>

            <button
              onClick={() => onTabChange('dashboard')}
              className={`px-3 py-2 rounded-[6px] text-xs lg:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentTab === 'dashboard'
                  ? 'bg-[#14281E] text-[#10B981] border border-[#304D3D]'
                  : 'text-[#CAEAD4] hover:bg-[#14281E]/60 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Service Dashboard
            </button>

            <button
              onClick={() => onTabChange('bookings')}
              className={`px-3 py-2 rounded-[6px] text-xs lg:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentTab === 'bookings'
                  ? 'bg-[#14281E] text-[#10B981] border border-[#304D3D]'
                  : 'text-[#CAEAD4] hover:bg-[#14281E]/60 hover:text-white'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              My Bookings
            </button>

            <button
              onClick={() => onTabChange('operators')}
              className={`px-3 py-2 rounded-[6px] text-xs lg:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentTab === 'operators'
                  ? 'bg-[#14281E] text-[#10B981] border border-[#304D3D]'
                  : 'text-[#CAEAD4] hover:bg-[#14281E]/60 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              Listings &amp; Operators
            </button>

            <button
              onClick={() => onTabChange('payments')}
              className={`px-3 py-2 rounded-[6px] text-xs lg:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentTab === 'payments'
                  ? 'bg-[#14281E] text-[#10B981] border border-[#304D3D]'
                  : 'text-[#CAEAD4] hover:bg-[#14281E]/60 hover:text-white'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              Payments
            </button>
          </nav>

          {/* Right Actions & User Profile */}
          <div className="flex items-center gap-3">
            <button
              className="p-2 text-[#CAEAD4] hover:text-white hover:bg-[#14281E] rounded-[6px] relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#10B981] rounded-full"></span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-[#304D3D]">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                alt="Marcus Vance"
                className="w-8 h-8 rounded-full border border-[#10B981] object-cover"
              />
              <div className="hidden xl:block text-left">
                <span className="text-xs font-bold text-white block leading-tight">Marcus Vance</span>
                <span className="text-[10px] text-[#85A490] block leading-tight">Operator #402</span>
              </div>
            </div>

            <button
              onClick={onSignOut}
              className="p-2 text-[#AECEB9] hover:text-[#EF4444] hover:bg-[#14281E] rounded-[6px] transition-colors"
              title="Sign Out / Switch to Screen 1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className="md:hidden flex overflow-x-auto px-4 py-2 bg-[#14281E] border-t border-[#304D3D] space-x-2 text-xs font-semibold scrollbar-none">
        <button
          onClick={() => onTabChange('discovery')}
          className={`shrink-0 px-3 py-1.5 rounded-[4px] ${
            currentTab === 'discovery' ? 'bg-[#10B981] text-[#072417]' : 'text-[#CAEAD4]'
          }`}
        >
          Discovery
        </button>
        <button
          onClick={() => onTabChange('dashboard')}
          className={`shrink-0 px-3 py-1.5 rounded-[4px] ${
            currentTab === 'dashboard' ? 'bg-[#10B981] text-[#072417]' : 'text-[#CAEAD4]'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => onTabChange('bookings')}
          className={`shrink-0 px-3 py-1.5 rounded-[4px] ${
            currentTab === 'bookings' ? 'bg-[#10B981] text-[#072417]' : 'text-[#CAEAD4]'
          }`}
        >
          Bookings
        </button>
        <button
          onClick={() => onTabChange('operators')}
          className={`shrink-0 px-3 py-1.5 rounded-[4px] ${
            currentTab === 'operators' ? 'bg-[#10B981] text-[#072417]' : 'text-[#CAEAD4]'
          }`}
        >
          Operators
        </button>
        <button
          onClick={() => onTabChange('payments')}
          className={`shrink-0 px-3 py-1.5 rounded-[4px] ${
            currentTab === 'payments' ? 'bg-[#10B981] text-[#072417]' : 'text-[#CAEAD4]'
          }`}
        >
          Payments
        </button>
      </div>
    </header>
  );
};
