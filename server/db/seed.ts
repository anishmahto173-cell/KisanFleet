import { Db } from 'mongodb';
import {
  INITIAL_EQUIPMENT_DATA,
  INITIAL_BOOKINGS,
  INITIAL_TRANSACTIONS,
  INITIAL_OPERATORS,
} from '../../src/data/mockFleet';

/**
 * Seeds MongoDB collections with initial KisanFleet data if they are empty.
 */
export async function seedDatabaseIfEmpty(db: Db): Promise<void> {
  try {
    const equipmentCol = db.collection('equipment');
    const countEquipment = await equipmentCol.countDocuments();
    if (countEquipment === 0) {
      console.log('[KisanFleet DB] Seeding equipment collection...');
      await equipmentCol.insertMany(INITIAL_EQUIPMENT_DATA);
    }

    const bookingsCol = db.collection('bookings');
    const countBookings = await bookingsCol.countDocuments();
    if (countBookings === 0) {
      console.log('[KisanFleet DB] Seeding bookings collection...');
      await bookingsCol.insertMany(INITIAL_BOOKINGS);
    }

    const transactionsCol = db.collection('transactions');
    const countTransactions = await transactionsCol.countDocuments();
    if (countTransactions === 0) {
      console.log('[KisanFleet DB] Seeding transactions collection...');
      await transactionsCol.insertMany(INITIAL_TRANSACTIONS);
    }

    const operatorsCol = db.collection('operators');
    const countOperators = await operatorsCol.countDocuments();
    if (countOperators === 0) {
      console.log('[KisanFleet DB] Seeding operators collection...');
      await operatorsCol.insertMany(INITIAL_OPERATORS);
    }
  } catch (error: any) {
    console.error('[KisanFleet DB] Seeding error (non-fatal):', error.message || error);
  }
}
