const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

console.log("Attempting to connect with:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === "true",
});

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "8080"),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "school_management",
  ssl:
    process.env.DB_SSL === "true"
      ? {
          rejectUnauthorized: false,
          ...(process.env.DB_SSL_MODE === "REQUIRED" && { mode: "REQUIRED" }),
        }
      : undefined,
});



//Created the Database with the Given requirements
const createSchoolsTable = `
  CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
  )
`;

const initializeDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Successfully connected to the database");
    await connection.query(createSchoolsTable);
    connection.release();
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

module.exports = { pool, initializeDB };