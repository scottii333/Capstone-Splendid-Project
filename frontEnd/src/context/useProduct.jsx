// src/context/useProducts.js
import { useContext } from "react";
import { ProductContext } from "./productContext.jsx"; // ✅ Correct Import

export const useProducts = () => {
  return useContext(ProductContext);
};
