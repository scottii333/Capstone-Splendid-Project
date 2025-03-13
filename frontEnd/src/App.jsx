import { Outlet } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import { ProductProvider } from "./context/productProvider";
export const App = () => (
  <ProductProvider>
    <div className=" bg-white p-[1rem] min-h-[100dvh]   ">
      <div className="sticky top-0.5 z-50 rounded-t-lg">
        <Navbar />
      </div>
      <div className="min-h-screen">
        <Outlet />
      </div>

      <div className="w-full rounded-b-lg ">
        <Footer />
      </div>
    </div>
  </ProductProvider>
);
