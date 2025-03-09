import accLogo from "../Images/accLogo.png";
import notifLogo from "../Images/notifLogo.png";
import notifXLogo from "../Images/closeBtn.png";
import hoodieProd from "../Images/HoodieProd.png";
import { SalesBarChart } from "./SalesPieChart";
import { useState } from "react";

export const AdminIndex = () => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isAccOpen, setIsAccOpen] = useState(false);

  const toggleAccModal = () => {
    setIsAccOpen((prev) => !prev); // Toggle modal state
  };

  const toggleNotifModal = () => {
    setIsNotifOpen((prev) => !prev); // Toggle modal state
  };

  return (
    <div className="flex flex-col gap-2 p-[1rem]  ">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-bold">Overview</h1>

        {/* div for notif and acc */}
        <div className="flex gap-[1rem]">
          <img
            src={isNotifOpen ? notifXLogo : notifLogo}
            className="w-[2rem] h-[2rem]"
            onClick={toggleNotifModal}
          />
          <div className="relative">
            {/* Notification Modal */}
            {isNotifOpen && (
              <div className="absolute  top-[3rem] right-0 bg-white border shadow-lg rounded-lg w-[15rem] p-4 z-10">
                <h3 className="font-semibold text-lg mb-2">Notifications 🔔</h3>
                <ul className="flex flex-col gap-2 max-h-[10rem] overflow-y-auto">
                  <li className="text-sm border-b pb-1">
                    Order #0200119 has been shipped.
                  </li>
                  <li className="text-sm border-b pb-1">
                    Refund processed for #0200129.
                  </li>
                  <li className="text-sm border-b pb-1">
                    New order placed: #0200150.
                  </li>
                  <li className="text-sm border-b pb-1">
                    Promotion starts tomorrow!
                  </li>
                  <li className="text-sm">System maintenance on 03/05/2025.</li>
                </ul>
              </div>
            )}
          </div>
          <img
            src={isAccOpen ? notifXLogo : accLogo}
            className="w-[2rem] h-[2rem]"
            onClick={toggleAccModal}
          />

          <div className="relative">
            {/* Account Modal */}
            {isAccOpen && (
              <div className="absolute  top-[3rem] right-0 bg-white border shadow-lg rounded-lg w-[15rem] h-[10rem] p-4 z-10 flex justify-center items-center ">
                LogOut
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Div for Top Selling Products/ Pending and Deliver Status */}
      <div className=" flex justify-center gap-2 flex-wrap ">
        <div className="bg-white w-full sm:w-[20rem] h-[20rem] rounded-lg p-[1rem] text-center sm:flex sm:flex-col gap-2 shadow-lg  ">
          <h2 className="text-[1.2rem] ">Top Selling Products ⭐⭐⭐ </h2>

          <div className=" overflow-y-scroll scrollbar-hidden  flex flex-col gap-2 p-2 h-[15rem]">
            {/* Sample Top sellinn prod Output */}
            <div className="flex gap-2 items-center  justify-center p-2">
              <img src={hoodieProd} className="w-[8rem]" />
              <div className="text-left">
                <h3>Splendid Ivory</h3>
                <h4>Total orders:</h4>
                <p>310</p>
              </div>
            </div>

            {/* Sample Top sellinn prod Output */}
            <div className="flex gap-2 items-center  justify-center p-2">
              <img src={hoodieProd} className="w-[8rem]" />
              <div className="text-left">
                <h3>Splendid Ivory</h3>
                <h4>Total orders:</h4>
                <p>310</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white w-full sm:w-[20rem] h-[20rem] rounded-lg p-[1rem] text-center flex flex-col gap-2 shadow-lg">
          <h2 className="text-[1.2rem] ">Pending Orders🛒</h2>
          <div className=" h-full"></div>
          <button className="text-right cursor-pointer ">View All</button>
        </div>

        <div className="bg-white w-full sm:w-[20rem] h-[20rem] rounded-lg p-[1rem] text-center flex flex-col gap-2 shadow-lg ">
          <h2 className="text-[1.2rem] ">Delivered Orders🚚</h2>
          <div className=" flex gap-5 p-[2rem] justify-center flex-wrap ">
            <div>
              <h2 className="text-2xl font-bold">3</h2>
              <p>Pending</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">1</h2>
              <p>To Ship</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">15</h2>
              <p>Delivery</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">35</h2>
              <p>Completed</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">0</h2>
              <p>Refund</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 flex-wrap">
        {/* diplayed graph for total sales */}
        <div className="bg-white w-full sm:w-[25rem] md:w-[30rem] lg:w-[35rem] h-auto rounded-lg p-4 text-center shadow-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Total Sales 📈
          </h2>
          <SalesBarChart />
        </div>
        {/* Transaction History */}
        <div className="bg-white w-full sm:w-[20rem] md:w-[30rem] h-[25rem] rounded-lg p-[1rem] text-center flex flex-col gap-2  shadow-lg ">
          <h2 className="text-[1.2rem] ">Transaction History📜 </h2>
          <div className="p-2 overflow-y-scroll scrollbar-hidden flex flex-col gap-2 items-center justify-center h-[15rem]">
            <div className="flex gap-5 items-center justify-center w-auto">
              <img src={hoodieProd} className="w-[8rem]" />
              <p>0200119</p>
              <p>09/01/2025</p>
              <p>Completed</p>
            </div>
            <div className="flex gap-5 items-center justify-center w-auto">
              <img src={hoodieProd} className="w-[8rem]" />
              <p>0200129</p>
              <p>03/01/2025</p>
              <p>Refund</p>
            </div>
          </div>
          <button className="text-right cursor-pointer ">View All</button>
        </div>
      </div>
    </div>
  );
};
