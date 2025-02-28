import HoodieImg from "../Images/HoodieProd.png";

export const AdminViewProd = () => {
  return (
    <div className="flex flex-wrap justify-center gap-[1rem] w-full  p-[0.5rem]">
      <div className="bg-white rounded-lg w-[20rem]  p-6 flex flex-col md:flex-row items-center md:items-start md:w-[30rem] gap-4">
        {/* Product Image */}
        <img
          src={HoodieImg}
          alt="Hoodie"
          className="w-[15rem] h-[15rem] md:w-[15rem] md:h-[15rem] border rounded-lg object-cover"
        />

        {/* Product Details */}
        <div className="flex flex-col gap-2 text-center sm:text-left p-4">
          <p className="text-gray-500 text-sm">Category</p>
          <p className="font-semibold">Oversized Hoodie</p>

          <p className="text-gray-500 text-sm">Product ID</p>
          <p className="font-semibold">02000319</p>

          <p className="text-gray-500 text-sm">Stock</p>
          <p className="font-semibold">134</p>

          <p className="text-gray-500 text-sm">Price</p>
          <p className="font-semibold text-green-600">PHP 850</p>
        </div>
      </div>
      <div className="bg-white rounded-lg w-[20rem]  p-6 flex flex-col md:flex-row items-center md:items-start md:w-[30rem] gap-4">
        {/* Product Image */}
        <img
          src={HoodieImg}
          alt="Hoodie"
          className="w-[15rem] h-[15rem] md:w-[15rem] md:h-[15rem] border rounded-lg object-cover"
        />

        {/* Product Details */}
        <div className="flex flex-col gap-2 text-center sm:text-left p-4">
          <p className="text-gray-500 text-sm">Category</p>
          <p className="font-semibold">Oversized Hoodie</p>

          <p className="text-gray-500 text-sm">Product ID</p>
          <p className="font-semibold">02000319</p>

          <p className="text-gray-500 text-sm">Stock</p>
          <p className="font-semibold">134</p>

          <p className="text-gray-500 text-sm">Price</p>
          <p className="font-semibold text-green-600">PHP 850</p>
        </div>
      </div>
      <div className="bg-white rounded-lg w-[20rem]  p-6 flex flex-col md:flex-row items-center md:items-start md:w-[30rem] gap-4">
        {/* Product Image */}
        <img
          src={HoodieImg}
          alt="Hoodie"
          className="w-[15rem] h-[15rem] md:w-[15rem] md:h-[15rem] border rounded-lg object-cover"
        />

        {/* Product Details */}
        <div className="flex flex-col gap-2 text-center sm:text-left p-4">
          <p className="text-gray-500 text-sm">Category</p>
          <p className="font-semibold">Oversized Hoodie</p>

          <p className="text-gray-500 text-sm">Product ID</p>
          <p className="font-semibold">02000319</p>

          <p className="text-gray-500 text-sm">Stock</p>
          <p className="font-semibold">134</p>

          <p className="text-gray-500 text-sm">Price</p>
          <p className="font-semibold text-green-600">PHP 850</p>
        </div>
      </div>
      <div className="bg-white rounded-lg w-[20rem]  p-6 flex flex-col md:flex-row items-center md:items-start md:w-[30rem] gap-4">
        {/* Product Image */}
        <img
          src={HoodieImg}
          alt="Hoodie"
          className="w-[15rem] h-[15rem] md:w-[15rem] md:h-[15rem] border rounded-lg object-cover"
        />

        {/* Product Details */}
        <div className="flex flex-col gap-2 text-center sm:text-left p-4">
          <p className="text-gray-500 text-sm">Category</p>
          <p className="font-semibold">Oversized Hoodie</p>

          <p className="text-gray-500 text-sm">Product ID</p>
          <p className="font-semibold">02000319</p>

          <p className="text-gray-500 text-sm">Stock</p>
          <p className="font-semibold">134</p>

          <p className="text-gray-500 text-sm">Price</p>
          <p className="font-semibold text-green-600">PHP 850</p>
        </div>
      </div>
    </div>
  );
};
