import mongoose from "mongoose";
import { config } from "./config.js";

const connectDB = async () => {

  if (mongoose.connection.readyState === 1) {
    return;
  }


  try {
    await mongoose.connect(config.mongodb.uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;