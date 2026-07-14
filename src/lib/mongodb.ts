import { MongoClient, type Db } from "mongodb";

const mongoUri = process.env.MONGODB_URI;
const databaseName =
  process.env.MONGODB_DB_NAME || "dinespot";

if (!mongoUri) {
  throw new Error(
    "MONGODB_URI is missing. Add it to .env.local.",
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