import knex from "knex";
import knexConfig from "../knex.js";

// Initialize Knex using your environment (e.g., 'development')
const environment = process.env.NODE_ENV || "development";
const db = knex(knexConfig[environment]);

export default db;
