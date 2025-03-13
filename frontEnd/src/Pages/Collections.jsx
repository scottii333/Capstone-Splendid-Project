import { NavLink, Outlet } from "react-router-dom";

export const Collections = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center p-1 gap-10">
      <h1 className="font-bold text-[28px] mt-[5rem]">
        Oversized Hoodies are Goodies
      </h1>

      <ul className="flex justify-around min-w-[20rem] p-2">
        <li className="p-2">
          <NavLink
            to="/Collections-Splendid"
            end
            className={({ isActive }) =>
              `px-2 py-1 ${isActive ? "font-bold text-black" : "text-gray-600"}`
            }
          >
            All
          </NavLink>
        </li>
        <li className="p-2">
          <NavLink
            to="/Collections-Splendid/New-Arrivals"
            className={({ isActive }) =>
              `px-2 py-1 ${isActive ? "font-bold text-black" : "text-gray-600"}`
            }
          >
            New Arrivals
          </NavLink>
        </li>
        <li className="p-2">
          <NavLink
            to="/Collections-Splendid/Top-Choice"
            className={({ isActive }) =>
              `px-2 py-1  ${
                isActive ? "font-bold text-black" : "text-gray-600"
              }`
            }
          >
            Top choice
          </NavLink>
        </li>
      </ul>

      <div className=" w-full min-h-[30rem] p-2 ">
        <Outlet />
      </div>
    </div>
  );
};
