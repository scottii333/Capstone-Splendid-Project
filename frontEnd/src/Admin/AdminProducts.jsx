import { Link, Outlet } from "react-router-dom";

export const AdminProducts = () => {
  return (
    <div className="border h-full w-full p-[1rem]">
      <div className=" flex justify-between p-[1rem]">
        <ul className="flex gap-[3rem]">
          <li>
            <Link to="/Admin-Dashboard-Splendid/Products/New-Product">
              Add new Products
            </Link>
          </li>
          <li>
            <Link to="/Admin-Dashboard-Splendid/Products/Product-Preview">
              Product Preview
            </Link>
          </li>
          <li>
            <Link to="/Admin-Dashboard-Splendid/Products/View-Products">
              View Products
            </Link>
          </li>
        </ul>
      </div>
      <div className="border min-h-[100vh]  w-full">
        <Outlet />
      </div>
    </div>
  );
};
