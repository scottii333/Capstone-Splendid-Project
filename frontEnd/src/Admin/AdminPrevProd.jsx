import HoodieImg from "../Images/HoodieProd.png";
import { useState, useEffect } from "react";
import axios from "axios";

export const AdminPrevProd = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const backendUrl = "http://localhost:3000";
  const [publishedProductIds, setPublishedProductIds] = useState(new Set());

  // Fetch products with 2-sec delay for skeleton loading
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/newProduct/fetch`);
        console.log("📥 Fetched Published Products:", response.data.data);
        // Add 2 seconds delay before updating state
        setTimeout(() => {
          setProducts(response.data.data);
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        setError("Failed to load products. Please try again.");
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

  // 📌 **Publish Product Logic**
  const handlePublish = async (product) => {
    try {
      if (!product || !product.name) {
        alert("⚠️ Cannot publish an empty product!");
        return;
      }

      // Log product data before sending
      console.log("📤 Preparing to publish product:", product);

      // Ensure correct product data is sent
      const publishData = {
        name: product.name,
        category: product.category,
        description: product.description,
        price: parseFloat(product.price),
        stock: parseInt(product.stock),
        product_image: product.product_image,
        size_guide_image: product.size_guide_image,
      };

      console.log("📤 Sending product to backend:", publishData);

      const response = await axios.post(
        `${backendUrl}/api/publishedProduct/publish`,
        publishData
      );

      console.log("✅ Product Published Successfully:", response.data);
      alert("✅ Product Published Successfully!");

      // Update state to remove published product
      setPublishedProductIds((prevIds) => new Set(prevIds).add(product.id));
    } catch (error) {
      console.error("❌ Error publishing product:", error);
      alert("⚠️ Failed to publish product. Try again.");
    }
  };

  return (
    <div className="p-4 flex flex-wrap justify-center gap-6">
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Skeleton Loader (Visible for 2 Seconds) */}
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
            <img
              src={
                product.product_image
                  ? `${backendUrl}${product.product_image}`
                  : HoodieImg
              }
              alt={product.name}
              className="w-40 h-40 border rounded-lg object-cover"
            />

            <div className="text-center">
              <p className="font-semibold text-lg">{product.name}</p>
              <p className="text-gray-500 text-sm">
                ID: {formatProductId(index)}
              </p>
            </div>

            <p className="text-gray-600 text-center text-sm">
              {product.description}
            </p>
            <p className="text-lg font-semibold text-gray-800">
              PHP {product.price}
            </p>
            <p className="text-sm text-gray-600">Stock: {product.stock}</p>

            <div className="flex gap-4">
              <button className="border border-gray-400 rounded-lg px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white transition">
                Remove
              </button>
              <button
                onClick={() => handlePublish(product)}
                disabled={publishedProductIds.has(product.id)}
                className={`px-4 py-2 rounded-lg transition ${
                  publishedProductIds.has(product.id)
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-[#c2a476] text-white hover:bg-green-500"
                }`}
              >
                {publishedProductIds.has(product.id) ? "Published" : "Publish"}
              </button>
            </div>

            <button
              className="mt-2 text-sm text-blue-500 hover:underline"
              onClick={() => handleEditClick(product)}
            >
              Edit
            </button>
          </div>
        ))}

      {/* Modern Responsive Modal */}
      {isEditOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-lg px-4 z-50"
          onClick={() => setIsEditOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative animate-fadeIn scale-100 transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl"
              onClick={() => setIsEditOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Edit Product
            </h2>

            <div className="flex flex-col gap-4">
              <label className="text-gray-700 text-sm">Product Name:</label>
              <input
                type="text"
                value={editProduct.name}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, name: e.target.value })
                }
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300"
              />

              <label className="text-gray-700 text-sm">Price (PHP):</label>
              <input
                type="number"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: e.target.value })
                }
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300"
              />

              <label className="text-gray-700 text-sm">Stock:</label>
              <input
                type="number"
                value={editProduct.stock}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, stock: e.target.value })
                }
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300"
              />

              <label className="text-gray-700 text-sm">Description:</label>
              <textarea
                value={editProduct.description}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                  })
                }
                className="w-full p-2 border rounded h-24 focus:ring-2 focus:ring-blue-300"
              ></textarea>

              <div className="flex justify-end gap-4 mt-4">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
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
