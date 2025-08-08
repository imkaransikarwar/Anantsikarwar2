import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pino from "pino";
import pinoHttp from "pino-http";
import router from "./routes";

dotenv.config();

const app = express();
const logger = pino({ level: process.env.LOG_LEVEL || "info" });

app.use(express.json({ limit: "1mb" }));
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(pinoHttp({ logger }));

app.use("/api", router);

const port = Number(process.env.PORT || 5000);
app.listen(port, () => {
  logger.info({ port }, "server listening");
});