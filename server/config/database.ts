import { MongoClient, Db, ServerApiVersion } from 'mongodb';
import { seedDatabaseIfEmpty } from '../db/seed';

let client: MongoClient | null = null;
let db: Db | null = null;
let connectionPromise: Promise<Db | null> | null = null;

export interface DatabaseHealthStatus {
  status: 'connected' | 'disconnected' | 'not_configured';
  databaseName?: string;
  pingMs?: number;
  message: string;
}

/**
 * Connect to MongoDB using the official Node.js driver.
 * Reads MONGODB_URI and MONGODB_DATABASE from environment variables.
 * Never hardcodes or logs credentials.
 */
export async function connectToDatabase(): Promise<Db | null> {
  const uri = process.env.MONGODB_URI?.trim();
  const dbName = process.env.MONGODB_DATABASE?.trim() || 'kisanfleet';

  if (!uri) {
    return null;
  }

  if (db && client) {
    return db;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = (async () => {
    try {
      client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
        connectTimeoutMS: 5000,
        serverSelectionTimeoutMS: 5000,
      });

      await client.connect();
      db = client.db(dbName);
      console.log(`[KisanFleet DB] Connected successfully to database: ${dbName}`);
      // Seed initial collections if empty
      await seedDatabaseIfEmpty(db);
      return db;
    } catch (error: any) {
      console.error('[KisanFleet DB] Connection error:', error.message || 'Unknown database error');
      client = null;
      db = null;
      return null;
    } finally {
      connectionPromise = null;
    }
  })();

  return connectionPromise;
}

/**
 * Returns the currently active Database instance, or null if not connected.
 */
export function getDatabase(): Db | null {
  return db;
}

/**
 * Checks the database health by executing a ping command.
 * Never exposes credentials, connection URIs, or internal secrets.
 */
export async function checkDatabaseHealth(): Promise<DatabaseHealthStatus> {
  const uri = process.env.MONGODB_URI?.trim();
  const dbName = process.env.MONGODB_DATABASE?.trim() || 'kisanfleet';

  if (!uri) {
    return {
      status: 'not_configured',
      message: 'MONGODB_URI environment variable is not configured.',
    };
  }

  try {
    const activeDb = await connectToDatabase();
    if (!activeDb) {
      return {
        status: 'disconnected',
        message: 'Could not establish connection to MongoDB cluster.',
      };
    }

    const start = Date.now();
    await activeDb.command({ ping: 1 });
    const pingMs = Date.now() - start;

    return {
      status: 'connected',
      databaseName: dbName,
      pingMs,
      message: 'MongoDB Atlas connection active and responsive.',
    };
  } catch (error: any) {
    return {
      status: 'disconnected',
      message: error?.message ? `Ping failed: ${error.message}` : 'Database ping failed.',
    };
  }
}

/**
 * Gracefully close the MongoDB client connection.
 */
export async function closeDatabaseConnection(): Promise<void> {
  if (client) {
    try {
      await client.close();
      console.log('[KisanFleet DB] MongoDB connection closed.');
    } finally {
      client = null;
      db = null;
    }
  }
}
