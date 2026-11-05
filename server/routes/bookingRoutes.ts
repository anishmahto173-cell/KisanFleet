import { Router, Request, Response } from 'express';
import { getDatabase } from '../config/database';
import { INITIAL_BOOKINGS } from '../../src/data/mockFleet';
import { BookingOrder } from '../../src/types/fleet';

export const bookingRouter = Router();

// In-memory fallback if MongoDB is not yet configured
let inMemoryBookings: BookingOrder[] = [...INITIAL_BOOKINGS];

// GET /api/bookings - List all booking orders
bookingRouter.get('/', async (req: Request, res: Response) => {
  try {
    const db = getDatabase();
    let bookings: BookingOrder[] = [];

    if (db) {
      const col = db.collection<BookingOrder>('bookings');
      bookings = await col.find({}).sort({ createdAt: -1 }).toArray();
    }

    if (!bookings || bookings.length === 0) {
      bookings = inMemoryBookings;
    }

    const { status, search } = req.query;

    let filtered = [...bookings];

    if (status && status !== 'all') {
      filtered = filtered.filter((b) => b.status === status);
    }

    if (search && typeof search === 'string' && search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.id.toLowerCase().includes(q) ||
          b.equipmentName.toLowerCase().includes(q) ||
          b.operatorName.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bookings.',
      error: error.message,
    });
  }
});

// POST /api/bookings - Create new dispatch order
bookingRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newBooking: BookingOrder = req.body;

    if (!newBooking.equipmentName || !newBooking.startDate) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking data. Equipment name and date required.',
      });
    }

    const bookingRecord: BookingOrder = {
      ...newBooking,
      id: newBooking.id || `BK-2025-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: newBooking.status || 'confirmed',
      statusLabel: newBooking.statusLabel || 'CONFIRMED & OPERATOR ASSIGNED',
    };

    const db = getDatabase();

    if (db) {
      const col = db.collection<BookingOrder>('bookings');
      await col.insertOne(bookingRecord);
    } else {
      inMemoryBookings = [bookingRecord, ...inMemoryBookings];
    }

    res.status(201).json({
      success: true,
      message: 'Booking successfully confirmed and logged.',
      data: bookingRecord,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create booking.',
      error: error.message,
    });
  }
});

// PATCH /api/bookings/:id/status - Update booking status
bookingRouter.patch('/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, statusLabel } = req.body;

    const db = getDatabase();

    if (db) {
      const col = db.collection<BookingOrder>('bookings');
      await col.updateOne({ id }, { $set: { status, statusLabel } });
    } else {
      inMemoryBookings = inMemoryBookings.map((b) =>
        b.id === id ? { ...b, status, statusLabel: statusLabel || status } : b
      );
    }

    res.json({
      success: true,
      message: `Booking ${id} status updated to ${status}.`,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to update booking status.',
      error: error.message,
    });
  }
});
