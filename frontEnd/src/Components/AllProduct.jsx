import { useEffect, useState } from "react";
import { useProducts } from "../context/useProduct.jsx"; // Import the custom hook

export const AllProduct = () => {
  const { products, fetchProducts } = useProducts(); // Use the custom hook to get products and the fetch function
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch products when the component mounts
    fetchProducts();

    // Simulate a 2-second loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timeout when the component is unmounted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-auto p-[2rem] flex justify-center items-center gap-[2rem] flex-wrap">
      {loading ? (
        <p className="text-center text-lg font-bold">Loading All products...</p> // Show loading message
      ) : products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="w-[15rem] flex flex-col rounded-lg text-start shadow-lg"
          >
            {/* ✅ Construct Full Image URL */}
            <img
              src={`http://localhost:3000${product.product_image}`}
              className="rounded-t-lg w-full"
              alt={product.name}
            />
            <p className="p-2 font-bold">{product.name}</p>
            <div className="flex justify-between p-2">
              <p>{product.category}</p>
              <p>PHP {product.price}</p>
            </div>
            <button className="bg-[#F7E5D1] m-2 rounded-lg p-1 cursor-pointer hover:bg-[#efc493] hover:text-white">
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <p className="text-center w-full">No products available</p>
      )}
    </div>
  );
};
