import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";

// Routes
import blogRoutes from "./routes/blogRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import blogRoutes from './routes/blogRoutes.js'
import customerRoutes from './routes/customerRoutes.js'


const app = express()

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Global input sanitization middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Developing logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res, next) => {
  res.send("Car rental API is Running...");
  next();
});

app.use("/api/cars" , carRoutes);

// API ROUTES
app.use("/api/blogs", blogRoutes);
app.use("/api/customers", customerRoutes);

// Unhandled Routes Handling Middleware
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find this ${req.originalUrl} on this server.`, 404));
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

export default app;
