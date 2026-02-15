import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// basic configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// cors configurations
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// import routes 
import healthCheckRouter from "./routes/healthcheck.routes.js";
app.use("/api/v1/healthcheck/", healthCheckRouter);

import authRouter from "./routes/auth.routes.js";
app.use("/api/v1/auth/", authRouter);

// error handler
app.use(errorHandler);

export default app;
