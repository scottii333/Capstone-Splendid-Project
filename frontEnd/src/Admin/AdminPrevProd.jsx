import HoodieImg from "../Images/HoodieProd.png";
import { useState, useEffect } from "react";
import axios from "axios";

export const AdminPrevProd = () => {
  const [products, setProducts] = useState([]); // Store fetched products
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const backendUrl = "http://localhost:3000"; // Your backend URL

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/newProduct/fetch`);
        setProducts(response.data.data);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        setError("Failed to load products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Format product ID as 0100001, 0100002, etc.
  const formatProductId = (index) => {
    return `0100${String(index + 1).padStart(3, "0")}`;
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setIsEditOpen(true);
  };

  const handleSaveChanges = () => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === editProduct.id ? { ...editProduct } : p
      )
    );
    setIsEditOpen(false);
  };

  return (
    <div className="p-4 flex flex-wrap justify-center gap-6">
      {/* Show Error if API fails */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Show Loading Skeletons */}
      {isLoading &&
        [...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center gap-4 w-full max-w-[18rem] md:max-w-[22rem]"
          >
            <div className="bg-gray-300 h-40 w-40 rounded-lg"></div>
            <div className="h-6 w-32 bg-gray-300 rounded"></div>
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
          </div>
        ))}

      {/* Display Products */}
      {!isLoading &&
        products.map((product, index) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center gap-6 transition-all duration-300 w-full max-w-[18rem] md:max-w-[22rem] border border-gray-200 hover:shadow-lg"
          >
            {/* Product Image */}
            <img
              src={
                product.product_image
                  ? `${backendUrl}${product.product_image}`
                  : HoodieImg
              }
              alt={product.name}
              className="w-40 h-40 border rounded-lg object-cover"
            />

            {/* Product Name & ID */}
            <div className="text-center">
              <p className="font-semibold text-lg">{product.name}</p>
              <p className="text-gray-500 text-sm">
                ID: {formatProductId(index)}
              </p>
            </div>

            {/* Product Description */}
            <p className="text-gray-600 text-center text-sm">
              {product.description}
            </p>

            {/* Price & Stock */}
            <p className="text-lg font-semibold text-gray-800">
              PHP {product.price}
            </p>
            <p className="text-sm text-gray-600">Stock: {product.stock}</p>

            {/* Buttons */}
            <div className="flex gap-4">
              <button className="border border-gray-400 rounded-lg px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white transition">
                Remove
              </button>
              <button className="bg-[#c2a476] text-white rounded-lg px-4 py-2 hover:bg-green-500 transition">
                Publish
              </button>
            </div>

            {/* Edit Button */}
            <button
              className="mt-2 text-sm text-blue-500 hover:underline"
              onClick={() => handleEditClick(product)}
            >
              Edit
            </button>
          </div>
        ))}

      {/* Modern Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-lg">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
              onClick={() => setIsEditOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">Edit Product</h2>

            <div className="flex flex-col gap-4">
              {/* Product Name */}
              <label className="text-gray-700">
                Name:
                <input
                  type="text"
                  value={editProduct.name}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, name: e.target.value })
                  }
                  className="w-full p-2 border rounded mt-1"
                />
              </label>

              {/* Price */}
              <label className="text-gray-700">
                Price:
                <input
                  type="number"
                  value={editProduct.price}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, price: e.target.value })
                  }
                  className="w-full p-2 border rounded mt-1"
                />
              </label>

              {/* Stock */}
              <label className="text-gray-700">
                Stock:
                <input
                  type="number"
                  value={editProduct.stock}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, stock: e.target.value })
                  }
                  className="w-full p-2 border rounded mt-1"
                />
              </label>

              {/* Description */}
              <label className="text-gray-700">
                Description:
                <textarea
                  value={editProduct.description}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded mt-1"
                />
              </label>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                  onClick={() => setIsEditOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
