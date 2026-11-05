import React, { useState } from 'react';
import {
  Tractor,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  Lock,
  User,
  Mail,
  Zap,
} from 'lucide-react';
import { OperationalRole } from '../../types/fleet';
import { Button } from '../common/Button';

export interface WelcomeSignInScreenProps {
  onSuccessLogin: (role: OperationalRole, name: string) => void;
  activeRole: OperationalRole;
  onRoleChange: (role: OperationalRole) => void;
}

export const WelcomeSignInScreen: React.FC<WelcomeSignInScreenProps> = ({
  onSuccessLogin,
  activeRole,
  onRoleChange,
}) => {
  const [fullName, setFullName] = useState('Marcus Vance');
  const [emailOrPhone, setEmailOrPhone] = useState('marcus.vance@agromail.io');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedHub, setSelectedHub] = useState('Shenandoah Co-op Hub');
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // Demo State Simulation
  const [demoState, setDemoState] = useState<'normal' | 'loading' | 'error' | 'success'>('normal');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setDemoState('error');
      setErrorMessage('You must agree to safety and dispatch terms to proceed.');
      return;
    }

    setDemoState('loading');
    setTimeout(() => {
      setDemoState('success');
      setTimeout(() => {
        onSuccessLogin(activeRole, fullName || 'Marcus Vance');
      }, 700);
    }, 900);
  };

  const handleTriggerDemo = (state: 'normal' | 'loading' | 'error' | 'success') => {
    setDemoState(state);
    if (state === 'error') {
      setErrorMessage('Simulation Error: Operator certificate #OP-402 validation expired. Please re-verify.');
    } else if (state === 'success') {
      setTimeout(() => {
        onSuccessLogin(activeRole, fullName || 'Marcus Vance');
      }, 800);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-[#FAF9F4] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl bg-white border border-[#EFECE6] rounded-[12px] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Hero Column */}
        <div className="lg:col-span-5 bg-[#072417] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Agronomic contour lines in background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-[6px] bg-[#10B981] flex items-center justify-center text-[#072417]">
                <Tractor className="w-5 h-5 text-[#072417]" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Kisan<span className="text-[#10B981]">Fleet</span>
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#1E3A2B] text-[#10B981] text-[10px] font-mono font-bold uppercase tracking-wider mb-4 border border-[#304D3D]">
              <Zap className="w-3 h-3 text-[#10B981]" />
              Decentralized Agri-Logistics
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
              Find the right equipment for your farm. Shared machinery, maximized utilization, local operator support.
            </h1>

            <p className="mt-3 text-xs sm:text-sm text-[#AECEB9] leading-relaxed">
              Equip regional co-op fleets to deploy high-tonnage combines, precision seeders, and high-clearance sprayers with automated telemetry escrow.
            </p>

            {/* Featured Implement Card Thumbnail */}
            <div className="mt-8 bg-[#14281E] border border-[#304D3D] rounded-[8px] p-3.5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                  Deere 9RX 640 &amp; Horvick Drill
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[4px] bg-[#ECFDF5] text-[#065F46] text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                  Active Dispatch
                </span>
              </div>
              <img
                src="/images/equipment/deere_9rx_drill.jpg"
                alt="Deere 9RX 640 &amp; Horvick Drill"
                className="w-full h-36 object-cover rounded-[4px] border border-[#304D3D]"
              />
              <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-[#CAEAD4]">
                <span>Depot: Shenandoah Hub #4</span>
                <span className="text-[#10B981] font-bold">Speed: 4.8 mph</span>
              </div>
            </div>
          </div>

          {/* Value Metric Stats Row */}
          <div className="mt-8 pt-6 border-t border-[#304D3D] grid grid-cols-3 gap-2 text-center">
            <div>
              <span className="block font-mono font-extrabold text-xl text-white">420+</span>
              <span className="text-[10px] text-[#85A490] uppercase font-bold tracking-wider">
                Shared Implements
              </span>
            </div>
            <div>
              <span className="block font-mono font-extrabold text-xl text-[#10B981]">98%</span>
              <span className="text-[10px] text-[#85A490] uppercase font-bold tracking-wider">
                On-Time Deploy
              </span>
            </div>
            <div>
              <span className="block font-mono font-extrabold text-xl text-white">Zero</span>
              <span className="text-[10px] text-[#85A490] uppercase font-bold tracking-wider">
                Idle Waste
              </span>
            </div>
          </div>
        </div>

        {/* Right Authentication Column */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-[#FAF9F4]">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#EFECE6] mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-[#1E3A2B]">Get Started with KisanFleet</h2>
                <p className="text-xs text-[#8D7B68] mt-0.5">
                  Sign in to coordinate machine allocations or list machinery.
                </p>
              </div>
              <span className="text-xs text-[#10B981] font-bold bg-[#ECFDF5] px-2.5 py-1 rounded-[4px] border border-[#A7F3D0]">
                Sign In | Create Account
              </span>
            </div>

            {/* Role Selection 3-Card Selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#534434] mb-2.5">
                Select Your Operational Role
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Farmer */}
                <button
                  type="button"
                  onClick={() => onRoleChange('farmer')}
                  className={`p-3 rounded-[6px] border text-left transition-all cursor-pointer ${
                    activeRole === 'farmer'
                      ? 'border-[#1E3A2B] bg-[#1E3A2B] text-white shadow-xs'
                      : 'border-[#E6DFD5] bg-white text-[#1B1C19] hover:border-[#8D7B68]'
                  }`}
                >
                  <span
                    className={`block font-bold text-xs ${
                      activeRole === 'farmer' ? 'text-white' : 'text-[#1E3A2B]'
                    }`}
                  >
                    Farmer / Renter
                  </span>
                  <span
                    className={`block text-[11px] mt-1 leading-snug ${
                      activeRole === 'farmer' ? 'text-[#AECEB9]' : 'text-[#8D7B68]'
                    }`}
                  >
                    Cultivating, spraying, or harvest operations.
                  </span>
                </button>

                {/* Fleet Owner */}
                <button
                  type="button"
                  onClick={() => onRoleChange('fleet_owner')}
                  className={`p-3 rounded-[6px] border text-left transition-all cursor-pointer ${
                    activeRole === 'fleet_owner'
                      ? 'border-[#1E3A2B] bg-[#1E3A2B] text-white shadow-xs'
                      : 'border-[#E6DFD5] bg-white text-[#1B1C19] hover:border-[#8D7B68]'
                  }`}
                >
                  <span
                    className={`block font-bold text-xs ${
                      activeRole === 'fleet_owner' ? 'text-white' : 'text-[#1E3A2B]'
                    }`}
                  >
                    Fleet Owner
                  </span>
                  <span
                    className={`block text-[11px] mt-1 leading-snug ${
                      activeRole === 'fleet_owner' ? 'text-[#AECEB9]' : 'text-[#8D7B68]'
                    }`}
                  >
                    List machinery to earn during off-peak downtime.
                  </span>
                </button>

                {/* Service Operator */}
                <button
                  type="button"
                  onClick={() => onRoleChange('service_operator')}
                  className={`p-3 rounded-[6px] border text-left transition-all cursor-pointer ${
                    activeRole === 'service_operator'
                      ? 'border-[#1E3A2B] bg-[#1E3A2B] text-white shadow-xs'
                      : 'border-[#E6DFD5] bg-white text-[#1B1C19] hover:border-[#8D7B68]'
                  }`}
                >
                  <span
                    className={`block font-bold text-xs ${
                      activeRole === 'service_operator' ? 'text-white' : 'text-[#1E3A2B]'
                    }`}
                  >
                    Service Operator
                  </span>
                  <span
                    className={`block text-[11px] mt-1 leading-snug ${
                      activeRole === 'service_operator' ? 'text-[#AECEB9]' : 'text-[#8D7B68]'
                    }`}
                  >
                    Certified equipment &amp; machinery service operations.
                  </span>
                </button>
              </div>
            </div>

            {/* Error Banner */}
            {demoState === 'error' && (
              <div className="mb-4 p-3 rounded-[6px] bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#EF4444]" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success Banner */}
            {demoState === 'success' && (
              <div className="mb-4 p-3 rounded-[6px] bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#10B981]" />
                <span>Verification confirmed. Redirecting to KisanFleet Network...</span>
              </div>
            )}

            {/* Sign In Form */}
            <form onSubmit={handleSignIn} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-[#534434] mb-1">
                  Full Name / Operator Handle
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8D7B68] absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    required
                    className="w-full h-11 pl-9 pr-3 bg-white border border-[#E6DFD5] rounded-[4px] text-sm text-[#1B1C19] placeholder-[#8D7B68] focus:border-[#1E3A2B] focus:outline-none"
                  />
                </div>
              </div>

              {/* Email or Phone */}
              <div>
                <label className="block text-xs font-semibold text-[#534434] mb-1">
                  Email or Dispatch Phone
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8D7B68] absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="e.g. marcus.vance@agromail.io"
                    required
                    className="w-full h-11 pl-9 pr-3 bg-white border border-[#E6DFD5] rounded-[4px] text-sm text-[#1B1C19] placeholder-[#8D7B68] focus:border-[#1E3A2B] focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-[#534434] mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8D7B68] absolute left-3 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-11 pl-9 pr-10 bg-white border border-[#E6DFD5] rounded-[4px] text-sm text-[#1B1C19] font-mono focus:border-[#1E3A2B] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-[#8D7B68] hover:text-[#1E3A2B]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Operational Hub Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#534434] mb-1">
                  Assigned Regional Hub
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#8D7B68] absolute left-3 top-3.5" />
                  <select
                    value={selectedHub}
                    onChange={(e) => setSelectedHub(e.target.value)}
                    className="w-full h-11 pl-9 pr-3 bg-white border border-[#E6DFD5] rounded-[4px] text-sm text-[#1B1C19] focus:border-[#1E3A2B] focus:outline-none"
                  >
                    <option value="Shenandoah Co-op Hub">Shenandoah Co-op Hub (Sector 4)</option>
                    <option value="Cedar Creek Farm Depot">Cedar Creek Farm Depot (Main Yard)</option>
                    <option value="Midwest Central Hub">Midwest Central Hub (Transit Corridor)</option>
                    <option value="Northwest Agro Hub">Northwest Agro Hub (Pavilion 1)</option>
                  </select>
                </div>
              </div>

              {/* Safety Terms Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="safety-terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-[#8D7B68] text-[#1E3A2B] focus:ring-[#10B981]"
                />
                <label htmlFor="safety-terms" className="text-xs text-[#534434] leading-relaxed">
                  I agree to KisanFleet Machinery Terms, escrow damage policies, and field-deployment safety protocols.
                </label>
              </div>

              {/* Primary Action Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={demoState === 'loading'}
                  icon={
                    demoState === 'loading' ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <ArrowRight className="w-5 h-5" />
                    )
                  }
                  iconPosition="right"
                >
                  {demoState === 'loading'
                    ? 'Verifying Telemetry Credentials...'
                    : 'Enter KisanFleet Network'}
                </Button>
              </div>

              {/* Secondary Demo Action */}
              <Button
                type="button"
                variant="secondary"
                size="md"
                fullWidth
                onClick={() => onSuccessLogin('farmer', 'Marcus Vance (Guest)')}
              >
                Continue as Demo Guest Farmer
              </Button>
            </form>
          </div>

          {/* Demo State Triggers at Bottom */}
          <div className="mt-8 pt-4 border-t border-[#EFECE6] bg-white p-3 rounded-[6px] border">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#8D7B68] mb-2 uppercase tracking-wider">
              <span>Demo State Triggers (Simulated)</span>
              <span className="font-mono text-[#1E3A2B]">Active: {demoState.toUpperCase()}</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => handleTriggerDemo('normal')}
                className={`py-1 text-center text-xs font-semibold rounded-[4px] border ${
                  demoState === 'normal'
                    ? 'bg-[#1E3A2B] text-white border-[#1E3A2B]'
                    : 'bg-[#F4F3EE] text-[#534434] border-[#E3E3DE] hover:bg-[#EFECE6]'
                }`}
              >
                Normal
              </button>
              <button
                type="button"
                onClick={() => handleTriggerDemo('error')}
                className={`py-1 text-center text-xs font-semibold rounded-[4px] border ${
                  demoState === 'error'
                    ? 'bg-[#EF4444] text-white border-[#EF4444]'
                    : 'bg-[#F4F3EE] text-[#534434] border-[#E3E3DE] hover:bg-[#EFECE6]'
                }`}
              >
                Sim. Error
              </button>
              <button
                type="button"
                onClick={() => handleTriggerDemo('loading')}
                className={`py-1 text-center text-xs font-semibold rounded-[4px] border ${
                  demoState === 'loading'
                    ? 'bg-[#D97706] text-white border-[#D97706]'
                    : 'bg-[#F4F3EE] text-[#534434] border-[#E3E3DE] hover:bg-[#EFECE6]'
                }`}
              >
                Loading
              </button>
              <button
                type="button"
                onClick={() => handleTriggerDemo('success')}
                className={`py-1 text-center text-xs font-semibold rounded-[4px] border ${
                  demoState === 'success'
                    ? 'bg-[#10B981] text-white border-[#10B981]'
                    : 'bg-[#F4F3EE] text-[#534434] border-[#E3E3DE] hover:bg-[#EFECE6]'
                }`}
              >
                Success
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
