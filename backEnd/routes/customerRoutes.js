import express from "express";
import pool from "../config/pgDb.js"; // PostgreSQL Database connection
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import { sendEmailOTP } from "../config/Otp.js";
import jwt from "jsonwebtoken"; // For JWT token generation
import cookieParser from "cookie-parser"; // To handle cookies

const router = express.Router();
router.use(cookieParser());

// In-memory OTP store: { email: { otp, expiresAt, type } }
const otpStore = new Map();

// JWT Secret Keys
const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "your_access_secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "your_refresh_secret";

// Function to generate tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" } // Access token expires in 15 minutes
  );

  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" } // Refresh token expires in 7 days
  );

  return { accessToken, refreshToken };
};

/**
 * Login Route - Validates password or OTP, provides JWT
 */
router.post("/login", async (req, res) => {
  const { email, password, otp } = req.body;

  // Validate that email is provided and is a valid Gmail address.
  if (!email || !email.toLowerCase().endsWith("@gmail.com")) {
    return res
      .status(400)
      .json({ error: "A valid Gmail address is required." });
  }

  // Validate that at least one credential (password or OTP) is provided.
  if (!password && !otp) {
    return res
      .status(400)
      .json({ error: "Either password or OTP is required." });
  }

  try {
    const userResult = await pool.query(
      "SELECT * FROM SplendidHoodiesCustomer WHERE email = $1",
      [email]
    );
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "User not found." });
    }

    const user = userResult.rows[0];

    // If both OTP and password are provided, validate both:
    if (otp && password) {
      // Validate OTP first
      const storedOtpData = otpStore.get(email);
      if (
        !storedOtpData ||
        storedOtpData.type !== "login" ||
        Date.now() > storedOtpData.expiresAt
      ) {
        otpStore.delete(email);
        return res
          .status(400)
          .json({ error: "Invalid or expired OTP. Please request a new OTP." });
      }
      if (storedOtpData.otp !== otp) {
        storedOtpData.attempts = (storedOtpData.attempts || 0) + 1;
        otpStore.set(email, storedOtpData);
        if (storedOtpData.attempts >= 5) {
          otpStore.delete(email);
          return res.status(400).json({
            error: "Maximum OTP attempts exceeded. Please request a new OTP.",
          });
        }
        return res
          .status(400)
          .json({ error: "Invalid OTP. Please try again." });
      }

      // Validate password using bcrypt
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: "Invalid password." });
      }

      // Both OTP and password are valid; clear OTP from the store.
      otpStore.delete(email);
    }
    // If only OTP is provided:
    else if (otp) {
      const storedOtpData = otpStore.get(email);
      if (
        !storedOtpData ||
        storedOtpData.type !== "login" ||
        Date.now() > storedOtpData.expiresAt
      ) {
        otpStore.delete(email);
        return res
          .status(400)
          .json({ error: "Invalid or expired OTP. Please request a new OTP." });
      }
      if (storedOtpData.otp !== otp) {
        storedOtpData.attempts = (storedOtpData.attempts || 0) + 1;
        otpStore.set(email, storedOtpData);
        if (storedOtpData.attempts >= 3) {
          otpStore.delete(email);
          return res.status(400).json({
            error: "Maximum OTP attempts exceeded. Please request a new OTP.",
          });
        }
        return res
          .status(400)
          .json({ error: "Invalid OTP. Please try again." });
      }
      otpStore.delete(email);
    }
    // If only password is provided:
    else if (password) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: "Invalid password." });
      }
    }

    // Generate JWT Tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Store tokens in cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 10 * 60 * 1000, // 10 minutes
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Remove sensitive fields before sending user data
    const { password: pwd, ...safeUser } = user;

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user: safeUser,
    });
  } catch (error) {
    console.error("Error in /login:", error.message, error.stack);
    return res.status(500).json({ error: "Internal server error." });
  }
});

/**
 * Check if user is authenticated (Valid Token)
 */
router.get("/check-auth", async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.json({ isAuthenticated: false });

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

    // Fetch user details from database
    const userResult = await pool.query(
      "SELECT id, first_name, last_name, email FROM SplendidHoodiesCustomer WHERE id = $1",
      [decoded.id]
    );

    if (userResult.rows.length === 0) {
      return res.json({ isAuthenticated: false });
    }

    const user = userResult.rows[0];
    res.json({ isAuthenticated: true, user });
  } catch (error) {
    res.json({ isAuthenticated: false });
  }
});

