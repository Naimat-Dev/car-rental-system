import knex from "knex";
import knexConfig from "../knexfile.js";

// Initialize Knex using your environment (e.g., 'development')
const environment = process.env.NODE_ENV || "development";
const db = knex(knexConfig[environment]);

// Test the connection with a simple query
db.raw(
	"SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
)
	.then((result) => {
		console.log("Tables in the database:", result.rows);
		process.exit(0); // Exit the process once successful
	})
	.catch((err) => {
		console.error("Error connecting to the database:", err);
		process.exit(1); // Exit the process on failure
	});
