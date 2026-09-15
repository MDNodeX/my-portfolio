import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Fail fast at startup instead of finding out mid-request that the DB
// isn't configured correctly.
const requiredEnvVars = [
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "DB_PORT",
];
const missing = requiredEnvVars.filter((key) => !process.env[key]);
if (missing.length > 0) {
  throw new Error(`Missing required DB env vars: ${missing.join(", ")}`);
}

const mySqlDB = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Verify connectivity at startup. Logs clearly instead of crashing the
// whole process, in case the DB is briefly unreachable during a deploy.
mySqlDB
  .getConnection()
  .then((connection) => {
    console.log("✅ MySQL pool connected");
    connection.release();
  })
  .catch((error) => {
    console.error("❌ MySQL connection failed:", error.message);
  });

export { mySqlDB };
