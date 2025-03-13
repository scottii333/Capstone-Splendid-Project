import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

import cartLogo from "../Images/cartLogo.png";
import mainLogo from "../Images/brandLogo.png";
import accountLogo from "../Images/accLogo.png";
import closeLogo from "../Images/closeBtn.png";
import sampleProductImg from "../Images/HoodieProd.png";
import sampleIcon from "../Images/accLogo.png";

export const Navbar = () => {
  /* --------------------------------------------------------------------------
     STATE DECLARATIONS & REFS
  -------------------------------------------------------------------------- */
  // Modal visibility states
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isMobileAccOpen, setIsMobileAccOpen] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [isDesktopCartOpen, setIsDesktopCartOpen] = useState(false);
  const [isDesktopAccOpen, setIsDesktopAccOpen] = useState(false);

  // Authentication and user data
  const [isAutenticatedModalOpen, setIsAutenticatedModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  // Session timers for auto logout functionality
  const [sessionTimer, setSessionTimer] = useState(20);
  const [warningTimer, setWarningTimer] = useState(10);
  const [showSessionWarning, setShowSessionWarning] = useState(false);

  // Refs to store interval IDs for inactivity and warning timers
  const inactivityIntervalRef = useRef(null);
  const warningIntervalRef = useRef(null);

  // Ref to always hold the latest warning state (used in event listeners)
  const warningActiveRef = useRef(showSessionWarning);
  useEffect(() => {
    warningActiveRef.current = showSessionWarning;
  }, [showSessionWarning]);

  /* --------------------------------------------------------------------------
     AUTHENTICATION CHECK
  -------------------------------------------------------------------------- */

  useEffect(() => {
    // Check Authentication and Fetch User Data
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/customer/check-auth",
          {
            withCredentials: true,
          }
        );

        if (res.data.isAuthenticated) {
          setIsAuthenticated(true);
          setUserData(res.data.user); // ✅ Store user data in state
        } else {
          setIsAuthenticated(false);
          setUserData(null);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
        setUserData(null);
      }
    };
    checkAuth();
  }, []);

  // Close all modals at once
  const closeAllModals = () => {
    setIsMobileAccOpen(false);
    setIsMobileCartOpen(false);
    setIsDesktopCartOpen(false);
    setIsDesktopAccOpen(false);
    setIsAutenticatedModalOpen(false);
  };

  /* --------------------------------------------------------------------------
     FORM STATES & OTP TIMERS
  -------------------------------------------------------------------------- */
  // State for switching between forms: "signup", "login", "reset"
  const [activeTab, setActiveTab] = useState("signup"); // State for switching between forms

  // State for storing sign up data
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    otp: "",
  });

  // Data for login form
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    otp: "",
  });

  // Data for reset password form
  const [resetData, setResetData] = useState({
    email: "",
    newPassword: "",
    otp: "",
  });

  // OTP Resend Timers for each action
  const [signupTimer, setSignupTimer] = useState(0);
  const [loginTimer, setLoginTimer] = useState(0);
  const [resetTimer, setResetTimer] = useState(0);

  // Countdown effect for Signup OTP
  useEffect(() => {
    if (signupTimer > 0) {
      const timer = setTimeout(() => setSignupTimer(signupTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [signupTimer]);

  // Countdown effect for Login OTP
  useEffect(() => {
    if (loginTimer > 0) {
      const timer = setTimeout(() => setLoginTimer(loginTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [loginTimer]);

  // Countdown effect for Reset OTP
  useEffect(() => {
    if (resetTimer > 0) {
      const timer = setTimeout(() => setResetTimer(resetTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resetTimer]);

  // Handle user logout
  const handleLogout = useCallback(async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/customer/logout",
        {},
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      setIsAutenticatedModalOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, []);

  /* --------------------------------------------------------------------------
     SESSION TIMER FUNCTIONS (INACTIVITY & WARNING)
  -------------------------------------------------------------------------- */
  // Memoized function to start the warning timer after the inactivity timer expires
  const startWarningTimer = useCallback(() => {
    setShowSessionWarning(true);
    setWarningTimer(10);
    if (warningIntervalRef.current) clearInterval(warningIntervalRef.current);
    warningIntervalRef.current = setInterval(() => {
      setWarningTimer((prev) => {
        if (prev <= 1) {
          clearInterval(warningIntervalRef.current);
          handleLogout(); // Auto logout if no action
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [handleLogout]);

  // Memoized function to start the inactivity timer (only for authenticated users)
  const startInactivityTimer = useCallback(() => {
    setShowSessionWarning(false);
    setSessionTimer(20);
    if (inactivityIntervalRef.current)
      clearInterval(inactivityIntervalRef.current);
    inactivityIntervalRef.current = setInterval(() => {
      setSessionTimer((prev) => {
        if (prev <= 1) {
          clearInterval(inactivityIntervalRef.current);
          startWarningTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [startWarningTimer]);

  // Memoized function to reset both timers; a "forced" reset overrides any warning state
  const resetTimers = useCallback(
    (forced = false) => {
      // If not forced and warning is active, do nothing.
      if (!forced && warningActiveRef.current) return;
      if (warningIntervalRef.current) clearInterval(warningIntervalRef.current);
      if (inactivityIntervalRef.current)
        clearInterval(inactivityIntervalRef.current);
      setShowSessionWarning(false);
      startInactivityTimer();
    },
    [startInactivityTimer]
  );

  // Memoized function to handle user activity events (resets the inactivity timer)
  const handleUserActivity = useCallback(() => {
    // Only reset timers if no warning is showing.
    if (!warningActiveRef.current) {
      resetTimers();
    }
  }, [resetTimers]);

  // Attach event listeners when authenticated and clean up on unmount
  useEffect(() => {
    if (isAuthenticated) {
      startInactivityTimer();
      window.addEventListener("mousemove", handleUserActivity);
      window.addEventListener("keypress", handleUserActivity);
    }
    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
      clearInterval(inactivityIntervalRef.current);
      clearInterval(warningIntervalRef.current);
    };
  }, [isAuthenticated, handleUserActivity, startInactivityTimer]);
  /* --------------------------------------------------------------------------
     FORM HANDLERS & OTP REQUESTS
  -------------------------------------------------------------------------- */

  // Handle form input changes for Signup, Login, and Reset forms
  const handleChange = (e, type) => {
    if (type === "signup")
      setSignupData({ ...signupData, [e.target.name]: e.target.value });
    if (type === "login")
      setLoginData({ ...loginData, [e.target.name]: e.target.value });
    if (type === "reset")
      setResetData({ ...resetData, [e.target.name]: e.target.value });
  };

  // Request OTP for the given action type
  const requestOtp = async (type) => {
    let email;
    let otpType;

    if (type === "signup") {
      if (!signupData.email) return alert("Please enter your email.");
      email = signupData.email;
      otpType = "createAccount";
      setSignupTimer(60);
    } else if (type === "login") {
      if (!loginData.email) return alert("Please enter your email.");
      email = loginData.email;
      otpType = "login";
      setLoginTimer(60);
    } else if (type === "reset") {
      if (!resetData.email) return alert("Please enter your email.");
      email = resetData.email;
      otpType = "forgotPassword";
      setResetTimer(60);
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/customer/customer-otp",
        { email, type: otpType }
      );
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.error || "Error sending OTP");
    }
  };

  // Handle Signup form submission

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/customer/signup",
        signupData
      );
      alert(res.data.message);
      setIsMobileAccOpen(false);
    } catch (error) {
      alert(error.response?.data?.error || "Error signing up");
    }
  };

  // Handle Login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/customer/login",
        loginData,
        { withCredentials: true }
      );
      alert(res.data.message);
      setIsAuthenticated(true);
      setIsMobileAccOpen(false);
      setIsDesktopAccOpen(false);
      setIsAutenticatedModalOpen(true);

      // ✅ Fetch User Details after login
      const userRes = await axios.get(
        "http://localhost:3000/api/customer/check-auth",
        {
          withCredentials: true,
        }
      );
      setUserData(userRes.data.user);
    } catch (error) {
      alert(error.response?.data?.error || "Error logging in");
    }
  };

  // Handle Reset Password form submission
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/customer/reset-password",
        resetData // ensure resetData contains email, newPassword, and otp
      );
      alert(res.data.message);
      setIsMobileAccOpen(false);
    } catch (error) {
      alert(error.response?.data?.error || "Error resetting password");
    }
  };

  /* --------------------------------------------------------------------------
     JSX RENDERING
  -------------------------------------------------------------------------- */

  return (
    <nav className="w-full h-[4rem] rounded-t-lg bg-[#F6E0D2] shadow-xl flex justify-between items-center p-2">
      <div className="w-[6rem]">
        <Link to="/">
          <img src={mainLogo} className="w-[100%]" />
        </Link>
      </div>
      {/* Component for Links in Desktop View */}
      <ul className="hidden sm:flex gap-4 p-2">
        <li>
          <Link to="/Collections-Splendid">Collections</Link>
        </li>
        <li>
          <Link to="/Showroom-Splendid">Showroom</Link>
        </li>
        <li>
          <Link to="/Journey-Splendid">Our Journey</Link>
        </li>
      </ul>
      {/* Component for Cart and Login Button in Desktop View */}
      <div className="hidden sm:flex gap-4 p-2  ">
        <button
          onClick={() => {
            closeAllModals();
            setIsDesktopCartOpen(!isDesktopCartOpen);
          }}
        >
          <img src={cartLogo} className="w-[2rem] h-[2rem] cursor-pointer" />
        </button>

        {/* Modal for Cart Desktop View */}
        <div
          className={`bg-white h-[auto] w-[20rem] absolute top-full right-15 shadow-lg border rounded-lg mt-2 transition-all duration-600 ease-in-out transform  ${
            isDesktopCartOpen
              ? "opacity-100 scale-100 visible z-50"
              : "opacity-0 scale-95 invinsible"
          }`}
        >
          <div className="flex flex-col p-1 gap-2 items-center h-full m-[1rem]">
            {/* Close Button */}
            <button
              className="cursor-pointer self-end"
              onClick={() => setIsDesktopCartOpen(false)}
            >
              <img src={closeLogo} className="w-[1.5rem]" alt="Close" />
            </button>
            {/* Sample Cart Product */}
            <div className=" min-h-[5rem] max-h-[15rem] w-full overflow-y-scroll flex flex-col gap-2 p-1 ">
              {/* first product */}
              <div className="border min-h-[10rem] flex gap-2 items-center p-1 rounded-lg bg-[#F6E0D2]">
                <img src={sampleProductImg} className="h-[6rem]" />
                <div className="flex flex-col gap-2 p-1">
                  <p className="text-[11px] font-bold">
                    Splendid Oversized Hoodie
                  </p>
                  <p className="text-[10px] flex items-center gap-10">
                    Color:<span> Ivory</span>
                  </p>
                  <p className="text-[10px] flex items-center gap-5">
                    Quantity:
                    <input
                      type="number"
                      defaultValue={0}
                      min={0}
                      className="w-10 h-[20px] py-1 border border-gray-300  text-center focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </p>
                  <p className="text-[10px] flex items-center gap-9">
                    Total: <span>PHP 1,500</span>{" "}
                  </p>
                  <button className="cursor-pointer bg-red-400 p-1 text-[9px] rounded-lg hover:bg-red-500 transition hover:text-white ">
                    Remove
                  </button>
                </div>
              </div>
              {/* Second product */}
              <div className="border min-h-[10rem] flex gap-2 items-center p-1 rounded-lg bg-[#F6E0D2]">
                <img src={sampleProductImg} className="h-[6rem]" />
                <div className="flex flex-col gap-2 p-1">
                  <p className="text-[11px] font-bold">
                    Splendid Oversized Hoodie
                  </p>
                  <p className="text-[10px] flex items-center gap-10">
                    Color:<span> Ivory</span>
                  </p>
                  <p className="text-[10px] flex items-center gap-5">
                    Quantity:
                    <input
                      type="number"
                      defaultValue={0}
                      min={0}
                      className="w-10 h-[20px] py-1 border border-gray-300  text-center focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </p>
                  <p className="text-[10px] flex items-center gap-9">
                    Total: <span>PHP 1,500</span>{" "}
                  </p>
                  <button className="cursor-pointer bg-red-400 p-1 text-[9px] rounded-lg hover:bg-red-500 transition hover:text-white ">
                    Remove
                  </button>
                </div>
              </div>
            </div>

            {/* Total Orders and Price */}
            <div className="w-full p-3 flex justify-between">
              <p className="text-[12px]">Total Orders: 10</p>
              <p className="text-[12px]">Total Price: PHP 2,600</p>
            </div>

            <button className="w-full py-2 bg-[#D5A58B] text-black rounded-lg cursor-pointer hover:bg-[#e0b9a4] transition">
              Checkout
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            if (isAuthenticated) {
              closeAllModals();
              setIsAutenticatedModalOpen(!isAutenticatedModalOpen);
            } else {
              closeAllModals();
              setIsDesktopAccOpen(!isDesktopAccOpen);
            }
          }}
        >
          <img src={accountLogo} className="w-[2rem] h-[2rem] cursor-pointer" />
        </button>

        {/* Modal for Account Desktop View */}
        <div
          className={`bg-white border  shadow-lg rounded-lg absolute top-full right-0 w-[25rem] mt-2 transition-all duration-600 ease-in-out transform ${
            isDesktopAccOpen
              ? "opacity-100 scale-100 visible z-30"
              : "opacity-0 scale-95 invisible"
          }`}
        >
          <div className="flex flex-col p-4 gap-3 items-center">
            {/* Close Button */}
            <button
              className="cursor-pointer self-end"
              onClick={() => setIsDesktopAccOpen(false)}
            >
              <img src={closeLogo} className="w-[1.5rem]" alt="Close" />
            </button>

            <h2 className="text-xl font-bold">Hi there!</h2>
            <p>Is it your first time on our website?</p>

            {/* Toggle Buttons */}
            <div className="flex  w-full justify-center">
              <button
                className={`px-4 py-2 rounded-tl-lg ${
                  activeTab === "signup" ? "bg-[#D5A58B]" : "bg-white border"
                }`}
                onClick={() => setActiveTab("signup")}
              >
                Yes, sign me up
              </button>
              <button
                className={`px-4 py-2  rounded-tr-lg ${
                  activeTab === "login" ? "bg-[#D5A58B]" : "bg-white border"
                }`}
                onClick={() => setActiveTab("login")}
              >
                No, log me in
              </button>
            </div>

            {/* Sign Up Form */}
            {activeTab === "signup" && (
              <form
                className="flex flex-col gap-2 w-full mt-4"
                onSubmit={handleSignup}
              >
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={(e) => handleChange(e, "signup")}
                  required
                  className="p-2 border rounded-md"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={(e) => handleChange(e, "signup")}
                  required
                  className="p-2 border rounded-md"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => handleChange(e, "signup")}
                  required
                  className="p-2 border rounded-md"
                />
                <button
                  className="bg-[#D5A58B] py-2 rounded-md cursor-pointer hover:bg-[#e0b9a4] transition"
                  type="button"
                  onClick={() => requestOtp("signup")}
                  disabled={signupTimer > 0}
                >
                  {signupTimer > 0 ? `Resend in ${signupTimer}s` : "Send OTP"}
                </button>
                <input
                  type="text"
                  name="otp"
                  placeholder="OTP"
                  onChange={(e) => handleChange(e, "signup")}
                  required
                  className="p-2 border rounded-md"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => handleChange(e, "signup")}
                  required
                  className="p-2 border rounded-md"
                />
                <button
                  type="submit"
                  className="bg-[#D5A58B] py-2 rounded-md cursor-pointer hover:bg-[#e0b9a4] transition"
                >
                  Sign Up
                </button>
              </form>
            )}

            {/* Log In Form */}
            {activeTab === "login" && (
              <form
                className="flex flex-col gap-2 w-full mt-4"
                onSubmit={handleLogin}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => handleChange(e, "login")}
                  required
                  className="p-2 border rounded-md"
                />
                <button
                  className="bg-[#D5A58B] py-2 rounded-md cursor-pointer hover:bg-[#e0b9a4] transition"
                  type="button"
                  onClick={() => requestOtp("login")}
                  disabled={loginTimer > 0}
                >
                  {loginTimer > 0 ? `Resend in ${loginTimer}s` : "Send OTP"}
                </button>
                <input
                  type="text"
                  name="otp"
                  placeholder="OTP"
                  onChange={(e) => handleChange(e, "login")}
                  required
                  className="p-2 border rounded-md"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => handleChange(e, "login")}
                  required
                  className="p-2 border rounded-md"
                />
                <button
                  type="submit"
                  className="bg-[#D5A58B] py-2 rounded-md cursor-pointer hover:bg-[#e0b9a4] transition"
                >
                  Log In
                </button>
                <button
                  className="text-sm text-gray-500"
                  onClick={() => setActiveTab("reset")}
                >
                  Forgot Password?
                </button>
              </form>
            )}

            {/* Reset Password Form */}
            {activeTab === "reset" && (
              <form
                className="flex flex-col gap-2 w-full mt-4"
                onSubmit={handleReset}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => handleChange(e, "reset")}
                  required
                  className="p-2 border rounded-md"
                />
                <button
                  className="bg-[#D5A58B] py-2 rounded-md cursor-pointer hover:bg-[#e0b9a4] transition"
                  type="button"
                  onClick={() => requestOtp("reset")}
                  disabled={resetTimer > 0}
                >
                  {resetTimer > 0 ? `Resend in ${resetTimer}s` : "Send OTP"}
                </button>
                <input
                  type="text"
                  name="otp"
                  placeholder="OTP"
                  onChange={(e) => handleChange(e, "reset")}
                  required
                  className="p-2 border rounded-md"
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  onChange={(e) => handleChange(e, "reset")}
                  required
                  className="p-2 border rounded-md"
                />
                <button
                  type="submit"
                  className="bg-[#D5A58B] py-2 rounded-md cursor-pointer hover:bg-[#e0b9a4] transition"
                >
                  Reset Password
                </button>
                <button
                  className="text-sm text-gray-500"
                  onClick={() => setActiveTab("login")}
                >
                  Go Back to Log In
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Component for Design in Mobile View */}
      <div className=" sm:hidden ">
        {/* Hamburger Button and Cart Button */}
        <div className="flex justify-between items-center gap-5 p-2">
          <button>
            <img
              src={cartLogo}
              className="w-[1.5rem] h-[1.5rem] cursor-pointer"
              onClick={() => {
                closeAllModals();
                setIsHamburgerOpen(false);
                setIsMobileCartOpen(!isMobileCartOpen);
              }}
            />
          </button>
          <button
            className="flex flex-col justify-between w-6 h-5 cursor-pointer focus:outline-none"
            onClick={() => {
              closeAllModals();
              setIsHamburgerOpen(!isHamburgerOpen);
            }}
          >
            <span
              className={`block h-0.5 w-full bg-black rounded transition-transform duration-300 ${
                isHamburgerOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-black rounded transition-opacity duration-300 ${
                isHamburgerOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-black rounded transition-transform duration-300 ${
                isHamburgerOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Modal for Links in Mobile View */}
        <div
          className={`absolute bg-[#F6E0D2] top-16 left-0 w-full h-[50dvh] p-[1rem] 
            transition-all duration-500 ease-in-out transform
            ${
              isHamburgerOpen
                ? "translate-x-0 opacity-100 visible"
                : "-translate-x-full opacity-0 invisible"
            }`}
        >
          <ul className="flex flex-col gap-4  w-full  text-center">
            <li>
              <Link
                onClick={() => setIsHamburgerOpen(false)}
                to="/Collections-Splendid"
              >
                Collections
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsHamburgerOpen(false)}
                to="/Showroom-Splendid"
              >
                Showroom
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsHamburgerOpen(false)}
                to="/Journey-Splendid"
              >
                Our Journey
              </Link>
            </li>
          </ul>
          <div className="flex justify-center mt-4">
            <button className="cursor-pointer">
              <img
                src={accountLogo}
                className="w-[2rem] h-[2rem]"
                onClick={() => {
                  if (isAuthenticated) {
                    closeAllModals();
                    setIsAutenticatedModalOpen(true);

                    setIsHamburgerOpen(false);
                  } else {
                    setIsMobileAccOpen(!isMobileAccOpen);
                    setIsHamburgerOpen(false);
                  }
                }}
              />
            </button>
          </div>
        </div>
      </div>
      {/* Component for Cart Modal in Mobile View */}
      <div
        className={`bg-white h-[auto] w-[20rem] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg border rounded-lg sm:invisible transition-all duration-500 ease-in-out transform ${
          isMobileCartOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
      >
        <div className="flex flex-col p-1 gap-2 items-center h-full m-[1rem]">
          {/* Close Button */}
          <button
            className="cursor-pointer self-end"
            onClick={() => setIsMobileCartOpen(false)}
          >
            <img src={closeLogo} className="w-[1.5rem]" alt="Close" />
          </button>
          {/* Sample Cart Product */}
          <div className=" min-h-[5rem] max-h-[15rem] w-full overflow-y-scroll flex flex-col gap-2 p-1 ">
            {/* first product */}
            <div className="border min-h-[10rem] flex gap-2 items-center p-1 rounded-lg bg-[#F6E0D2]">
              <img src={sampleProductImg} className="h-[6rem]" />
              <div className="flex flex-col gap-2 p-1">
                <p className="text-[11px] font-bold">
                  Splendid Oversized Hoodie
                </p>
                <p className="text-[10px] flex items-center gap-10">
                  Color:<span> Ivory</span>
                </p>
                <p className="text-[10px] flex items-center gap-5">
                  Quantity:
                  <input
                    type="number"
                    defaultValue={0}
                    min={0}
                    className="w-10 h-[20px] py-1 border border-gray-300  text-center focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </p>
                <p className="text-[10px] flex items-center gap-9">
                  Total: <span>PHP 1,500</span>{" "}
                </p>
                <button className="cursor-pointer bg-red-400 p-1 text-[9px] rounded-lg hover:bg-red-500 transition hover:text-white ">
                  Remove
                </button>
              </div>
            </div>
            {/* Second product */}
            <div className="border min-h-[10rem] flex gap-2 items-center p-1 rounded-lg bg-[#F6E0D2]">
              <img src={sampleProductImg} className="h-[6rem]" />
              <div className="flex flex-col gap-2 p-1">
                <p className="text-[11px] font-bold">
                  Splendid Oversized Hoodie
                </p>
                <p className="text-[10px] flex items-center gap-10">
                  Color:<span> Ivory</span>
                </p>
                <p className="text-[10px] flex items-center gap-5">
                  Quantity:
                  <input
                    type="number"
                    defaultValue={0}
                    min={0}
                    className="w-10 h-[20px] py-1 border border-gray-300  text-center focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </p>
                <p className="text-[10px] flex items-center gap-9">
                  Total: <span>PHP 1,500</span>{" "}
                </p>
                <button className="cursor-pointer bg-red-400 p-1 text-[9px] rounded-lg hover:bg-red-500 transition hover:text-white ">
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Total Orders and Price */}
          <div className="w-full p-3 flex justify-between">
            <p className="text-[12px]">Total Orders: 10</p>
            <p className="text-[12px]">Total Price: PHP 2,600</p>
          </div>

          <button className="w-full py-2 bg-[#D5A58B] text-black rounded-lg cursor-pointer hover:bg-[#e0b9a4] transition">
            Checkout
          </button>
        </div>
      </div>

      {/* Component for Account Modal in Mobile View If not Autententicated */}
      <div
        className={`bg-[#F6E0D2] border fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-lg sm:invisible transition-all duration-600 ease-in-out transform ${
          isMobileAccOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
      >
        <div className="flex flex-col p-4 gap-3 items-center min-w-[20rem]">
          {/* Close Button */}
          <button
            className="cursor-pointer self-end"
            onClick={() => setIsMobileAccOpen(false)}
          >
            <img src={closeLogo} className="w-[1.5rem]" alt="Close" />
          </button>

          <h2 className="text-xl font-bold">Hi there!</h2>
          <p>Is it your first time on our website?</p>

          {/* Toggle Buttons */}
          <div className="flex  w-full justify-center">
            <button
              className={`px-4 py-2 rounded-tl-lg ${
                activeTab === "signup" ? "bg-[#D5A58B]" : "bg-[#F6E0D2] border"
              }`}
              onClick={() => setActiveTab("signup")}
            >
              Yes, sign me up
            </button>
            <button
              className={`px-4 py-2  rounded-tr-lg ${
                activeTab === "login" ? "bg-[#D5A58B]" : "bg-[#F6E0D2] border"
              }`}
              onClick={() => setActiveTab("login")}
            >
              No, log me in
            </button>
          </div>

          {/* Sign Up Form */}
          {activeTab === "signup" && (
            <form
              className="flex flex-col gap-2 w-full mt-4"
              onSubmit={handleSignup}
            >
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={(e) => handleChange(e, "signup")}
                required
                className="p-2 border rounded-md"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={(e) => handleChange(e, "signup")}
                required
                className="p-2 border rounded-md"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => handleChange(e, "signup")}
                required
                className="p-2 border rounded-md"
              />
              <button
                className="bg-[#D5A58B] py-2 rounded-md cursor-pointer hover:bg-[#e0b9a4] transition"
                type="button"
                onClick={() => requestOtp("signup")}
                disabled={signupTimer > 0}
              >
                {signupTimer > 0 ? `Resend in ${signupTimer}s` : "Send OTP"}
              </button>
              <input
                type="text"
                name="otp"
                placeholder="OTP"
                onChange={(e) => handleChange(e, "signup")}
                required
                className="p-2 border rounded-md"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => handleChange(e, "signup")}
                required
                className="p-2 border rounded-md"
              />
              <button
                type="submit"
                className="bg-[#D5A58B] py-2 rounded-md cursor-pointer hover:bg-[#e0b9a4] transition"
              >
                Sign Up
              </button>
            </form>
          )}

          {/* Log In Form */}
          {activeTab === "login" && (
            <form
              className="flex flex-col gap-2 w-full mt-4"
              onSubmit={handleLogin}
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => handleChange(e, "login")}
                required
                className="p-2 border rounded-md"
              />
              <button
                className="bg-[#D5A58B] py-2 rounded-md cursor-pointer hover:bg-[#e0b9a4] transition"
                type="button"
                onClick={() => requestOtp("login")}
                disabled={loginTimer > 0}
              >
                {loginTimer > 0 ? `Resend in ${loginTimer}s` : "Send OTP"}
              </button>
              <input
                type="text"
                name="otp"
                placeholder="OTP"
                onChange={(e) => handleChange(e, "login")}
                required
                className="p-2 border rounded-md"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => handleChange(e, "login")}
                required
                className="p-2 border rounded-md"
              />
              <button
                type="submit"
                className="bg-[#D5A58B] py-2 rounded-md cursor-pointer hover:bg-[#e0b9a4] transition"
              >
                Log In
              </button>
              <button
                className="text-sm text-gray-500"
                onClick={() => setActiveTab("reset")}
              >
                Forgot Password?
              </button>
            </form>
          )}

          {/* Reset Password Form */}
          {activeTab === "reset" && (
            <form
              className="flex flex-col gap-2 w-full mt-4"
              onSubmit={handleReset}
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => handleChange(e, "reset")}
                required
                className="p-2 border rounded-md"
              />
              <button
                className="bg-[#D5A58B] py-2 rounded-md cursor-pointer hover:bg-[#e0b9a4] transition"
                type="button"
                onClick={() => requestOtp("reset")}
                disabled={resetTimer > 0}
              >
                {resetTimer > 0 ? `Resend in ${resetTimer}s` : "Send OTP"}
              </button>
              <input
                type="text"
                name="otp"
                placeholder="OTP"
                onChange={(e) => handleChange(e, "reset")}
                required
                className="p-2 border rounded-md"
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                onChange={(e) => handleChange(e, "reset")}
                required
                className="p-2 border rounded-md"
              />
              <button
                type="submit"
                className="bg-[#D5A58B] py-2 rounded-md cursor-pointer hover:bg-[#e0b9a4] transition"
              >
                Reset Password
              </button>
              <button
                className="text-sm text-gray-500"
                onClick={() => setActiveTab("login")}
              >
                Go Back to Log In
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Component for Account Modal in Mobile if Authenticated*/}
      {isAutenticatedModalOpen && (
        <div
          className={`bg-[#F6E0D2] border absolute top-full right-0 mt-2 shadow-lg rounded-lg  ${
            isAutenticatedModalOpen ? "visible" : "invisible"
          }`}
        >
          <div className="w-[auto] flex flex-col p-1 gap-2 items-center h-full m-[1rem]">
            {/* Close Button */}
            <button
              className="cursor-pointer self-end mb-4"
              onClick={() => setIsAutenticatedModalOpen(false)}
            >
              <img src={closeLogo} className="w-[1.5rem]" alt="Close" />
            </button>

            <div className="flex items-center gap-4">
              <img src={sampleIcon} className="w-[3rem] rounded-full border" />
              <div>
                <p className="font-semibold text-[10px]">
                  {userData
                    ? `${userData.first_name} ${userData.last_name}`
                    : "Guest"}
                </p>
                <p className="text-[8px]">
                  {userData ? userData.email : "No Email"}
                </p>
              </div>
            </div>
            <div className="border w-full">
              <ul className="flex flex-col gap-1 p-1">
                <li className="flex gap-3 text-[12px] cursor-pointer p-1">
                  <img
                    src={sampleIcon}
                    className="w-[1.5rem] rounded-full border"
                  />
                  Personal Details
                </li>
                <li className="flex gap-3 text-[12px] cursor-pointer p-1">
                  <img
                    src={sampleIcon}
                    className="w-[1.5rem] rounded-full border"
                  />
                  Orders
                </li>
                <li className="flex gap-3 text-[12px] cursor-pointer p-1">
                  <img
                    src={sampleIcon}
                    className="w-[1.5rem] rounded-full border"
                  />
                  Notifications
                </li>
                <li className="flex gap-3 text-[12px] cursor-pointer p-1">
                  <img
                    src={sampleIcon}
                    className="w-[1.5rem] rounded-full border"
                  />
                  Feedbacks
                </li>
              </ul>
            </div>
            <button
              className="w-full cursor-pointer hover:text-red-400"
              onClick={handleLogout}
            >
              Sign Out
            </button>
            {isAuthenticated && (
              <div className="absolute top-4 right-4 bg-gray-200 px-3 py-1 rounded">
                <p className="text-sm font-semibold">
                  Inactivity Timer:{" "}
                  <span className="text-red-500">
                    {showSessionWarning
                      ? "Paused (Session Expiring!)"
                      : `${sessionTimer}s`}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Warning Modal: Only visible when authenticated */}
      {isAuthenticated && showSessionWarning && (
        <div
          className={`bg-[#F6E0D2] border fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-lg transition-all duration-600 ease-in-out transform ${
            showSessionWarning
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-95 invisible"
          }`}
        >
          <div className="p-6 text-center w-[20rem]">
            <h2 className="text-lg font-semibold text-gray-800">
              Session Expiring
            </h2>
            <p className="text-gray-700 mt-2">
              Your session will expire in{" "}
              <span className="text-red-500 font-bold">{warningTimer}s</span>
            </p>
            <div className="flex justify-center gap-4 mt-4">
              {/* The Stay Logged In button forces a timer reset */}
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                onClick={() => resetTimers(true)}
              >
                Stay Logged In
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
