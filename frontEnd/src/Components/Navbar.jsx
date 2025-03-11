import { Link } from "react-router-dom";
import cartLogo from "../Images/cartLogo.png";
import mainLogo from "../Images/brandLogo.png";
import accountLogo from "../Images/accLogo.png";
import closeLogo from "../Images/closeBtn.png";
import { useState } from "react";
import sampleProductImg from "../Images/HoodieProd.png";
import sampleIcon from "../Images/accLogo.png";

export const Navbar = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isMobileAccOpen, setIsMobileAccOpen] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [isDesktopCartOpen, setIsDesktopCartOpen] = useState(false);
  const [isDesktopAccOpen, setIsDesktopAccOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isAutenticatedModalOpen, setIsAutenticatedModalOpen] = useState(false);

  const closeAllModals = () => {
    setIsMobileAccOpen(false);
    setIsMobileCartOpen(false);
    setIsDesktopCartOpen(false);
    setIsDesktopAccOpen(false);
  };

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
                    Color:<p> Ivory</p>
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
                    Total: <p>PHP 1,500</p>{" "}
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
                    Color:<p> Ivory</p>
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
                    Total: <p>PHP 1,500</p>{" "}
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
            closeAllModals();
            setIsDesktopAccOpen(!isDesktopAccOpen);
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
          <div className="flex flex-col p-1 gap-2 items-center h-full m-[1rem]">
            {/* Close Button */}
            <button
              className="cursor-pointer self-end"
              onClick={() => setIsDesktopAccOpen(false)}
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
                  closeAllModals();
                  setIsHamburgerOpen(false);
                  setIsMobileAccOpen(!isMobileAccOpen);
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
                  Color:<p> Ivory</p>
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
                  Total: <p>PHP 1,500</p>{" "}
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
                  Color:<p> Ivory</p>
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
                  Total: <p>PHP 1,500</p>{" "}
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

      {/* Component for Account Modal in Mobile if Authenticated*/}
      <div
        className={`bg-[#F6E0D2] border fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-lg sm:invisible ${
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
              <p className="font-semibold text-[10px]">Angel Scott De Leon</p>
              <p className="text-[8px]">angelscottdeleon@gmail.com</p>
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
          <button className="w-full cursor-pointer hover:text-red-400">
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};
