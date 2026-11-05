import { Router, Request, Response } from 'express';
import { getDatabase } from '../config/database';
import { INITIAL_EQUIPMENT_DATA } from '../../src/data/mockFleet';
import { Equipment } from '../../src/types/fleet';

export const equipmentRouter = Router();

// GET /api/equipment - List and filter equipment
equipmentRouter.get('/', async (req: Request, res: Response) => {
  try {
    const db = getDatabase();
    let equipment: Equipment[] = [];

    if (db) {
      const col = db.collection<Equipment>('equipment');
      equipment = await col.find({}).toArray();
    }

    // Fallback if db is not connected or collection is empty
    if (!equipment || equipment.length === 0) {
      equipment = INITIAL_EQUIPMENT_DATA;
    }

    const { category, search, minHp, hub, availableOnly } = req.query;

    let filtered = [...equipment];

    if (category && category !== 'all') {
      if (category === 'Fall Combine Squeeze') {
        filtered = filtered.filter(
          (e) =>
            e.id === 'eq-jd-s780' ||
            e.id === 'eq-case-340' ||
            e.id === 'eq-gp-3000' ||
            e.id === 'eq-hagie-sts12'
        );
      } else {
        filtered = filtered.filter((e) => e.category === category);
      }
    }

    if (search && typeof search === 'string' && search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.model.toLowerCase().includes(q) ||
          e.categoryLabel.toLowerCase().includes(q) ||
          e.licensePlate.toLowerCase().includes(q)
      );
    }

    if (minHp) {
      const hp = Number(minHp);
      if (!isNaN(hp)) {
        filtered = filtered.filter((e) => e.hp >= hp);
      }
    }

    if (hub && hub !== 'all') {
      filtered = filtered.filter((e) => e.depotHub === hub);
    }

    if (availableOnly === 'true') {
      filtered = filtered.filter((e) => e.status === 'available');
    }

    res.json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve equipment records.',
      error: error.message,
    });
  }
});

// GET /api/equipment/:id - Get single equipment details
equipmentRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    let item: Equipment | null = null;

    if (db) {
      const col = db.collection<Equipment>('equipment');
      item = await col.findOne({ id });
    }

    if (!item) {
      item = INITIAL_EQUIPMENT_DATA.find((e) => e.id === id) || null;
    }

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Equipment with ID ${id} not found.`,
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching equipment item.',
      error: error.message,
    });
  }
});
