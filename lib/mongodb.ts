import { MongoClient, type Db } from "mongodb";
import * as dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

declare global {
  var __studentPortalMongoClient: MongoClient | undefined;
}

const mongoUri = process.env.MONGODB_URI;
const mongoDbName = process.env.MONGODB_DB_NAME || "student_portal";

export async function getMongoClient(): Promise<MongoClient> {
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured. Add it to .env.local.");
  }

  if (!globalThis.__studentPortalMongoClient) {
    globalThis.__studentPortalMongoClient = new MongoClient(mongoUri);
    await globalThis.__studentPortalMongoClient.connect();
  }

  return globalThis.__studentPortalMongoClient;
}

export async function getMongoDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(mongoDbName);
}

export function isMongoConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI);
}
