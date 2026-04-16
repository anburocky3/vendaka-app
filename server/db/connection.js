import { MongoClient } from "mongodb";
import mongoose from "mongoose";

// atlas DNS resolution is very slow, so we use Cloudflare's DNS instead
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

const connectionString = process.env.MONGODB_URI || "";

// const client = new MongoClient(connectionString);

try {
  await mongoose.connect(connectionString, {
    dbName: "vendaka",
  });
  console.log("Connected to MongoDB, Mongoose");
} catch (e) {
  console.error(e);
  console.error("Failed to connect to MongoDB", connectionString);
}

// let db = conn.db("vendaka");

// export default db;
