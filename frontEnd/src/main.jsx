import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";
import { Home } from "./Pages/Home.jsx";
import { Contact } from "./Pages/Contact.jsx";
import { About } from "./Pages/About.jsx";
import { Products } from "./Pages/Products.jsx";
import { Error } from "./Components/Error.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AdminAuth } from "./Admin/AdminAuth.jsx";
import { AdminDashBoard } from "./Admin/AdminDashBoard.jsx";
import { AdminIndex } from "./Admin/AdminIndex.jsx";
import { AdminProducts } from "./Admin/AdminProducts.jsx";
import { AdminOrders } from "./Admin/AdminOrders.jsx";
import { AdminShipping } from "./Admin/AdminShipping.jsx";
import { AdminMessages } from "./Admin/AdminMessages.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,

    children: [
      { index: true, element: <Home /> },
      { path: "Product-Splendid", element: <Products /> },
      { path: "About-Splendid", element: <About /> },
      { path: "Contact-Splendid", element: <Contact /> },
    ],
  },
  {
    path: "/Admin-Authentication-Splendid",
    element: <AdminAuth />,
    errorElement: <Error />,
  },
  {
    path: "/Admin-Dashboard-Splendid",
    element: <AdminDashBoard />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <AdminIndex />,
      },
      { path: "Products", element: <AdminProducts /> },
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
    <RouterProvider router={router} />
  </StrictMode>
);
