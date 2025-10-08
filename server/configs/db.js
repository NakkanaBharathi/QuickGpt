import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    mongoose.connection.on("connected", () => console.log("MongoDB connected"));

    await mongoose.connect(`${process.env.MONGODB_URI}/quickgpt`);
    isConnected = true;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDB;
