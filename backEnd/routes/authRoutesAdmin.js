import express from "express";
import pool from "../config/pgDb.js";
import { sendEmailOTP } from "../config/Otp.js";

const router = express.Router();

// In-memory OTP store: { [email]: otp }
const otpStore = {};

/**
 * POST /api/admin/send-otp
 *
 * Expected payload:
 * {
 *   email: string,
 *   type: string // allowed values: "login", "createAccount", "forgotPassword"
 * }
 *
 * This endpoint validates the type, generates a 6-digit OTP, sends it via email using your nodemailer service,
 * and stores the OTP in memory for later verification.
 */
router.post("/send-otp", async (req, res) => {
  try {
    const { email, type } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    const allowedTypes = ["login", "createAccount", "forgotPassword"];
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid OTP type." });
    }

    // Use your nodemailer-based function to send the OTP email
    const result = await sendEmailOTP(email, type);
    if (!result.success) {
      return res
        .status(500)
        .json({ message: "Error sending OTP email.", error: result.error });
    }

    // Save the OTP returned from sendEmailOTP to the in-memory store
    otpStore[email] = result.otp;

    return res.status(200).json({
      message: "OTP sent successfully. Please check your email.",
    });
  } catch (error) {
    console.error("Error in /send-otp:", error.message, error.stack);
    return res.status(500).json({ message: "Internal server error." });
  }
});

/**
 * POST /api/admin/create-account
 *
 * Expected payload:
 * {
 *   firstName: string,
 *   lastName: string,
 *   email: string,
 *   password: string,
 *   otp: string
 * }
 *
 * Flow:
 * 1. Validate that all fields are provided.
 * 2. Create the SplendidAdminAcc table if it does not exist.
 * 3. Check if an admin already exists (only one admin allowed).
 * 4. Validate the OTP.
 * 5. If valid, insert the new admin into the database.
 */
router.post("/create-account", async (req, res) => {
  try {
    const { firstName, lastName, email, password, otp } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create the SplendidAdminAcc table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS SplendidAdminAcc (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `;
    await pool.query(createTableQuery);

    // Check if admin already exists
    const checkQuery = "SELECT * FROM SplendidAdminAcc WHERE email = $1";
    const checkResult = await pool.query(checkQuery, [email]);
    if (checkResult.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "Admin account already exists. Please log in." });
    }
    if (!otp) {
      return res
        .status(400)
        .json({ message: "OTP is required. Please request an OTP first." });
    }
    // Validate OTP
    if (!otpStore[email] || otpStore[email] !== otp) {
      return res.status(400).json({
        message:
          "Invalid or expired OTP. Please request a new OTP and try again.",
      });
    }
    // Insert new admin into the database
    const insertQuery = `
      INSERT INTO SplendidAdminAcc (firstName, lastName, email, password)
      VALUES ($1, $2, $3, $4)
    `;
    await pool.query(insertQuery, [firstName, lastName, email, password]);
    // Clean up OTP
    delete otpStore[email];
    return res
      .status(200)
      .json({ message: "Admin account created successfully!" });
  } catch (error) {
    console.error("Error in /create-account:", error.message, error.stack);
    return res.status(500).json({ message: "Internal server error." });
  }
});

/**
 * POST /api/admin/login
 *
 * Expected payload:
 * {
 *   email: string,
 *   otp: string,
 *   password: string
 * }
 *
 * Flow:
 * 1. Validate that all fields are provided.
 * 2. Check if the SplendidAdminAcc table exists. If not, ask the user to create an account.
 * 3. Validate the OTP.
 * 4. Check that the admin exists and that the password is correct.
 */
router.post("/login", async (req, res) => {
  try {
    // Check if the SplendidAdminAcc table exists
    const tableExistsQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'splendidadminacc'
      ) AS "exists";
    `;
    const tableExistsResult = await pool.query(tableExistsQuery);
    if (!tableExistsResult.rows[0].exists) {
      return res.status(400).json({
        message: "No admin account exists. Please create an account first.",
      });
    }

    const { email, otp, password } = req.body;
    if (!email || !otp || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    // Validate OTP
    if (!otpStore[email] || otpStore[email] !== otp) {
      return res.status(400).json({
        message:
          "Invalid or expired OTP. Please request a new OTP and try again.",
      });
    }
    // Check if admin exists and password matches
    const query =
      "SELECT * FROM SplendidAdminAcc WHERE email = $1 AND password = $2";
    const result = await pool.query(query, [email, password]);
    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Invalid email or password. Please try again." });
    }
    // Clean up OTP
    delete otpStore[email];
    return res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error("Error in /login:", error.message, error.stack);
    return res.status(500).json({ message: "Internal server error." });
  }
});

/**
 * POST /api/admin/reset-password
 *
 * Expected payload:
 * {
 *   email: string,
 *   otp: string,
 *   newPassword: string
 * }
 *
 * Flow:
 * 1. Validate that all fields are provided.
 * 2. Validate the OTP.
 * 3. Update the admin's password in the database.
 */
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }
    // Validate OTP
    if (!otpStore[email] || otpStore[email] !== otp) {
      return res.status(400).json({
        message:
          "Invalid or expired OTP. Please request a new OTP and try again.",
      });
    }
    // Update the admin's password
    const updateQuery =
      "UPDATE SplendidAdminAcc SET password = $1 WHERE email = $2";
    const updateResult = await pool.query(updateQuery, [newPassword, email]);
    if (updateResult.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "No admin account found with that email." });
    }
    // Clean up OTP
    delete otpStore[email];
    return res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    console.error("Error in /reset-password:", error.message, error.stack);
    return res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
