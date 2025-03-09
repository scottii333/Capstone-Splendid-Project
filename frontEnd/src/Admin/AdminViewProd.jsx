import { useEffect, useState } from "react";
import axios from "axios";

export const AdminViewProd = () => {
  const [publishedProducts, setPublishedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = "http://localhost:3000";

  useEffect(() => {
    const fetchPublished = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/publishedProduct/fetch`
        );
        console.log("📥 Fetched Published Products:", response.data.data);

        setTimeout(() => {
          setPublishedProducts(response.data.data);
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error("❌ Error fetching published products:", error);
        setError("Failed to load published products. Please try again.");
        setIsLoading(false);
      }
    };

    fetchPublished();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-[1rem] w-full p-[0.5rem]">
      {error && <p className="text-red-500 text-center w-full">{error}</p>}

      {isLoading
        ? [...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 rounded-lg w-[20rem] p-6 flex flex-col md:flex-row items-center md:w-[30rem] gap-4"
            >
              <div className="bg-gray-300 h-[15rem] w-[15rem] rounded-lg"></div>
              <div className="flex flex-col gap-2 text-center sm:text-left p-4">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))
        : publishedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg w-[20rem] p-6 flex flex-col md:flex-row items-center md:w-[30rem] gap-4"
            >
              <img
                src={`${backendUrl}${product.product_image}`}
                alt={product.name}
                className="w-[15rem] h-[15rem] border rounded-lg object-cover"
              />
              <div className="flex flex-col gap-2 text-center sm:text-left p-4">
                <p className="text-gray-500 text-sm">Category</p>
                <p className="font-semibold">{product.category}</p>
                <p className="text-gray-500 text-sm">Product ID</p>
                <p className="font-semibold">0100{product.id}</p>
                <p className="text-gray-500 text-sm">Stock</p>
                <p className="font-semibold">{product.stock}</p>
                <p className="text-gray-500 text-sm">Price</p>
                <p className="font-semibold text-green-600">
                  PHP {product.price}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};
