import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(env.MONGODB_URI);

    console.log("✓ MongoDB Atlas connected");
  } catch (error) {
    console.error("✗ MongoDB connection failed");

    throw error;
  }
}