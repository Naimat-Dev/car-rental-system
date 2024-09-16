import dotenv from 'dotenv'

dotenv.config()

// const connection = {
//    host: process.env.DATABASE_HOST,
//    user: process.env.DATABASE_USERNAME,
//    password: process.env.DATABASE_PASSWORD,
//    database: process.env.DATABASE_NAME,
//    port: process.env.DATABASE_PORT,
//    ssl: {
//       rejectUnauthorized: false, // Use only if DigitalOcean database requires this
//    },
// }

const connection = {
   host: process.env.DB_HOST,
   user: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   port: process.env.DB_PORT,
}

console.log(connection)

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
}

export default {
   development: commonConfig,
   production: commonConfig,
}
