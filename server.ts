import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { checkDatabaseHealth, closeDatabaseConnection } from './server/config/database';
import { equipmentRouter } from './server/routes/equipmentRoutes';
import { bookingRouter } from './server/routes/bookingRoutes';
import { settlementRouter } from './server/routes/settlementRoutes';
import { operatorRouter } from './server/routes/operatorRoutes';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Health check endpoint (includes database health verification)
  app.get('/api/health', async (_req: Request, res: Response) => {
    const dbHealth = await checkDatabaseHealth();

    res.json({
      status: 'ok',
      service: 'KisanFleet Backend Service',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: dbHealth,
      message: 'KisanFleet Express backend server is running successfully.',
    });
  });

  // REST API Routes
  app.use('/api/equipment', equipmentRouter);
  app.use('/api/bookings', bookingRouter);
  app.use('/api/settlements', settlementRouter);
  app.use('/api/operators', operatorRouter);

  if (!isProduction) {
    // Mount Vite dev server middleware in development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets from dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`[KisanFleet] Server running on http://0.0.0.0:${PORT}`);
  });

  const handleShutdown = async (signal: string) => {
    console.log(`[KisanFleet] Received ${signal}. Shutting down gracefully...`);
    await closeDatabaseConnection();
    server.close(() => {
      console.log('[KisanFleet] HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
}

startServer().catch((err) => {
  console.error('[KisanFleet] Failed to start server:', err);
  process.exit(1);
});
