import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const uri = process.env.MONGO_URI;

async function test() {
  console.log("Connecting to MongoDB...");

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
  });

  await client.connect();
  console.log("✅ Connected to MongoDB");

  await client.close();
}

test().catch(err => {
  console.error("❌ Connection error:");
  console.error(err.message);
  process.exit(1);
});
