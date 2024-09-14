import "dotenv/config";
import { createServer } from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import router from "./router/index.js";
import connectToDB from "./db/index.js";

const app = express();

app.use(
  cors({
    origin: process.env.X_CORS_ORIGIN,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/api/v1", router);

const httpServer = createServer(app);

connectToDB()
  .then(() => {
    httpServer.listen(process.env.X_PORT, () => {
      console.info(`Server is running on port ${process.env.X_PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database,", error);
  });
