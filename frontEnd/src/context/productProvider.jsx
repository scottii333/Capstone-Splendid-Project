// src/context/ProductProvider.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ProductContext } from "./productContext.jsx"; // ✅ Import ProductContext

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/publishedProduct/fetch"
      );
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  return (
    <ProductContext.Provider value={{ products, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// PropTypes validation
ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
