import { NavLink, Outlet, useLocation } from "react-router-dom";

export const AdminProducts = () => {
  const location = useLocation(); // Get the current route

  return (
    <div className="border h-full w-full p-[1rem]">
      <div className="flex justify-between p-[1rem]">
        <ul className="flex gap-[3rem]">
          <li>
            <NavLink
              to="/Admin-Dashboard-Splendid/Products/New-Product"
              className={({ isActive }) =>
                isActive ||
                location.pathname === "/Admin-Dashboard-Splendid/Products"
                  ? "font-bold text-black"
                  : "text-gray-600"
              }
            >
              Add new Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Admin-Dashboard-Splendid/Products/Product-Preview"
              className={({ isActive }) =>
                isActive ? "font-bold text-black" : "text-gray-600"
              }
            >
              Product Preview
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Admin-Dashboard-Splendid/Products/View-Products"
              className={({ isActive }) =>
                isActive ? "font-bold text-black" : "text-gray-600"
              }
            >
              View Products
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="border min-h-[100vh] w-full">
        <Outlet />
      </div>
    </div>
  );
};
