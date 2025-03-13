import { useEffect, useState } from "react";
import { useProducts } from "../context/useProduct.jsx"; // ✅ Import context hook
import sampleImgProd from "../Images/FirstProduct.png"; // Default image

export const TopChoice = () => {
  const { products, fetchProducts } = useProducts(); // ✅ Access product data and fetch function
  const [loading, setLoading] = useState(true); // ✅ Loading state

  useEffect(() => {
    fetchProducts(); // Fetch products immediately

    // Simulate a 3-second loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timeout
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-auto p-[2rem] flex justify-center items-center gap-[2rem] flex-wrap">
      {loading ? (
        <p className="text-center text-lg font-bold">
          Loading Top Choice products...
        </p> // ✅ Show loading message
      ) : products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="w-[15rem] flex flex-col rounded-lg text-start shadow-lg"
          >
            <img
              src={
                product.product_image
                  ? `http://localhost:3000${product.product_image}`
                  : sampleImgProd
              }
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
