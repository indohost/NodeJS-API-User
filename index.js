import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";

const app = express();
app.use(bodyParser.json());

dotenv.config();

const DB_PORT = process.env.DB_PORT || 5000;
const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connect success to database");

    app.listen(DB_PORT, () => {
      console.log(`Server is running on port: ${DB_PORT}`);
    });
  })
  .catch((err) => console.error(err));

  app.use("/api/user", route)