import express from "express";
const app = express();

import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRouter from "./routes/bookRoute.js";
import cors from "cors";

dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/books", bookRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connection successful!");
  })
  .catch(() => {
    console.log("Something went wrong in DB!");
  });

const port = 5050 || process.env.PORT;

app.listen(port, () => {
  console.log("Server is live");
});
