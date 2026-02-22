import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");

    const connectionString = process.env.MONGO_URL;
    if (!connectionString) {
      throw new Error("MONGO_URL environment variable is not defined");
    }
    await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 20000,
    });

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
