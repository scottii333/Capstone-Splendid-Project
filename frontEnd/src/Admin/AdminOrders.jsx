import { useState } from "react";
import accLogo from "../Images/accLogo.png";
import notifLogo from "../Images/notifLogo.png";
import notifXLogo from "../Images/closeBtn.png";
import HoodieImg from "../Images/HoodieProd.png"; // Sample product image

export const AdminOrders = () => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isAccOpen, setIsAccOpen] = useState(false);

  const toggleAccModal = () => setIsAccOpen((prev) => !prev);
  const toggleNotifModal = () => setIsNotifOpen((prev) => !prev);

  // Sample orders data
  const orders = [
    {
      id: "0200319",
      name: "Splendid Ivory",
      quantity: 2,
      status: "Pending",
      statusColor: "bg-green-200 text-green-700",
    },
    {
      id: "0200319",
      name: "Splendid Ivory",
      quantity: 1,
      status: "To ship",
      statusColor: "bg-yellow-200 text-yellow-700",
    },
    {
      id: "0200319",
      name: "Splendid Ivory",
      quantity: 1,
      status: "Delivery",
      statusColor: "bg-blue-200 text-blue-700",
    },
    {
      id: "0200319",
      name: "Splendid Ivory",
      quantity: 1,
      status: "Cancelled",
      statusColor: "bg-red-200 text-red-700",
    },
  ];

  return (
    <div className=" min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Orders</h1>

        {/* Notifications & Account Icons */}
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

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search"
          className="p-2 border rounded-md w-full md:max-w-md"
        />
        <button className="p-2 bg-white border rounded-md flex items-center gap-2">
          ⚙️ Filter
        </button>
        <select className="p-2 border rounded-md">
          <option>Order Status</option>
          <option>Pending</option>
          <option>To Ship</option>
          <option>Delivery</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Orders & Customer Info Container */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Orders Table */}
        <div className="bg-white rounded-lg p-4 w-full md:w-2/3">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Order #</th>
                <th className="text-left py-2">Item</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4">{order.id}</td>
                  <td className="flex items-center gap-2 py-4">
                    <img
                      src={HoodieImg}
                      alt="Product"
                      className="w-12 h-12 rounded-lg border"
                    />
                    <span className="font-semibold">{order.name}</span>
                  </td>
                  <td className="text-center py-4">{order.quantity}</td>
                  <td className="text-center py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${order.statusColor}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Customer Info & Order Summary */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg flex flex-col gap-6">
          {/* Customer Info */}
          <div>
            <h3 className="font-semibold text-lg">Customer</h3>
            <div className="bg-[#f8dfc6] rounded-lg p-4">
              <p className="font-semibold">Janeille Trixie DeLeon</p>
              <p className="text-sm text-gray-600">janeilletrixie@gmail.com</p>
              <p className="text-sm text-gray-600">+639917622623</p>
              <hr className="w-full my-2" />
              <p className="text-sm font-semibold">Shipping address</p>
              <p className="text-sm text-gray-600">
                Metro Manila, Caloocan City, Brgy. 167, B4L5 Alley 3 Villa
                Reform
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h3 className="font-semibold text-lg">Order Summary</h3>
            <div className="bg-[#f8dfc6] rounded-lg p-4">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>₱2,550</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery</p>
                <p>₱80</p>
              </div>
              <div className="flex justify-between font-semibold">
                <p>Total</p>
                <p>₱2,630</p>
              </div>
            </div>
          </div>

          {/* Confirm Order */}
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              placeholder="Enter Reference ID"
              className="text-[0.8rem] p-2 border rounded-md w-[8rem] md:w-[8rem]"
            />
            <button className="bg-orange-400 text-white px-4 py-2 rounded-md">
              Notify Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
