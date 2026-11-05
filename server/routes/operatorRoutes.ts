import { Router, Request, Response } from 'express';
import { getDatabase } from '../config/database';
import { INITIAL_OPERATORS } from '../../src/data/mockFleet';
import { OperatorProfile } from '../../src/types/fleet';

export const operatorRouter = Router();

let inMemoryOperators: OperatorProfile[] = [...INITIAL_OPERATORS];

// GET /api/operators - List all operators
operatorRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const db = getDatabase();
    let ops: OperatorProfile[] = [];

    if (db) {
      const col = db.collection<OperatorProfile>('operators');
      ops = await col.find({}).toArray();
    }

    if (!ops || ops.length === 0) {
      ops = inMemoryOperators;
    }

    res.json({
      success: true,
      count: ops.length,
      data: ops,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve operator roster.',
      error: error.message,
    });
  }
});

// PATCH /api/operators/:id/reassign - Reassign machinery to operator
operatorRouter.patch('/:id/reassign', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { assignedEquipment } = req.body;

    const db = getDatabase();

    if (db) {
      const col = db.collection<OperatorProfile>('operators');
      await col.updateOne({ id }, { $set: { assignedEquipment } });
    } else {
      inMemoryOperators = inMemoryOperators.map((op) =>
        op.id === id ? { ...op, assignedEquipment } : op
      );
    }

    res.json({
      success: true,
      message: `Operator ${id} reassigned to ${assignedEquipment}.`,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to reassign operator.',
      error: error.message,
    });
  }
});
