import config from "./config/index.js";
import db from "./config/db.js";

import app from "./app.js";

const port = config.port || 4000;

async function startServer() {
	try {
		// Test the connection with a simple query
		const result = await db.raw(
			"SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
		);
		console.log("Database connected successfully...");
		console.log("Tables in the database:", result.rows);

		// Start the server
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}`);
		});
	} catch (err) {
		console.error("Error connecting to the database:", err);
		process.exit(1); // Exit the process on failure
	}
}

startServer();