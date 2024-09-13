import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";

// Routes
import userRoutes from "./routes/user/userRoutes.js";
import cardRoutes from "./routes/user/cardRoutes.js";
import carRoutes from "./routes/car/carRoutes.js";
import customerRoutes from "./routes/customer/customerRoutes.js";
import bookingRoutes from "./routes/booking/bookingRoutes.js";
import transactionRoutes from "./routes/transaction/transactionRoutes.js";

const app = express();

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

// API ROUTES
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/customers", customerRoutes);
app.use("./api/transaction", transactionRoutes);

// Unhandled Routes Handling Middleware
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find this ${req.originalUrl} on this server.`, 404));
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

export default app;
