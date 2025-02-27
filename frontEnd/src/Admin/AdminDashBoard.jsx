import brandLogo from "../Images/brandLogo.png";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import dashBoardLogo from "../Images/dashboardLogo.png";
import productsLogo from "../Images/productsLogo.png";
import cartLogo from "../Images/cartLogo.png";
import shippingLogo from "../Images/shippingLogo.png";
import messagesLogo from "../Images/messagesLogo.png";

export const AdminDashBoard = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="[background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)] w-full h-auto p-[0.3rem] flex gap-[1rem] flex-col sm:flex-row sm:min-h-screen ">
      <nav className="hidden sm:block w-[20rem] h-auto bg-white rounded-lg flex-col items-center p-[1rem] ">
        <img src={brandLogo} className="w-[10rem] h-[3rem] mt-[2rem]" />

        <div className="w-full h-[2px] mt-[2rem] [background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)] "></div>

        <ul className="flex flex-col gap-[2rem] mt-[1rem] w-full text-center">
          <li>
            <Link
              to="/Admin-Dashboard-Splendid"
              className="flex gap-[0.5rem] items-center justify-center p-[1rem] rounded-lg hover:[background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
            >
              <img src={dashBoardLogo} className="w-[2rem] h-[2rem]" />
              <p>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link
              to="/Admin-Dashboard-Splendid/Products"
              className="flex gap-[0.5rem] items-center justify-center p-[1rem] rounded-lg hover:[background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
            >
              <img src={productsLogo} className="w-[2rem] h-[2rem]" />
              <p>Products</p>
            </Link>
          </li>
          <li>
            <Link
              to="/Admin-Dashboard-Splendid/Orders"
              className="flex gap-[0.5rem] items-center justify-center p-[1rem] rounded-lg hover:[background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
            >
              <img src={cartLogo} className="w-[2rem] h-[2rem]" />
              <p>Orders</p>
            </Link>
          </li>
          <li>
            <Link
              to="/Admin-Dashboard-Splendid/Shipping"
              className="flex gap-[0.5rem] items-center justify-center p-[1rem] rounded-lg hover:[background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
            >
              <img src={shippingLogo} className="w-[2rem] h-[2rem]" />
              <p>Shipping</p>
            </Link>
          </li>
          <li>
            <Link
              to="/Admin-Dashboard-Splendid/Messages"
              className="flex gap-[0.5rem] items-center justify-center p-[1rem] rounded-lg hover:[background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
            >
              <img src={messagesLogo} className="w-[2rem] h-[2rem]" />
              <p>Messages</p>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile nav */}
      <nav className="bg-white/30 backdrop-blur-sm  sticky top-1  flex justify-between items-center h-16 px-4 md:px-8  w-full sm:hidden rounded-lg ">
        {/* Logo */}
        <img src={brandLogo} className="w-[5rem] h-[2rem] " />

        {/* Hamburger Button */}
        <div className="md:hidden">
          <button
            className="flex flex-col justify-between w-8 h-6 cursor-pointer focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={`block h-1 w-full bg-black rounded transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            ></span>
            <span
              className={`block h-1 w-full bg-black rounded transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block h-1 w-full bg-black rounded transition-transform duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Dropdown Menu (visible when hamburger is toggled on small screens) */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-white/90 backdrop-blur-3xl shadow-md flex flex-col items-center space-y-4 py-4 md:hidden">
            <ul className="flex flex-col gap-[2rem] mt-[1rem] w-full text-center">
              <li>
                <Link
                  to="/Admin-Dashboard-Splendid"
                  onClick={() => setIsOpen(false)}
                  className="flex gap-[0.5rem] items-center justify-center p-[1rem] rounded-lg hover:[background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
                >
                  <img src={dashBoardLogo} className="w-[2rem] h-[2rem]" />
                  <p>Dashboard</p>
                </Link>
              </li>
              <li>
                <Link
                  to="/Admin-Dashboard-Splendid/Products"
                  onClick={() => setIsOpen(false)}
                  className="flex gap-[0.5rem] items-center justify-center p-[1rem] rounded-lg hover:[background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
                >
                  <img src={productsLogo} className="w-[2rem] h-[2rem]" />
                  <p>Products</p>
                </Link>
              </li>
              <li>
                <Link
                  to="/Admin-Dashboard-Splendid/Orders"
                  onClick={() => setIsOpen(false)}
                  className="flex gap-[0.5rem] items-center justify-center p-[1rem] rounded-lg hover:[background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
                >
                  <img src={cartLogo} className="w-[2rem] h-[2rem]" />
                  <p>Orders</p>
                </Link>
              </li>
              <li>
                <Link
                  to="/Admin-Dashboard-Splendid/Shipping"
                  onClick={() => setIsOpen(false)}
                  className="flex gap-[0.5rem] items-center justify-center p-[1rem] rounded-lg hover:[background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
                >
                  <img src={shippingLogo} className="w-[2rem] h-[2rem]" />
                  <p>Shipping</p>
                </Link>
              </li>
              <li>
                <Link
                  to="/Admin-Dashboard-Splendid/Messages"
                  onClick={() => setIsOpen(false)}
                  className="flex gap-[0.5rem] items-center justify-center p-[1rem] rounded-lg hover:[background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)]"
                >
                  <img src={messagesLogo} className="w-[2rem] h-[2rem]" />
                  <p>Messages</p>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      <main className="w-full  ">
        <Outlet />
      </main>
    </div>
  );
};
