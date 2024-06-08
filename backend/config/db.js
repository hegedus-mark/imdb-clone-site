import mongoose from 'mongoose';
import { USERNAME, PASSWORD, CLUSTER } from "./sensitiveData.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}.mongodb.net/freestyleMERN`);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;