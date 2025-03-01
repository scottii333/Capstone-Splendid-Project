import pkg from "pg";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Destructure the required classes from the pg package
const { Pool } = pkg;

// Create a new Pool instance
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

// Function to test the database connection
const testConnection = async () => {
  try {
    // Get a new client from the pool
    const client = await pool.connect();
    console.log("✅ Connected to PostgreSQL successfully!");

    // Optional: Run a test query
    const res = await client.query("SELECT NOW()");
    console.log("📅 Current timestamp:", res.rows[0]);

    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
  }
};

testConnection();

export default pool;
