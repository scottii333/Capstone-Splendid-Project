import { Outlet } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
export const App = () => (
  <div className=" bg-red-300 p-[1rem]  ">
    <Navbar />
    <div className="min-h-screen">
      <Outlet />
    </div>
  </div>
);
