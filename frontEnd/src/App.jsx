import { Outlet } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
export const App = () => (
  <div className=" bg-red-300 p-[1rem] min-h-[500dvh]   ">
    <div className="sticky top-0.5 z-50">
      <Navbar />
    </div>
    <div className="min-h-screen">
      <Outlet />
    </div>
  </div>
);
