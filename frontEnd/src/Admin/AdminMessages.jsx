import { useState } from "react";
import accLogo from "../Images/accLogo.png";
import notifLogo from "../Images/notifLogo.png";
import notifXLogo from "../Images/closeBtn.png";
import CustomerLogo from "../Images/CustomerLogo.png";

export const AdminMessages = () => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isAccOpen, setIsAccOpen] = useState(false);

  const toggleAccModal = () => setIsAccOpen((prev) => !prev);
  const toggleNotifModal = () => setIsNotifOpen((prev) => !prev);

  // Function to render stars
  const renderStars = (rating) => {
    return "⭐".repeat(rating);
  };

  return (
    <div className="min-h-screen p-6">
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

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="text-black">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Customer
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Rating
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Item
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Feedback
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array(4)
              .fill({
                customer: "Melanie Forneste",
                rating: 5,
                item: "1x Splendid Ivory\n2x Splendid Midnight",
                feedback:
                  "Excellent quality! Beautiful!❤️ Very Good seller!❤️ Shining, Shimmering, SPLENDID❤️",
              })
              .map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 transition-all duration-200"
                >
                  {/* Customer */}
                  <td className="py-4 px-4 flex items-center gap-2 text-gray-700 text-sm">
                    <img
                      src={CustomerLogo}
                      alt="User"
                      className="w-8 h-8 rounded-full"
                    />
                    {item.customer}
                  </td>

                  {/* Rating */}
                  <td className="py-4 px-4 text-yellow-500 text-sm">
                    {renderStars(item.rating)}
                  </td>

                  {/* Item */}
                  <td className="py-4 px-4 text-gray-700 text-sm whitespace-pre-wrap">
                    {item.item}
                  </td>

                  {/* Feedback */}
                  <td className="py-4 px-4 text-gray-700 text-sm">
                    {item.feedback}
                  </td>

                  {/* Action */}
                  <td className="py-4 px-4">
                    <button
                      className="bg-[#e2dab4] text-gray-800 px-4 py-2 rounded-lg text-sm shadow-md hover:bg-[#fcc190] transition-all duration-200"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #e2dab4, #fcc190)",
                      }}
                    >
                      Post to page
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
