import React from 'react';
import { Tractor, PhoneCall, ShieldCheck, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#14281E] text-[#CAEAD4] border-t border-[#304D3D] mt-20 pt-12 pb-10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#304D3D]/60">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-[4px] bg-[#10B981] flex items-center justify-center text-[#072417]">
                <Tractor className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                Kisan<span className="text-[#10B981]">Fleet</span>
              </span>
            </div>
            <p className="text-[#85A490] text-xs leading-relaxed">
              Decentralized agricultural machinery networks, live telemetry monitoring, and community fleet optimization across regional agricultural hubs.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#4EDEA3] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              KisanFleet Operating Protocol v2.4 Active
            </div>
          </div>

          {/* Col 2: Depot Operations */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Depot Operations
            </h4>
            <ul className="space-y-2 text-[#AECEB9]">
              <li>
                <a href="#active-catalogue" className="hover:text-white transition-colors">
                  Active Asset Catalogue
                </a>
              </li>
              <li>
                <a href="#deploy-machinery" className="hover:text-white transition-colors">
                  Deploy Machinery Fleet
                </a>
              </li>
              <li>
                <a href="#telematics" className="hover:text-white transition-colors">
                  Telematics Diagnostics
                </a>
              </li>
              <li>
                <a href="#soil-efficiency" className="hover:text-white transition-colors">
                  Soil &amp; Engined Efficiency
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Compliance & Protocols */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Compliance &amp; Protocols
            </h4>
            <ul className="space-y-2 text-[#AECEB9]">
              <li>
                <a href="#osha" className="hover:text-white transition-colors">
                  OSHA Machinery Protocol
                </a>
              </li>
              <li>
                <a href="#transit-corridor" className="hover:text-white transition-colors">
                  Transit Corridor Regulations
                </a>
              </li>
              <li>
                <a href="#operator-skill" className="hover:text-white transition-colors">
                  Operator Skill Verification
                </a>
              </li>
              <li>
                <a href="#engine-hour" className="hover:text-white transition-colors">
                  Engine Hour Escrow Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Dispatch Hotline */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#10B981]" />
              Fleet Dispatch Hotline
            </h4>
            <div className="bg-[#072417] p-3 rounded-[6px] border border-[#304D3D]">
              <span className="block font-mono text-sm font-bold text-[#10B981]">
                877-99-AGRI-FLEET
              </span>
              <span className="text-[11px] text-[#85A490] mt-1 block">
                Dispatches managed across 14 regional service depots. 24/7 Field Mechanic mobilization ready.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[#85A490] text-[11px] gap-3">
          <p>© 2026 KisanFleet Operating System. Agricultural Fleet Telemetry &amp; Optimization.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Shield</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Depot Service Agreement</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Telemetry SLA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