// 📌 Ensure the `SplendidHoodiesCustomer` table exists
const ensureTableExists = async () => {
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS SplendidHoodiesCustomer (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
        );
      `;
    await pool.query(query);
    console.log("✅ Table checked/created: SplendidHoodiesCustomer");
  } catch (error) {
    console.error("❌ Error ensuring table exists:", error);
  }
};

// 📌 Route: Send OTP (for Signup, Login, or Password Reset)
router.post("/customer-otp", async (req, res) => {
  const { email, type } = req.body;
  if (!email || !type)
    return res.status(400).json({ error: "Email and OTP type are required." });

  try {
    const { success, otp, error } = await sendEmailOTP(email, type);

    if (!success) return res.status(500).json({ error });

    // Store OTP in memory for validation
    otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60000, type });

    res.json({ success: true, message: `OTP sent successfully for ${type}!` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Route: Sign Up with Secure Password Hashing
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, otp } = req.body;

  if (!firstName || !lastName || !email || !password || !otp) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Check if the email already exists in the database
    const existingUser = await pool.query(
      "SELECT email FROM SplendidHoodiesCustomer WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Email already registered. Please log in." });
    }

    const storedOtpData = otpStore.get(email);

    if (!storedOtpData || storedOtpData.type !== "createAccount") {
      return res
        .status(400)
        .json({ error: "No valid signup OTP found. Request a new one." });
    }

    if (storedOtpData.otp !== otp || Date.now() > storedOtpData.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ error: "Invalid or expired OTP." });
    }

    // 🔐 Securely hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ensure the table exists before inserting a new user
    await ensureTableExists();

    // Store the new user in the database with the hashed password
    await pool.query(
      `INSERT INTO SplendidHoodiesCustomer (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)`,
      [firstName, lastName, email, hashedPassword]
    );

    otpStore.delete(email);
    res.json({
      success: true,
      message: "Account created successfully! Please log in.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Route: Logout
router.post("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ success: true, message: "Logged out successfully." });
});

/**
 * 📌 Route: Reset Password
 * Expects: { email, newPassword, otp }
 *
 * Logic:
 * 1. Validate that email, newPassword, and otp are provided.
 * 2. Check the in-memory OTP store to verify that a valid OTP exists for the given email with type "forgotPassword".
 * 3. If the OTP is valid and not expired, hash the new password using bcrypt.
 * 4. Update the user's password in the database.
 * 5. Delete the OTP from the store and respond with a success message.
 */

router.post("/reset-password", async (req, res) => {
  const { email, newPassword, otp } = req.body;

  // Validate input fields
  if (!email || !newPassword || !otp) {
    return res
      .status(400)
      .json({ error: "Email, new password, and OTP are required." });
  }

  // Retrieve stored OTP data for the provided email
  const storedOtpData = otpStore.get(email);

  // Check if OTP exists and if it's for a password reset
  if (!storedOtpData || storedOtpData.type !== "forgotPassword") {
    return res.status(400).json({
      error: "No valid OTP found for password reset. Please request a new one.",
    });
  }

  // Validate OTP value and check for expiration
  if (storedOtpData.otp !== otp || Date.now() > storedOtpData.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ error: "Invalid or expired OTP." });
  }

  try {
    // Hash the new password securely using bcrypt
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await pool.query(
      "UPDATE SplendidHoodiesCustomer SET password = $1 WHERE email = $2",
      [hashedPassword, email]
    );

    // Remove the OTP from the in-memory store
    otpStore.delete(email);

    res.json({ success: true, message: "Password reset successful!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/refresh-token", async (req, res) => {
  try {
    // Read the refresh token from cookies
    const oldRefreshToken = req.cookies.refreshToken;
    if (!oldRefreshToken) {
      return res
        .status(401)
        .json({ error: "Refresh token not found. Please log in again." });
    }

    // Verify the refresh token using your secret key
    const decoded = jwt.verify(oldRefreshToken, REFRESH_TOKEN_SECRET);

    // Optionally, verify the user still exists in the database
    const userResult = await pool.query(
      "SELECT * FROM SplendidHoodiesCustomer WHERE id = $1",
      [decoded.id]
    );
    if (userResult.rows.length === 0) {
      return res
        .status(401)
        .json({ error: "User not found. Please log in again." });
    }
    const user = userResult.rows[0];

    // Generate new tokens (access and refresh)
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

    // Set new tokens in cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // use true in production
      sameSite: "lax",
      maxAge: 10 * 60 * 1000, // 10 minutes
    });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({ success: true, message: "Session extended" });
  } catch (error) {
    console.error("Error refreshing token:", error.message, error.stack);
    return res.status(401).json({ error: "Invalid or expired refresh token." });
  }
});

export default router;
