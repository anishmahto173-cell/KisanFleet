export type OperationalRole = 'farmer' | 'fleet_owner' | 'service_operator';

export type EquipmentCategory =
  | 'all'
  | 'combines'
  | 'tractors'
  | 'sprayers'
  | 'tillage'
  | 'planters';

export type OperationalStatus = 'available' | 'reserved' | 'maintenance' | 'in_transit';

export interface Equipment {
  id: string;
  name: string;
  model: string;
  category: EquipmentCategory;
  categoryLabel: string;
  status: OperationalStatus;
  statusLabel: string;
  hourlyRateUsd: number;
  hourlyRateInr: number;
  dailyRateUsd: number;
  dailyRateInr: number;
  hp: number;
  fuelCapacityGal: number;
  fuelLevelPct: number;
  capacitySpec: string; // e.g. "400 bu tank" or "1,200 gal" or "35 ft Draper"
  guidanceSpec: string; // e.g. "AutoTrac Ready"
  hitchClass: string;
  driveType: string; // e.g. "Terra Trac", "4WD MFWD", "Tracks"
  depotHub: string;
  depotLocation: string;
  depotDistance: string;
  licensePlate: string;
  engineHours: number;
  image: string;
  operatorRequired: boolean;
  operatorClass: string;
  hydraulicPressure: string;
  lastServiceDate: string;
  inspector: string;
  description: string;
  matchedInFilter?: boolean;
}

export interface BookingOrder {
  id: string;
  equipmentId: string;
  equipmentName: string;
  equipmentModel: string;
  equipmentImage: string;
  status: 'pending' | 'confirmed' | 'in_field' | 'completed' | 'canceled';
  statusLabel: string;
  startDate: string;
  endDate: string;
  shift: string;
  operatorName: string;
  operatorCert: string;
  escrowAmountUsd: number;
  escrowAmountInr: number;
  engineHoursEstimated: number;
  engineHoursLogged?: number;
  depotHub: string;
  farmLocation: string;
  createdAt: string;
  conflictWarning?: boolean;
}

export interface SettlementTransaction {
  id: string;
  receiptId: string;
  equipmentId: string;
  equipmentName: string;
  depotHub: string;
  date: string;
  engineHours: number;
  fuelSurchargeUsd: number;
  fuelSurchargeInr: number;
  operatorFeeUsd: number;
  operatorFeeInr: number;
  totalCostUsd: number;
  totalCostInr: number;
  status: 'escrow_held' | 'released' | 'processing';
  statusLabel: string;
}

export interface OperatorProfile {
  id: string;
  name: string;
  certLevel: string; // e.g. "Class IV Certified"
  phone: string;
  status: 'on_duty' | 'deployed' | 'off_duty';
  assignedEquipment: string;
  assignedEquipmentId?: string;
  experienceYears: number;
  safetyScore: number;
  shiftHoursToday: number;
  hubLocation: string;
  avatar: string;
}

export interface HubMetrics {
  activeUnits: number;
  totalUnits: number;
  fuelAvgGal: number;
  fuelReservePct: number;
  maintenancePendingHrs: number;
  networkEfficiencyPct: number;
  revenueMtdInr: number;
  revenueMtdUsd: number;
  inEscrowInr: number;
  inEscrowUsd: number;
  operatorPayoutsInr: number;
  operatorPayoutsUsd: number;
  platformReserveInr: number;
  platformReserveUsd: number;
}
