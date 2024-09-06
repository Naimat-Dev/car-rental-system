import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import AppError from "./utils/appError.js";
<<<<<<< HEAD
import carRoutes  from "./routes/carRoutes.js"
=======
import globalErrorHandler from "./controllers/errorController.js";

import db from "./config/db.js";

// Routes
import blogRoutes from "./routes/blogRoutes.js";

>>>>>>> 4b77325af198f7869020f2a68a210fd86499ea87
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



app.use("/cars",carRoutes);
// Developing logging
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.get("/", (req, res, next) => {
	res.send("Car rental API is Running...");
<<<<<<< HEAD
	next()
=======
	next();
>>>>>>> 4b77325af198f7869020f2a68a210fd86499ea87
});


// API ROUTES
app.use("/api/blogs", blogRoutes);
// app.post("/blog", async (req, res) => {
// 	const { title, content, author } = req.body;
// 	try {
// 		const blog = await db("blog").insert({ title, content, author });
// 		res.status(201).send(blog);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });

// app.get("/blog", async (req, res) => {
// 	try {
// 		const blogs = await db.select("*").from("blog");
// 		res.status(201).send(blogs);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });

// Unhandled Routes Handling Middleware
app.all("*", (req, res, next) => {
	next(new AppError(`Can't find this ${req.originalUrl} on this server.`, 404));
});



// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

export default app;
