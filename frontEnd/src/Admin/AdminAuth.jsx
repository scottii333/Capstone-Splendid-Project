import { useState } from "react";
import brandLogo from "../Images/brandLogo.png";

export const AdminAuth = () => {
  const [view, setView] = useState("login"); // login, createAccount, forgotPassword

  const handleFormValidation = (e) => {
    e.preventDefault();
    const form = e.target;
    const inputs = form.querySelectorAll("input");

    for (let input of inputs) {
      if (!input.value.trim()) {
        alert("Please fill out all fields before submitting.");
        input.focus();
        return;
      }
    }

    alert("Form submitted successfully!");
  };

  const renderLoginForm = () => (
    <form
      className="w-full p-2 flex flex-col gap-2"
      onSubmit={handleFormValidation}
    >
      <label>Email</label>
      <div className="flex gap-2 sm:gap-4 sm:flex-row flex-col">
        <input
          type="email"
          className="border rounded-lg p-2 flex-1 cursor-pointer w-full"
          placeholder="Enter your email"
          required
        />
        <button
          type="button"
          onClick={() => alert("OTP sent!")}
          className="text-sm rounded-lg px-2 py-1 cursor-pointer w-full sm:w-auto [background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
        >
          Send OTP
        </button>
      </div>
      <label>OTP</label>
      <input
        type="text"
        className="border rounded-lg p-2 cursor-pointer w-full"
        placeholder="Enter OTP"
        required
      />
      <label>Password</label>
      <input
        type="password"
        className="border rounded-lg p-2 cursor-pointer w-full"
        placeholder="Enter your password"
        required
      />
      <button
        type="submit"
        className="p-2 rounded-lg cursor-pointer w-full [background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
      >
        Log In
      </button>

      <button
        type="button"
        onClick={() => setView("createAccount")}
        className="border rounded-lg p-2 cursor-pointer w-full"
      >
        Create Account
      </button>
      <button
        type="button"
        onClick={() => setView("forgotPassword")}
        className="text-sm text-right cursor-pointer w-full sm:w-auto"
      >
        Forgot Password?
      </button>
    </form>
  );

  const renderCreateAccountForm = () => (
    <form
      className="w-full p-2 flex flex-col gap-2"
      onSubmit={handleFormValidation}
    >
      <div className="flex gap-2 sm:flex-row flex-col">
        <div className="flex flex-col w-full">
          <label>First Name</label>
          <input
            type="text"
            className="border rounded-lg p-2 cursor-pointer w-full"
            placeholder="Enter first name"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label>Last Name</label>
          <input
            type="text"
            className="border rounded-lg p-2 cursor-pointer w-full"
            placeholder="Enter last name"
            required
          />
        </div>
      </div>
      <label>Email</label>
      <div className="flex gap-2 sm:flex-row flex-col">
        <input
          type="email"
          className="border rounded-lg p-2 flex-1 cursor-pointer w-full"
          placeholder="Enter your email"
          required
        />
        <button
          type="button"
          onClick={() => alert("OTP sent!")}
          className="text-sm rounded-lg px-2 py-1 cursor-pointer w-full sm:w-auto [background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
        >
          Send OTP
        </button>
      </div>
      <label>OTP</label>
      <input
        type="text"
        className="border rounded-lg p-2 cursor-pointer w-full"
        placeholder="Enter OTP"
        required
      />
      <label>Password</label>
      <input
        type="password"
        className="border rounded-lg p-2 cursor-pointer w-full"
        placeholder="Create a password"
        required
      />
      <button
        type="submit"
        className="p-2 rounded-lg cursor-pointer w-full [background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
      >
        Create Account
      </button>
      <button
        type="button"
        onClick={() => setView("login")}
        className="text-sm text-right cursor-pointer w-full"
      >
        Back to Login
      </button>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form
      className="w-full p-2 flex flex-col gap-2"
      onSubmit={handleFormValidation}
    >
      <label>Email</label>
      <div className="flex gap-2 sm:flex-row flex-col">
        <input
          type="email"
          className="border rounded-lg p-2 flex-1 cursor-pointer w-full"
          placeholder="Enter your email"
          required
        />
        <button
          type="button"
          onClick={() => alert("OTP sent!")}
          className="text-sm rounded-lg px-2 py-1 cursor-pointer w-full sm:w-auto [background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
        >
          Send OTP
        </button>
      </div>
      <label>OTP</label>
      <input
        type="text"
        className="border rounded-lg p-2 cursor-pointer w-full"
        placeholder="Enter OTP"
        required
      />
      <label>New Password</label>
      <input
        type="password"
        className="border rounded-lg p-2 cursor-pointer w-full"
        placeholder="Enter new password"
        required
      />
      <button
        type="submit"
        className="p-2 rounded-lg cursor-pointer w-full [background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
      >
        Reset Password
      </button>
      <button
        type="button"
        onClick={() => setView("login")}
        className="text-sm text-right cursor-pointer w-full"
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
