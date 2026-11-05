import { Router, Request, Response } from 'express';
import { getDatabase } from '../config/database';
import { INITIAL_TRANSACTIONS } from '../../src/data/mockFleet';
import { SettlementTransaction } from '../../src/types/fleet';

export const settlementRouter = Router();

let inMemoryTransactions: SettlementTransaction[] = [...INITIAL_TRANSACTIONS];

// GET /api/settlements - List all transactions
settlementRouter.get('/', async (req: Request, res: Response) => {
  try {
    const db = getDatabase();
    let txs: SettlementTransaction[] = [];

    if (db) {
      const col = db.collection<SettlementTransaction>('transactions');
      txs = await col.find({}).toArray();
    }

    if (!txs || txs.length === 0) {
      txs = inMemoryTransactions;
    }

    const { status, search } = req.query;
    let filtered = [...txs];

    if (status && status !== 'all') {
      filtered = filtered.filter((t) => t.status === status);
    }

    if (search && typeof search === 'string' && search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.id.toLowerCase().includes(q) ||
          t.receiptId.toLowerCase().includes(q) ||
          t.equipmentName.toLowerCase().includes(q)
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
      message: 'Failed to retrieve settlement records.',
      error: error.message,
    });
  }
});

// POST /api/settlements/:receiptId/release - Release escrow hold
settlementRouter.post('/:receiptId/release', async (req: Request, res: Response) => {
  try {
    const { receiptId } = req.params;
    const db = getDatabase();

    if (db) {
      const col = db.collection<SettlementTransaction>('transactions');
      await col.updateOne(
        { receiptId },
        { $set: { status: 'released', statusLabel: 'Settled & Released' } }
      );
    } else {
      inMemoryTransactions = inMemoryTransactions.map((t) =>
        t.receiptId === receiptId
          ? { ...t, status: 'released', statusLabel: 'Settled & Released' }
          : t
      );
    }

    res.json({
      success: true,
      message: `Escrow hold for receipt ${receiptId} successfully released to depot ledger.`,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to release escrow hold.',
      error: error.message,
    });
  }
});
