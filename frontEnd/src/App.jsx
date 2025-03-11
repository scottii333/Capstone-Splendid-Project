import { Outlet } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
export const App = () => (
  <div className=" bg-white p-[1rem] min-h-[100dvh]   ">
    <div className="sticky top-0.5 z-50 rounded-t-lg">
      <Navbar />
    </div>
    <div className="min-h-screen">
      <Outlet />
    </div>
  </div>
);
