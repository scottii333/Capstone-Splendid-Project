import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";
import { Home } from "./Pages/Home.jsx";
import { Journey } from "./Pages/Journey.jsx";
import { Showroom } from "./Pages/Showroom.jsx";
import { Collections } from "./Pages/Collections.jsx";
import { Error } from "./Components/Error.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AdminAuth } from "./Admin/AdminAuth.jsx";
import { AdminDashBoard } from "./Admin/AdminDashBoard.jsx";
import { AdminIndex } from "./Admin/AdminIndex.jsx";
import { AdminProducts } from "./Admin/AdminProducts.jsx";
import { AdminOrders } from "./Admin/AdminOrders.jsx";
import { AdminShipping } from "./Admin/AdminShipping.jsx";
import { AdminMessages } from "./Admin/AdminMessages.jsx";
import { AdminNewProd } from "./Admin/AdminNewProd.jsx";
import { AdminViewProd } from "./Admin/AdminViewProd.jsx";
import { AdminPrevProd } from "./Admin/AdminPrevProd.jsx";
import { AllProduct } from "./Components/AllProduct.jsx";
import { NewArrivals } from "./Components/NewArrivals.jsx";
import { TopChoice } from "./Components/TopChoice.jsx";
import { AuthProvider } from "./context/authProvider.jsx";

const router = createBrowserRouter([
  // This is the Main Landing Page Routes
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,

    children: [
      { index: true, element: <Home /> },
      {
        path: "Collections-Splendid",
        element: <Collections />,
        children: [
          {
            index: true,
            element: <AllProduct />,
          },
          {
            path: "New-Arrivals",
            element: <NewArrivals />,
          },
          {
            path: "Top-Choice",
            element: <TopChoice />,
          },
        ],
      },
      { path: "Showroom-Splendid", element: <Showroom /> },
      { path: "Journey-Splendid", element: <Journey /> },
    ],
  },

  // This is the Admin Auth Page Routes
  {
    path: "/Admin-Authentication-Splendid",
    element: <AdminAuth />,
    errorElement: <Error />,
  },

  // This is the Admin Dashboard Page Routes
  {
    path: "/Admin-Dashboard-Splendid",
    element: <AdminDashBoard />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <AdminIndex />,
      },
      {
        path: "Products",
        element: <AdminProducts />,
        children: [
          { index: true, element: <AdminNewProd /> },
          { path: "New-Product", element: <AdminNewProd /> },
          {
            path: "Product-Preview",
            element: <AdminPrevProd />,
          },
          {
            path: "View-Products",
            element: <AdminViewProd />,
          },
        ],
      },
      {
        path: "Orders",
        element: <AdminOrders />,
      },
      {
        path: "Shipping",
        element: <AdminShipping />,
      },
      {
        path: "Messages",
        element: <AdminMessages />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
