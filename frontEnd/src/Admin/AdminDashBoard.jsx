import brandLogo from "../Images/brandLogo.png";
import { Link } from "react-router-dom";
import dashBoardLogo from "../Images/dashboardLogo.png";
import productsLogo from "../Images/productsLogo.png";
import cartLogo from "../Images/cartLogo.png";
import shippingLogo from "../Images/shippingLogo.png";
import messagesLogo from "../Images/messagesLogo.png";
import { Outlet } from "react-router-dom";

export const AdminDashBoard = () => {
  return (
    <div className="[background-image:linear-gradient(to_right,_#e2dab4,_#fcc190)] w-full h-auto p-[0.3rem] flex gap-[1rem]">
      <nav className="w-[20rem] h-screen bg-white rounded-lg flex flex-col items-center p-[1rem] ">
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
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};
