import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI; // your MongoDB Atlas URI

 const connectToDatabase = async () => {
  if (!uri) {
  throw new Error("MONGO_URI is not defined in environment variables!");
}

  try {
    await mongoose.connect(uri, {
      dbName: "blog", // your database name
    });
    console.log("Connected to MongoDB via Mongoose");
  } catch (error) {
    console.error(" MongoDB connection error:", error);
    throw error;
  }
};

export default  connectToDatabase;
