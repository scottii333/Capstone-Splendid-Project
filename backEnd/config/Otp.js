import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to generate a 6-digit OTP
const generateEmailOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendEmailOTP = async (email) => {
  const EmailOTP = generateEmailOTP();

  // Email template with inline CSS
  const emailHTML = `
  <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-family: Arial, sans-serif;">
    <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #333; margin-bottom: 10px;">🔐 Your OTP Code</h2>
      <p style="color: #666; font-size: 16px;">Use the OTP below to complete your authentication. This code expires in <strong>10 minutes</strong>.</p>
      <div style="font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px; background: #f9f9f9; border-radius: 5px; display: inline-block; margin: 20px auto;">
        ${EmailOTP}
      </div>
      <p style="margin-top: 20px; color: #777; font-size: 14px;">If you did not request this, please ignore this email.</p>
    </div>
  </div>
  `;

  const mailOptions = {
    from: `"Security Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    html: emailHTML, // Sending HTML email with inline styles
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP ${EmailOTP} sent to ${email}`);

    return { success: true, otp: EmailOTP };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};

export default transporter;
