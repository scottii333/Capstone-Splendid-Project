// index.js

import express from "express";
import pool from "./config/pgDb.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes for the Email OTP
app.use("/OTP-Sender", authRoutes);

// Test Route to Check Database Connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Database connected!", time: result.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Database connection failed!", error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
