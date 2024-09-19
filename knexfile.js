import dotenv from 'dotenv';

dotenv.config();

const connection = {
   host: process.env.DB_HOST,        // Correct
   user: process.env.DB_USER,        // Use DB_USER instead of DB_USERNAME
   password: process.env.DB_PASSWORD, // Correct
   database: process.env.DB_NAME,     // Correct
   port: process.env.DB_PORT,         // Correct
};

console.log(connection);

const commonConfig = {
   client: 'pg',
   connection,
   pool: { min: 2, max: 10 },
   migrations: {
      directory: './migrations',
   },
   seeds: {
      directory: './seeds',
   },
};

export default {
   development: commonConfig,
   production: commonConfig,
};
