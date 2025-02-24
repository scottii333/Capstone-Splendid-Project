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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
