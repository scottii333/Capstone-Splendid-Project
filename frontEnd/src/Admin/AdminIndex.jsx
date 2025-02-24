import accLogo from "../Images/accLogo.png";
import notifLogo from "../Images/notifLogo.png";
import hoodieProd from "../Images/HoodieProd.png";
import { SalesPieChart } from "./SalesPieChart";

export const AdminIndex = () => {
  return (
    <div className="flex flex-col gap-2 p-[1rem]  ">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-bold">Overview</h1>

        {/* div for notif and acc */}
        <div className="flex gap-[1rem]">
          <img src={notifLogo} className="w-[2rem] h-[2rem]" />
          <img src={accLogo} className="w-[2rem] h-[2rem]" />
        </div>
      </div>

      {/* Div for Top Selling Products/ Pending and Deliver Status */}
      <div className=" flex justify-center gap-2 flex-wrap ">
        <div className="bg-white w-[20rem] h-[20rem] rounded-lg p-[1rem] text-center sm:flex sm:flex-col gap-2  ">
          <h2 className="text-[1.2rem] ">Top Selling Products ⭐⭐⭐ </h2>

          <div className=" border overflow-y-scroll scrollbar-hidden  flex flex-col gap-2 p-2 h-[15rem]">
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

        <div className="bg-white w-[20rem] h-[20rem] rounded-lg p-[1rem] text-center flex flex-col gap-2 ">
          <h2 className="text-[1.2rem] ">Pending Orders🛒</h2>
          <div className="border h-full"></div>
          <button className="text-right cursor-pointer ">View All</button>
        </div>

        <div className="bg-white w-[20rem] h-[20rem] rounded-lg p-[1rem] text-center flex flex-col gap-2 ">
          <h2 className="text-[1.2rem] ">Delivered Orders🚚</h2>
          <div className="border flex gap-5 p-[2rem] justify-center flex-wrap ">
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
        <div className="bg-white w-[20rem] md:w-[30rem] h-[20rem] rounded-lg p-[1rem] text-center  ">
          <h2 className="text-[1.2rem] ">Total Sales📈 </h2>
          <SalesPieChart />
        </div>

        {/* Transaction History */}
        <div className="bg-white w-[20rem] md:w-[30rem] h-[20rem] rounded-lg p-[1rem] text-center flex flex-col gap-2 ">
          <h2 className="text-[1.2rem] ">Transaction History📜 </h2>
          <div className="border p-2 overflow-y-scroll scrollbar-hidden flex flex-col gap-2 items-center justify-center h-[15rem]">
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
