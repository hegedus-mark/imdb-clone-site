import express from "express";
import mongoose from "mongoose";
import { PASSWORD, USERNAME, CLUSTER } from "./sensitiveData";
mongoose.connect(
  `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}.mongodb.net/freestyleMERN`
);

const app = express();
const PORT = 6969;
app.use(express.json());

app.listen((PORT) => {
  console.log(`The server is running on port: ${PORT}`);
});
