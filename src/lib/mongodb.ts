import { MongoClient, type Db } from "mongodb";

const mongoUri = process.env.MONGODB_URI?.trim();
const databaseName =
  process.env.MONGODB_DB_NAME?.trim() || "dinespot";

if (!mongoUri) {
  throw new Error(
    "MONGODB_URI is missing. Add it to your .env file.",
  );
}

if (
  !mongoUri.startsWith("mongodb://") &&
  !mongoUri.startsWith("mongodb+srv://")
) {
  throw new Error(
    'Invalid MONGODB_URI. It must start with "mongodb://" or "mongodb+srv://".',
  );
}

type MongoGlobal = typeof globalThis & {
  dinespotMongoClient?: MongoClient;
};

const globalForMongo = globalThis as MongoGlobal;

const mongoClient =
  globalForMongo.dinespotMongoClient ??
  new MongoClient(mongoUri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.dinespotMongoClient = mongoClient;
}

const database: Db = mongoClient.db(databaseName);

export { database, mongoClient };