import { Link } from "react-router-dom";
import cartLogo from "../Images/cartLogo.png";
import mainLogo from "../Images/brandLogo.png";
import accountLogo from "../Images/accLogo.png";
import closeLogo from "../Images/closeBtn.png";
import { useState } from "react";

export const Navbar = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isMobileAccOpen, setIsMobileAccOpen] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [isDesktopCartOpen, setIsDesktopCartOpen] = useState(false);
  const [isDesktopAccOpen, setIsDesktopAccOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  return (
    <nav className="w-full h-[4rem] rounded-t-lg bg-[#F6E0D2] shadow-xl flex justify-between items-center p-2">
      <div className="w-[5rem]">
        <img src={mainLogo} className="w-[100%]" />
      </div>

      {/* Component for Links in Desktop View */}
      <ul className="hidden sm:flex gap-4 p-2">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Product-Splendid">Greeting</Link>
        </li>
        <li>
          <Link to="/About-Splendid">About</Link>
        </li>
        <li>
          <Link to="/Contact-Splendid">Contact</Link>
        </li>
      </ul>

      {/* Component for Cart and Login Button in Desktop View */}
      <div className="hidden sm:flex gap-4 p-2  ">
        <button onClick={() => setIsDesktopCartOpen(!isDesktopCartOpen)}>
          <img src={cartLogo} className="w-[2rem] h-[2rem] cursor-pointer" />
        </button>

        {/* Modal for Cart Desktop View */}
        <div className="absolute top-16 "></div>

        <button onClick={() => setIsDesktopAccOpen(!isDesktopAccOpen)}>
          <img src={accountLogo} className="w-[2rem] h-[2rem] cursor-pointer" />
        </button>

        {/* Modal for Account Desktop View */}
        <div className="absolute top-16  "></div>
      </div>

      {/* Component for Design in Mobile View */}
      <div className=" sm:hidden ">
        {/* Hamburger Button */}
        <div className="flex justify-between items-center gap-5 p-2">
          <button>
            <img
              src={cartLogo}
              className="w-[1.5rem] h-[1.5rem] cursor-pointer"
              onClick={() => setIsMobileCartOpen(!isMobileCartOpen)}
            />
          </button>
          <button
            className="flex flex-col justify-between w-8 h-6 cursor-pointer focus:outline-none"
            onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
          >
            <span
              className={`block h-1 w-full bg-black rounded transition-transform duration-300 ${
                isHamburgerOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            ></span>
            <span
              className={`block h-1 w-full bg-black rounded transition-opacity duration-300 ${
                isHamburgerOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block h-1 w-full bg-black rounded transition-transform duration-300 ${
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
              <Link onClick={() => setIsHamburgerOpen(false)} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsHamburgerOpen(false)}
                to="/Product-Splendid"
              >
                Greeting
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsHamburgerOpen(false)}
                to="/About-Splendid"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsHamburgerOpen(false)}
                to="/Contact-Splendid"
              >
                Contact
              </Link>
            </li>
          </ul>
          <div className="flex justify-center mt-4">
            <button>
              <img
                src={accountLogo}
                className="w-[2rem] h-[2rem]"
                onClick={() => setIsMobileAccOpen(!isMobileAccOpen)}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Component for Cart Modal in Mobile View */}
      <div
        className={`bg-white h-[20rem] w-[20rem] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg border sm:invisible ${
          isMobileCartOpen ? "visible" : "invisible"
        }`}
      >
        <button onClick={() => setIsMobileCartOpen(!isMobileCartOpen)}>
          x
        </button>
      </div>

      {/* Component for Account Modal in Mobile View */}
      <div
        className={`bg-[#F6E0D2] border fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-lg sm:invisible ${
          isMobileAccOpen ? "visible" : "invisible"
        }`}
      >
        <div className="flex flex-col p-1 gap-2 items-center h-full m-[1rem]">
          {/* Close Button */}
          <button
            className="cursor-pointer self-end"
            onClick={() => setIsMobileAccOpen(false)}
          >
            <img src={closeLogo} className="w-[1.5rem]" alt="Close" />
          </button>

          {/* Header Text */}
          <div>
            {!isResetPassword ? (
              <p>
                <strong>Hi there!</strong> <br /> Is it your first time on our
                website?
              </p>
            ) : (
              <p>
                <strong>Reset Your Password</strong>
              </p>
            )}
          </div>

          {/* Toggle Buttons for Sign Up / Log In */}
          {!isResetPassword && (
            <div className="flex">
              <button
                onClick={() => setIsSignUpOpen(true)}
                className={`w-[10rem] p-[0.4rem] rounded-tl-lg cursor-pointer ${
                  isSignUpOpen
                    ? "bg-[#D5A58B] text-white text-[15px] z-50"
                    : "bg-none border"
                }`}
              >
                Yes, sign me up
              </button>
              <button
                onClick={() => setIsSignUpOpen(false)}
                className={`w-[10rem] p-[0.4rem] rounded-tr-lg cursor-pointer ${
                  !isSignUpOpen
                    ? "bg-[#D5A58B] text-white text-[15px]"
                    : "bg-none border"
                }`}
              >
                No, log me in
              </button>
            </div>
          )}

          {/* Form Logic */}
          <form className="space-y-4">
            {/* Reset Password Form */}
            {isResetPassword ? (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <button className="cursor-pointer w-full bg-[#D5A58B] p-[0.4rem] rounded-lg hover:bg-[#e0b9a4] transition">
                  Send OTP
                </button>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <button
                  type="submit"
                  className="w-full py-2 mt-2 bg-[#D5A58B] text-black rounded-lg cursor-pointer hover:bg-[#e0b9a4] transition"
                >
                  Reset Password
                </button>
                <p
                  className="text-center text-sm text-gray-500 mt-2 cursor-pointer"
                  onClick={() => setIsResetPassword(false)}
                >
                  Back to Login
                </p>
              </>
            ) : (
              <>
                {isSignUpOpen && (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="First name"
                      className="w-1/2 px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      className="w-1/2 px-3 py-2 border rounded-lg"
                    />
                  </div>
                )}

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <button className="cursor-pointer w-full bg-[#D5A58B] p-[0.4rem] rounded-lg hover:bg-[#e0b9a4] transition">
                  Send OTP
                </button>
                <input
                  type="text"
                  placeholder="OTP"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 border rounded-lg"
                />

                <button
                  type="submit"
                  className="w-full py-2 mt-2 bg-[#D5A58B] text-black rounded-lg cursor-pointer hover:bg-[#e0b9a4] transition"
                >
                  {isSignUpOpen ? "Create Account" : "Log In"}
                </button>

                {!isSignUpOpen && (
                  <p
                    className="text-center text-sm text-gray-500 mt-2 cursor-pointer"
                    onClick={() => setIsResetPassword(true)}
                  >
                    Forgot password?
                  </p>
                )}
              </>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};
