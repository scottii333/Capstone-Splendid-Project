import { useState } from "react";

export const AdminNewProd = () => {
  const [productImage, setProductImage] = useState(null);
  const [sizeGuideImage, setSizeGuideImage] = useState(null);

  // Function to handle image preview
  const handleImageChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-full h-full p-[0.5rem]">
      <div className="bg-white w-full h-auto rounded-lg shadow-lg p-[0.5rem] flex flex-col">
        <label className="font-semibold text-lg">Basic Information</label>

        <div className=" p-[0.5rem] flex flex-wrap gap-[1rem]">
          {/* Product Name */}
          <div className="flex flex-col gap-[0.5rem] w-full lg:w-[48%]">
            <label>Product Name</label>
            <input
              type="text"
              placeholder="Enter Product Name"
              className="w-full min-w-[15rem] p-[0.5rem] border rounded"
            />
          </div>

          {/* Product Category */}
          <div className="flex flex-col gap-[0.5rem] w-full lg:w-[48%]">
            <label>Product Category</label>
            <select className="w-full max-w-full min-w-[15rem] p-[0.5rem] border rounded">
              <option value="" disabled>
                Select Category
              </option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white w-full h-auto rounded-lg shadow-lg p-[0.5rem] mt-[1rem] flex flex-col">
        <label className="font-semibold text-lg">Product Details</label>

        <div className="flex flex-wrap gap-[1rem] ">
          {/* container for Product Description */}
          <div className="flex flex-col gap-[0.5rem] w-full max-w-[30rem] p-[0.5rem] ">
            <label>Product Description</label>
            <textarea
              placeholder="Enter Product Description"
              className=" h-[10rem] p-[0.5rem] border rounded"
            ></textarea>
          </div>

          {/* container for price and stock */}
          <div className="flex flex-col gap-[0.5rem] w-full max-w-[11rem] p-[0.5rem] ">
            <label>Price</label>
            <input
              type="text"
              placeholder="Enter Product Price"
              className=" p-[0.5rem] border rounded"
            />
            <label>Stock</label>
            <input
              type="text"
              placeholder="Enter Product Stock"
              className=" p-[0.5rem] border rounded"
            />
          </div>

          {/* container for Product Image and Size Guide */}
          <div className="flex  gap-[0.5rem] w-full max-w-[22rem] p-[0.5rem] ">
            {/* Product Image */}
            <div className="flex flex-col w-full max-w-[8rem] gap-[0.5rem]">
              <label>Product Image</label>
              <div className="border rounded h-[7rem] w-[7rem] flex items-center justify-center overflow-hidden">
                {productImage ? (
                  <img
                    src={productImage}
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
            {/* Size Guide Image */}
            <div className="flex flex-col w-full max-w-[8rem] gap-[0.5rem] ">
              <label>Size Guide</label>
              <div className="border rounded h-[7rem] w-[7rem] flex items-center justify-center overflow-hidden">
                {sizeGuideImage ? (
                  <img
                    src={sizeGuideImage}
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
        </div>
      </div>
    </div>
  );
};
