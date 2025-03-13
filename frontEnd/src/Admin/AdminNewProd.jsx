import { useState } from "react";
import axios from "axios";

export const AdminNewProd = () => {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [sizeGuideImage, setSizeGuideImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Fix: Ensure images are stored as `File` objects instead of Base64
  const handleImageChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // ✅ Store as File object, not Base64
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, ""); // Only allow numbers and dots
    setProductPrice(value);
  };

  const handleStockChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Only allow numbers
    setProductStock(value);
  };

  const handleDescriptionChange = (e) => {
    const words = e.target.value.split(/\s+/).slice(0, 50).join(" "); // Limit to 50 words
    setProductDescription(words);
  };

  const handleAddProduct = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (
      !productName ||
      !productCategory ||
      !productDescription ||
      !productPrice ||
      !productStock ||
      !productImage ||
      !sizeGuideImage
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("category", productCategory);
    formData.append("description", productDescription);
    formData.append("price", productPrice);
    formData.append("stock", productStock);
    formData.append("productImage", productImage); // ✅ Send actual file
    formData.append("sizeGuideImage", sizeGuideImage); // ✅ Send actual file

    console.log("🔍 FormData before sending:", [...formData.entries()]);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/newProduct/add",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("✅ Response:", response.data);
      setSuccessMessage("Product added successfully!");
      setLoading(false);

      // Clear the form
      setProductName("");
      setProductCategory("");
      setProductDescription("");
      setProductPrice("");
      setProductStock("");
      setProductImage(null);
      setSizeGuideImage(null);
    } catch (error) {
      setLoading(false);
      console.error("❌ Error response:", error.response?.data);
      setErrorMessage(
        error.response?.data?.message || "Failed to add product. Try again."
      );
    }
  };

  return (
    <div className="w-full h-full p-[0.5rem]">
      <div className="bg-white w-full h-auto rounded-lg shadow-lg p-[0.5rem] flex flex-col">
        <label className="font-semibold text-lg">Basic Information</label>

        <div className="p-[0.5rem] flex flex-wrap gap-[1rem]">
          <div className="flex flex-col gap-[0.5rem] w-full lg:w-[48%]">
            <label>Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter Product Name"
              className="w-full min-w-[15rem] p-[0.5rem] border rounded"
            />
          </div>

          <div className="flex flex-col gap-[0.5rem] w-full lg:w-[48%]">
            <label>Product Category</label>
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="w-full max-w-[100%] p-[0.5rem] border rounded"
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="pull-over">Pull-Over Hoodies</option>
              <option value="zip">Zip Hoodie</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white w-full h-auto rounded-lg shadow-lg p-[0.5rem] mt-[1rem] flex flex-col">
        <label className="font-semibold text-lg">Product Details</label>

        <div className="flex flex-wrap gap-[1rem]">
          <div className="flex flex-col gap-[0.5rem] w-full max-w-[30rem] p-[0.5rem]">
            <label>Product Description (Max 50 words)</label>
            <textarea
              value={productDescription}
              onChange={handleDescriptionChange}
              placeholder="Enter Product Description"
              className="h-[10rem] p-[0.5rem] border rounded"
            ></textarea>
          </div>

          <div className="flex flex-col gap-[0.5rem] w-full max-w-[11rem] p-[0.5rem]">
            <label>Price</label>
            <input
              type="text"
              value={productPrice}
              onChange={handlePriceChange}
              placeholder="Enter Product Price"
              className="p-[0.5rem] border rounded"
            />
            <label>Stock</label>
            <input
              type="text"
              value={productStock}
              onChange={handleStockChange}
              placeholder="Enter Product Stock"
              className="p-[0.5rem] border rounded"
            />
          </div>

          <div className="flex gap-[0.5rem] w-full max-w-[22rem] p-[0.5rem]">
            <div className="flex flex-col w-full max-w-[8rem] gap-[0.5rem]">
              <label>Product Image</label>
              <div className="border rounded h-[7rem] w-[7rem] flex items-center justify-center overflow-hidden">
                {productImage ? (
                  <img
                    src={URL.createObjectURL(productImage)}
                    alt="Product Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-500">No Image</span>
                )}
              </div>
              <input
                type="file"
                className="p-[0.5rem] border rounded"
                onChange={(e) => handleImageChange(e, setProductImage)}
                accept="image/*"
              />
            </div>

            <div className="flex flex-col w-full max-w-[8rem] gap-[0.5rem]">
              <label>Size Guide</label>
              <div className="border rounded h-[7rem] w-[7rem] flex items-center justify-center overflow-hidden">
                {sizeGuideImage ? (
                  <img
                    src={URL.createObjectURL(sizeGuideImage)}
                    alt="Size Guide Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-500">No Image</span>
                )}
              </div>
              <input
                type="file"
                className="p-[0.5rem] border rounded"
                onChange={(e) => handleImageChange(e, setSizeGuideImage)}
                accept="image/*"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-sm">{successMessage}</div>
          )}

          <div>
            <button
              onClick={handleAddProduct}
              disabled={loading}
              className="bg-blue-500 text-white p-[0.5rem] rounded w-full"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
