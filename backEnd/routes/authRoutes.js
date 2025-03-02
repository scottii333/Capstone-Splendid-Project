import express from "express";
import { sendEmailOTP } from "../config/Otp.js"; // Import the sendEmailOTP function

const router = express.Router(); // Create a mini express router

// Route to send an email OTP
router.get("/Send-Gmail-Otp", async (req, res) => {
  const sampleEmail = "angelscottdeleon@gmail.com"; // Sample email address
  const emailResponse = await sendEmailOTP(sampleEmail); // Send the email OTP

  if (emailResponse.success) {
    res.json({
      message: "Email OTP sent successfully!",
      otp: emailResponse.otp,
    });
  } else {
    res.status(500).json({
      message: "Failed to send email OTP!",
      error: emailResponse.error,
    });
  }
});

export default router; // Export the router
