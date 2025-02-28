import HoodieImg from "../Images/HoodieProd.png";

export const AdminPrevProd = () => {
  // Sample Product Data
  const products = [
    { id: "02000319", name: "Oversized Hoodie", stock: 134, price: 850 },
    { id: "02000320", name: "Zip-Up Hoodie", stock: 98, price: 900 },
    { id: "02000321", name: "Classic Hoodie", stock: 76, price: 950 },
  ];

  return (
    <div className="p-4 flex flex-wrap justify-center gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center gap-4 transition-all duration-300 w-full max-w-[18rem] md:max-w-[22rem]"
        >
          {/* Product Image */}
          <img
            src={HoodieImg}
            alt={product.name}
            className="w-[12rem] h-[12rem] border rounded-lg object-cover"
          />

          {/* Product Name */}
          <p className="font-semibold text-lg text-center">{product.name}</p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 w-full">
            <button className="w-full border py-2 text-black hover:bg-gray-100 transition">
              Edit
            </button>
            <button className="w-full border py-2 text-black hover:bg-red-100 transition">
              Remove
            </button>
            <button className="w-full border py-2 text-black hover:bg-green-100 transition">
              Publish
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
