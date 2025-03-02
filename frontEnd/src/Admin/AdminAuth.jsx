import { useState } from "react";
import brandLogo from "../Images/brandLogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AdminAuth = () => {
  const [view, setView] = useState("login"); // "login", "createAccount", "forgotPassword"
  const navigate = useNavigate();
  // --- States for Login Form ---
  const [loginEmail, setLoginEmail] = useState("");
  const [loginOTP, setLoginOTP] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginOtpTimer, setLoginOtpTimer] = useState(0);

  // --- States for Create Account Form ---
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createOTP, setCreateOTP] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createOtpTimer, setCreateOtpTimer] = useState(0);

  // --- States for Forgot Password Form ---
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOTP, setForgotOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotOtpTimer, setForgotOtpTimer] = useState(0);

  // Helper functions to reset each form's fields
  const resetLoginFields = () => {
    setLoginEmail("");
    setLoginOTP("");
    setLoginPassword("");
    setLoginOtpTimer(0);
  };

  const resetCreateFields = () => {
    setFirstName("");
    setLastName("");
    setCreateEmail("");
    setCreateOTP("");
    setCreatePassword("");
    setCreateOtpTimer(0);
  };

  const resetForgotFields = () => {
    setForgotEmail("");
    setForgotOTP("");
    setNewPassword("");
    setForgotOtpTimer(0);
  };

  // Utility function to validate that the email is a Gmail address
  const isValidGmail = (email) =>
    email.trim().toLowerCase().endsWith("@gmail.com");

  // Helper to start a 30-second OTP timer
  const startOtpTimer = (setTimer) => {
    setTimer(30);
    const intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // --- OTP sending functions ---
  const sendLoginOTP = async () => {
    if (!loginEmail) {
      alert("Please enter your email to send OTP.");
      return;
    }
    if (!isValidGmail(loginEmail)) {
      alert("Email must be a Gmail account.");
      return;
    }
    if (loginOtpTimer > 0) {
      alert(
        `Please wait ${loginOtpTimer} seconds before requesting a new OTP.`
      );
      return;
    }
    try {
      await axios.post("http://localhost:3000/api/admin/send-otp", {
        email: loginEmail,
        type: "login",
      });
      startOtpTimer(setLoginOtpTimer);
      alert("OTP sent successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Error sending OTP for login.");
    }
  };

  const sendCreateAccountOTP = async () => {
    if (!createEmail) {
      alert("Please enter your email to send OTP.");
      return;
    }
    if (!isValidGmail(createEmail)) {
      alert("Email must be a Gmail account.");
      return;
    }
    if (createOtpTimer > 0) {
      alert(
        `Please wait ${createOtpTimer} seconds before requesting a new OTP.`
      );
      return;
    }
    try {
      await axios.post("http://localhost:3000/api/admin/send-otp", {
        email: createEmail,
        type: "createAccount",
      });
      startOtpTimer(setCreateOtpTimer);
      alert("OTP sent successfully!");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Error sending OTP for account creation."
      );
    }
  };

  const sendForgotPasswordOTP = async () => {
    if (!forgotEmail) {
      alert("Please enter your email to send OTP.");
      return;
    }
    if (!isValidGmail(forgotEmail)) {
      alert("Email must be a Gmail account.");
      return;
    }
    if (forgotOtpTimer > 0) {
      alert(
        `Please wait ${forgotOtpTimer} seconds before requesting a new OTP.`
      );
      return;
    }
    try {
      await axios.post("http://localhost:3000/api/admin/send-otp", {
        email: forgotEmail,
        type: "forgotPassword",
      });
      startOtpTimer(setForgotOtpTimer);
      alert("OTP sent successfully!");
    } catch (error) {
      alert(
        error.response?.data?.message || "Error sending OTP for password reset."
      );
    }
  };

  // --- Form submission handlers ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginOTP || !loginPassword) {
      alert("Please fill out all fields.");
      return;
    }
    if (!isValidGmail(loginEmail)) {
      alert("Email must be a Gmail account.");
      return;
    }
    try {
      await axios.post("http://localhost:3000/api/admin/login", {
        email: loginEmail,
        otp: loginOTP,
        password: loginPassword,
      });
      alert("Login successful!");
      resetLoginFields();
      navigate("/Admin-Dashboard-Splendid");
    } catch (error) {
      alert(error.response?.data?.message || "Error during login.");
    }
  };

  const handleCreateAccountSubmit = async (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !createEmail ||
      !createOTP ||
      !createPassword
    ) {
      alert("Please fill out all fields.");
      return;
    }
    if (!isValidGmail(createEmail)) {
      alert("Email must be a Gmail account.");
      return;
    }
    try {
      await axios.post("http://localhost:3000/api/admin/create-account", {
        firstName,
        lastName,
        email: createEmail,
        otp: createOTP,
        password: createPassword,
      });
      alert("Account created successfully!");
      resetCreateFields();
      setView("login");
    } catch (error) {
      alert(error.response?.data?.message || "Error creating account.");
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!forgotEmail || !forgotOTP || !newPassword) {
      alert("Please fill out all fields.");
      return;
    }
    if (!isValidGmail(forgotEmail)) {
      alert("Email must be a Gmail account.");
      return;
    }
    try {
      await axios.post("http://localhost:3000/api/admin/reset-password", {
        email: forgotEmail,
        otp: forgotOTP,
        newPassword,
      });
      alert("Password reset successfully!");
      resetForgotFields();
      setView("login");
    } catch (error) {
      alert(error.response?.data?.message || "Error resetting password.");
    }
  };

  // --- Render Functions ---
  const renderLoginForm = () => (
    <form
      className="w-full p-2 flex flex-col gap-2"
      onSubmit={handleLoginSubmit}
    >
      <label>Email</label>
      <div className="flex gap-2 sm:gap-4 sm:flex-row flex-col">
        <input
          type="email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          className="border rounded-lg p-2 w-full"
          placeholder="Enter your email"
          required
        />
        <button
          type="button"
          onClick={sendLoginOTP}
          disabled={loginOtpTimer > 0}
          className="text-sm rounded-lg px-2 py-1 w-full sm:w-auto [background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
        >
          {loginOtpTimer > 0 ? `Resend OTP in ${loginOtpTimer}s` : "Send OTP"}
        </button>
      </div>
      <label>OTP</label>
      <input
        type="text"
        value={loginOTP}
        onChange={(e) => setLoginOTP(e.target.value)}
        className="border rounded-lg p-2 w-full"
        placeholder="Enter OTP"
        required
      />
      <label>Password</label>
      <input
        type="password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
        className="border rounded-lg p-2 w-full"
        placeholder="Enter your password"
        required
      />
      <button
        type="submit"
        className="p-2 rounded-lg w-full [background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
      >
        Log In
      </button>
      <button
        type="button"
        onClick={() => {
          resetCreateFields();
          setView("createAccount");
        }}
        className="border rounded-lg p-2 w-full"
      >
        Create Account
      </button>
      <button
        type="button"
        onClick={() => {
          resetForgotFields();
          setView("forgotPassword");
        }}
        className="text-sm text-right w-full sm:w-auto"
      >
        Forgot Password?
      </button>
    </form>
  );

  const renderCreateAccountForm = () => (
    <form
      className="w-full p-2 flex flex-col gap-2"
      onSubmit={handleCreateAccountSubmit}
    >
      <div className="flex gap-2 sm:flex-row flex-col">
        <div className="flex flex-col w-full">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border rounded-lg p-2 w-full"
            placeholder="Enter first name"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border rounded-lg p-2 w-full"
            placeholder="Enter last name"
            required
          />
        </div>
      </div>
      <label>Email</label>
      <div className="flex gap-2 sm:flex-row flex-col">
        <input
          type="email"
          value={createEmail}
          onChange={(e) => setCreateEmail(e.target.value)}
          className="border rounded-lg p-2 flex-1 w-full"
          placeholder="Enter your email"
          required
        />
        <button
          type="button"
          onClick={sendCreateAccountOTP}
          disabled={createOtpTimer > 0}
          className="text-sm rounded-lg px-2 py-1 w-full sm:w-auto [background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
        >
          {createOtpTimer > 0 ? `Resend OTP in ${createOtpTimer}s` : "Send OTP"}
        </button>
      </div>
      <label>OTP</label>
      <input
        type="text"
        value={createOTP}
        onChange={(e) => setCreateOTP(e.target.value)}
        className="border rounded-lg p-2 w-full"
        placeholder="Enter OTP"
        required
      />
      <label>Password</label>
      <input
        type="password"
        value={createPassword}
        onChange={(e) => setCreatePassword(e.target.value)}
        className="border rounded-lg p-2 w-full"
        placeholder="Create a password"
        required
      />
      <button
        type="submit"
        className="p-2 rounded-lg w-full [background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
      >
        Create Account
      </button>
      <button
        type="button"
        onClick={() => {
          resetLoginFields();
          setView("login");
        }}
        className="text-sm text-right w-full"
      >
        Back to Login
      </button>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form
      className="w-full p-2 flex flex-col gap-2"
      onSubmit={handleForgotPasswordSubmit}
    >
      <label>Email</label>
      <div className="flex gap-2 sm:flex-row flex-col">
        <input
          type="email"
          value={forgotEmail}
          onChange={(e) => setForgotEmail(e.target.value)}
          className="border rounded-lg p-2 flex-1 w-full"
          placeholder="Enter your email"
          required
        />
        <button
          type="button"
          onClick={sendForgotPasswordOTP}
          disabled={forgotOtpTimer > 0}
          className="text-sm rounded-lg px-2 py-1 w-full sm:w-auto [background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
        >
          {forgotOtpTimer > 0 ? `Resend OTP in ${forgotOtpTimer}s` : "Send OTP"}
        </button>
      </div>
      <label>OTP</label>
      <input
        type="text"
        value={forgotOTP}
        onChange={(e) => setForgotOTP(e.target.value)}
        className="border rounded-lg p-2 w-full"
        placeholder="Enter OTP"
        required
      />
      <label>New Password</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="border rounded-lg p-2 w-full"
        placeholder="Enter new password"
        required
      />
      <button
        type="submit"
        className="p-2 rounded-lg w-full [background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
      >
        Reset Password
      </button>
      <button
        type="button"
        onClick={() => {
          resetLoginFields();
          setView("login");
        }}
        className="text-sm text-right w-full"
      >
        Back to Login
      </button>
    </form>
  );

  return (
    <div className="w-screen h-screen [background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)] flex justify-center items-center px-2 sm:px-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-lg p-4 flex flex-col items-center gap-4 shadow-lg">
        <img
          src={brandLogo}
          alt="Brand Logo"
          className="w-40 h-22 object-cover"
        />
        {view === "login" && renderLoginForm()}
        {view === "createAccount" && renderCreateAccountForm()}
        {view === "forgotPassword" && renderForgotPasswordForm()}
      </div>
    </div>
  );
};
