import { useState } from "react";
import accLogo from "../Images/accLogo.png";
import notifLogo from "../Images/notifLogo.png";
import notifXLogo from "../Images/closeBtn.png";
import CustomerLogo from "../Images/CustomerLogo.png";

export const AdminShipping = () => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isAccOpen, setIsAccOpen] = useState(false);

  const toggleAccModal = () => setIsAccOpen((prev) => !prev);
  const toggleNotifModal = () => setIsNotifOpen((prev) => !prev);

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Shipping</h1>

        {/* Notifications & Account Icons */}
        <div className="flex gap-4">
          <img
            src={isNotifOpen ? notifXLogo : notifLogo}
            className="w-8 h-8 cursor-pointer hover:opacity-80"
            onClick={toggleNotifModal}
            alt="Notifications"
          />
          <div className="relative">
            {isNotifOpen && (
              <div className="absolute top-12 right-0 bg-white border shadow-lg rounded-lg w-60 p-4 z-10">
                <h3 className="font-semibold text-lg mb-2 text-gray-700">
                  Notifications 🔔
                </h3>
                <ul className="flex flex-col gap-2 max-h-40 overflow-y-auto text-gray-600 text-sm">
                  <li className="border-b pb-1">
                    Order #0200119 has been shipped.
                  </li>
                  <li className="border-b pb-1">
                    Refund processed for #0200129.
                  </li>
                  <li className="border-b pb-1">New order placed: #0200150.</li>
                  <li className="border-b pb-1">Promotion starts tomorrow!</li>
                  <li>System maintenance on 03/05/2025.</li>
                </ul>
              </div>
            )}
          </div>

          <img
            src={accLogo}
            className="w-8 h-8 cursor-pointer hover:opacity-80"
            onClick={toggleAccModal}
            alt="Account"
          />
          <div className="relative">
            {isAccOpen && (
              <div className="absolute top-12 right-0 bg-white border shadow-lg rounded-lg w-60 h-24 p-4 z-10 flex justify-center items-center">
                <button className="text-red-600 font-semibold hover:underline">
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modern Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="text-black">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Order #
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Customer
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Reference Number
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Courier
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array(4)
              .fill({
                order: "0200319",
                customer: "Melanie Forneste",
                reference: "JNT123456789012",
                courier: "JNT",
              })
              .map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 transition-all duration-200"
                >
                  <td className="py-4 px-4 text-gray-700 text-sm">
                    {item.order}
                  </td>
                  <td className="py-4 px-4 flex items-center gap-2 text-gray-700 text-sm">
                    <img
                      src={CustomerLogo}
                      alt="User"
                      className="w-8 h-8 rounded-full"
                    />
                    {item.customer}
                  </td>
                  <td className="py-4 px-4 text-gray-700 text-sm">
                    {item.reference}
                  </td>
                  <td className="py-4 px-4 text-gray-700 text-sm">
                    {item.courier}
                  </td>
                  <td className="py-4 px-4">
                    <button
                      className="bg-[#e2dab4] text-gray-800 px-4 py-2 rounded-lg text-sm shadow-md hover:bg-[#fcc190] transition-all duration-200"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #e2dab4, #fcc190)",
                      }}
                    >
                      Notify
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
