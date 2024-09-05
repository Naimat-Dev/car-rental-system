import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import AppError from "./utils/appError.js";

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
	// next();
});

// API ROUTES
app.post("/blog", async (req, res) => {
	const { title, content, author } = req.body;
	try {
		const blog = await db("blog").insert({ title, content, author });
		res.status(201).send(blog);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Unhandled Routes Handling Middleware
app.all("*", (req, res, next) => {
	next(new AppError(`Can't find this ${req.originalUrl} on this server.`, 404));
});

// GLOBAL ERROR HANDLING MIDDLEWARE
// app.use(globalErrorHandler);

export default app;
