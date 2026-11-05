import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  Calendar,
  RotateCcw,
  Check,
  MapPin,
  Tractor,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { Equipment, EquipmentCategory } from '../../types/fleet';
import { EquipmentCard } from '../fleet/EquipmentCard';
import { Button } from '../common/Button';

export interface EquipmentDiscoveryScreenProps {
  equipmentList: Equipment[];
  currency: 'USD' | 'INR';
  onViewDetails: (equipment: Equipment) => void;
  onBook: (equipment: Equipment) => void;
  initialFilteredState?: boolean; // For Screen 5
}

export const EquipmentDiscoveryScreen: React.FC<EquipmentDiscoveryScreenProps> = ({
  equipmentList,
  currency,
  onViewDetails,
  onBook,
  initialFilteredState = false,
}) => {
  const [selectedCategoryPill, setSelectedCategoryPill] = useState<string>(
    initialFilteredState ? 'Fall Combine Squeeze' : 'all'
  );
  const [searchQuery, setSearchQuery] = useState(initialFilteredState ? 'Combine' : '');
  const [selectedHub, setSelectedHub] = useState('all');
  const [minHp, setMinHp] = useState<number>(initialFilteredState ? 300 : 100);
  const [selectedDriveType, setSelectedDriveType] = useState('all');
  const [onlyAvailable, setOnlyAvailable] = useState(initialFilteredState);
  const [dateRange, setDateRange] = useState('Oct 18, 2025 - Oct 25, 2025');

  // Categories definition
  const categoryPills = [
    { id: 'all', label: 'All Equipment' },
    { id: 'Fall Combine Squeeze', label: 'Fall Combine Squeeze' },
    { id: 'combines', label: 'High-Capacity Combines' },
    { id: 'tractors', label: 'Row-Crop Tractors' },
    { id: 'sprayers', label: 'High-Clearance Sprayers' },
    { id: 'tillage', label: 'Tillage & Sizing' },
    { id: 'planters', label: 'Precision Planters' },
  ];

  // Filter logic
  const filteredEquipment = useMemo(() => {
    return equipmentList.filter((item) => {
      // Category pill filter
      if (selectedCategoryPill === 'Fall Combine Squeeze') {
        // Stitch Screen 5 specific filter match
        if (
          item.id !== 'eq-jd-s780' &&
          item.id !== 'eq-case-340' &&
          item.id !== 'eq-gp-3000' &&
          item.id !== 'eq-hagie-sts12'
        ) {
          return false;
        }
      } else if (selectedCategoryPill !== 'all' && item.category !== selectedCategoryPill) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesModel = item.model.toLowerCase().includes(query);
        const matchesCat = item.categoryLabel.toLowerCase().includes(query);
        const matchesHub = item.depotHub.toLowerCase().includes(query);
        if (!matchesName && !matchesModel && !matchesCat && !matchesHub) {
          return false;
        }
      }

      // Horsepower
      if (item.hp < minHp) {
        return false;
      }

      // Availability
      if (onlyAvailable && item.status !== 'available') {
        return false;
      }

      // Hub
      if (selectedHub !== 'all' && item.depotHub !== selectedHub) {
        return false;
      }

      return true;
    });
  }, [equipmentList, selectedCategoryPill, searchQuery, minHp, onlyAvailable, selectedHub]);

  const handleResetFilters = () => {
    setSelectedCategoryPill('all');
    setSearchQuery('');
    setSelectedHub('all');
    setMinHp(100);
    setSelectedDriveType('all');
    setOnlyAvailable(false);
  };

  const isFilteredActive =
    selectedCategoryPill !== 'all' ||
    searchQuery !== '' ||
    minHp > 100 ||
    onlyAvailable ||
    selectedHub !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner Matching Stitch Screen 2 & 5 */}
      <div className="bg-[#1E3A2B] text-white rounded-[12px] p-6 sm:p-8 border border-[#072417] relative overflow-hidden shadow-xs">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-[#10B981] text-[#072417] text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
            Regional Co-op Fleet Network
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Available Farm Machinery
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#AECEB9] leading-relaxed">
            Autonomous, shared and managed field units across regional agricultural hubs. Verified maintenance logs and real-time telemetry dispatch.
          </p>
        </div>

        {/* Date & Filter pill on right */}
        <div className="mt-4 sm:mt-0 sm:absolute sm:top-8 sm:right-8 flex flex-col sm:items-end gap-2 z-10">
          <div className="flex items-center gap-2 bg-[#14281E] border border-[#304D3D] px-3 py-1.5 rounded-[6px] text-xs font-mono text-[#CAEAD4]">
            <Calendar className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Deployment: {dateRange}</span>
          </div>

          {/* Screen 5 Exact Banner Indicator: "4 Machines Matched" */}
          {selectedCategoryPill === 'Fall Combine Squeeze' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-[#10B981] text-[#072417] text-xs font-bold font-mono shadow-xs">
              <Check className="w-3.5 h-3.5" /> 4 Machines Matched
            </span>
          )}
        </div>
      </div>

      {/* Seasonal Category Pills Strip */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2">
          {categoryPills.map((pill) => (
            <button
              key={pill.id}
              onClick={() => setSelectedCategoryPill(pill.id)}
              className={`shrink-0 px-3.5 py-2 rounded-[6px] text-xs font-semibold transition-all border cursor-pointer ${
                selectedCategoryPill === pill.id
                  ? 'bg-[#1E3A2B] text-white border-[#1E3A2B] shadow-xs'
                  : 'bg-white text-[#534434] border-[#E6DFD5] hover:bg-[#F5F4EF]'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Reset button if filtered */}
        {isFilteredActive && (
          <button
            onClick={handleResetFilters}
            className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-[#8D7B68] hover:text-[#1E3A2B] px-3 py-1.5 rounded-[4px] border border-[#E3E3DE] bg-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Filters
          </button>
        )}
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Filter Sidebar (lg:col-span-3) */}
        <div className="lg:col-span-3 bg-white border border-[#EFECE6] rounded-[8px] p-5 space-y-5 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-[#EFECE6]">
            <h3 className="font-bold text-sm text-[#1E3A2B] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#10B981]" />
              Equipment Attributes
            </h3>
            <span className="text-[11px] font-mono font-bold text-[#8D7B68]">
              {filteredEquipment.length} units
            </span>
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#534434] mb-1.5">
              Quick Search
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-[#8D7B68] absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Model, implement, VIN..."
                className="w-full h-10 pl-9 pr-3 bg-[#FAF9F4] border border-[#E6DFD5] rounded-[4px] text-xs text-[#1B1C19] placeholder-[#8D7B68] focus:border-[#1E3A2B] focus:outline-none"
              />
            </div>
          </div>

          {/* Minimum Horsepower Slider */}
          <div>
            <div className="flex justify-between text-xs font-bold text-[#534434] mb-1.5">
              <span>Min. Horsepower:</span>
              <span className="font-mono text-[#1E3A2B]">{minHp} HP</span>
            </div>
            <input
              type="range"
              min="100"
              max="650"
              step="20"
              value={minHp}
              onChange={(e) => setMinHp(Number(e.target.value))}
              className="w-full accent-[#1E3A2B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8D7B68] mt-1">
              <span>100 HP</span>
              <span>400 HP</span>
              <span>650 HP</span>
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="pt-2 border-t border-[#EFECE6]">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs font-bold text-[#534434]">Available Now Only</span>
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="h-4 w-4 rounded border-[#8D7B68] text-[#1E3A2B] focus:ring-[#10B981]"
              />
            </label>
          </div>

          {/* Regional Hub Filter */}
          <div className="pt-2 border-t border-[#EFECE6]">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#534434] mb-1.5">
              Depot Hub Location
            </label>
            <select
              value={selectedHub}
              onChange={(e) => setSelectedHub(e.target.value)}
              className="w-full h-10 px-3 bg-[#FAF9F4] border border-[#E6DFD5] rounded-[4px] text-xs text-[#1B1C19] focus:border-[#1E3A2B] focus:outline-none"
            >
              <option value="all">All Regional Depots (4)</option>
              <option value="Shenandoah Co-op Hub">Shenandoah Co-op Hub</option>
              <option value="Cedar Creek Farm Depot">Cedar Creek Farm Depot</option>
              <option value="Midwest Central Hub">Midwest Central Hub</option>
              <option value="Northwest Agro Hub">Northwest Agro Hub</option>
            </select>
          </div>

          {/* Screen 5 Preset Shortcut */}
          <div className="pt-4 border-t border-[#EFECE6] bg-[#FAF9F4] p-3 rounded-[6px] border border-[#EFECE6]">
            <span className="block text-[11px] font-bold text-[#1E3A2B] mb-1">
              Stitch Screen 5 Filter Preset
            </span>
            <p className="text-[10px] text-[#8D7B68] mb-2 leading-relaxed">
              Toggle the exact 4-machine filter state from Stitch reference:
            </p>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => {
                setSelectedCategoryPill('Fall Combine Squeeze');
                setMinHp(100);
                setOnlyAvailable(false);
              }}
            >
              Load 4-Machine Match State
            </Button>
          </div>
        </div>

        {/* Right Equipment Grid (lg:col-span-9) */}
        <div className="lg:col-span-9 space-y-4">
          {/* Matched header & sorting */}
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-[8px] border border-[#EFECE6]">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-[#1E3A2B]">
                {filteredEquipment.length} Machinery Units
              </span>
              <span className="text-xs text-[#8D7B68]">ready for harvest &amp; tillage dispatch</span>
            </div>
            <div className="text-xs font-mono text-[#8D7B68]">
              Currency: <strong className="text-[#1E3A2B]">{currency}</strong>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredEquipment.length === 0 ? (
            <div className="bg-white border border-[#EFECE6] rounded-[8px] p-12 text-center">
              <Tractor className="w-12 h-12 text-[#C2C8C2] mx-auto mb-3" />
              <h3 className="font-bold text-base text-[#1E3A2B]">No machinery matched your filter</h3>
              <p className="text-xs text-[#8D7B68] mt-1 max-w-md mx-auto">
                Try widening your horsepower range, clearing search terms, or checking other depot hubs.
              </p>
              <div className="mt-4">
                <Button variant="secondary" size="sm" onClick={handleResetFilters}>
                  Clear All Filters
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEquipment.map((equipment) => (
                <EquipmentCard
                  key={equipment.id}
                  equipment={equipment}
                  currency={currency}
                  onViewDetails={onViewDetails}
                  onBook={onBook}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
