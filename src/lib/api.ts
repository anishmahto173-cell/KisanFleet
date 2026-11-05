import {
  Equipment,
  BookingOrder,
  SettlementTransaction,
  OperatorProfile,
} from '../types/fleet';
import {
  INITIAL_EQUIPMENT_DATA,
  INITIAL_BOOKINGS,
  INITIAL_TRANSACTIONS,
  INITIAL_OPERATORS,
} from '../data/mockFleet';

const BASE_URL = '/api';

export async function fetchEquipmentApi(): Promise<Equipment[]> {
  try {
    const res = await fetch(`${BASE_URL}/equipment`);
    if (!res.ok) throw new Error('Network response not ok');
    const json = await res.json();
    return json.data || json;
  } catch (err) {
    console.warn('[KisanFleet API] Using local fallback for equipment:', err);
    return INITIAL_EQUIPMENT_DATA;
  }
}

export async function fetchBookingsApi(): Promise<BookingOrder[]> {
  try {
    const res = await fetch(`${BASE_URL}/bookings`);
    if (!res.ok) throw new Error('Network response not ok');
    const json = await res.json();
    return json.data || json;
  } catch (err) {
    console.warn('[KisanFleet API] Using local fallback for bookings:', err);
    return INITIAL_BOOKINGS;
  }
}

export async function createBookingApi(booking: BookingOrder): Promise<BookingOrder> {
  try {
    const res = await fetch(`${BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    });
    if (!res.ok) throw new Error('Failed to create booking on backend');
    const json = await res.json();
    return json.data || booking;
  } catch (err) {
    console.warn('[KisanFleet API] Saving booking in client state:', err);
    return booking;
  }
}

export async function fetchSettlementsApi(): Promise<SettlementTransaction[]> {
  try {
    const res = await fetch(`${BASE_URL}/settlements`);
    if (!res.ok) throw new Error('Network response not ok');
    const json = await res.json();
    return json.data || json;
  } catch (err) {
    console.warn('[KisanFleet API] Using local fallback for settlements:', err);
    return INITIAL_TRANSACTIONS;
  }
}

export async function releaseEscrowApi(receiptId: string): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/settlements/${encodeURIComponent(receiptId)}/release`, {
      method: 'POST',
    });
    return res.ok;
  } catch (err) {
    console.warn('[KisanFleet API] Escrow release simulated locally:', err);
    return true;
  }
}

export async function fetchOperatorsApi(): Promise<OperatorProfile[]> {
  try {
    const res = await fetch(`${BASE_URL}/operators`);
    if (!res.ok) throw new Error('Network response not ok');
    const json = await res.json();
    return json.data || json;
  } catch (err) {
    console.warn('[KisanFleet API] Using local fallback for operators:', err);
    return INITIAL_OPERATORS;
  }
}

export async function reassignOperatorApi(id: string, assignedEquipment: string): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/operators/${encodeURIComponent(id)}/reassign`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assignedEquipment }),
    });
    return res.ok;
  } catch (err) {
    console.warn('[KisanFleet API] Operator reassignment simulated locally:', err);
    return true;
  }
}
