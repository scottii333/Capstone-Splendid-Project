import sampleImgProd from "../Images/FirstProduct.png";

export const TopChoice = () => {
  return (
    <div className="w-full h-auto p-[2rem] flex justify-center items-center gap-[2rem] flex-wrap">
      {/* Product Div */}
      <div className=" w-[15rem] flex flex-col rounded-lg text-start shadow-lg">
        <img src={sampleImgProd} className="rounded-t-lg w-full" />
        <p className="p-2 font-bold">Splendid Ivory</p>
        <div className="flex justify-between p-2">
          <p>Oversized Hoodies</p>
          <p>PHP 850</p>
        </div>
        <button className="bg-[#F7E5D1] m-2 rounded-lg p-1 cursor-pointer hover:bg-[#efc493] hover:text-white">
          Add to Cart
        </button>
      </div>
      <div className=" w-[15rem] flex flex-col rounded-lg text-start shadow-lg">
        <img src={sampleImgProd} className="rounded-t-lg w-full" />
        <p className="p-2 font-bold">Splendid Ivory</p>
        <div className="flex justify-between p-2">
          <p>Oversized Hoodies</p>
          <p>PHP 850</p>
        </div>
        <button className="bg-[#F7E5D1] m-2 rounded-lg p-1 cursor-pointer hover:bg-[#efc493] hover:text-white">
          Add to Cart
        </button>
      </div>
      <div className=" w-[15rem] flex flex-col rounded-lg text-start shadow-lg">
        <img src={sampleImgProd} className="rounded-t-lg w-full" />
        <p className="p-2 font-bold">Splendid Ivory</p>
        <div className="flex justify-between p-2">
          <p>Oversized Hoodies</p>
          <p>PHP 850</p>
        </div>
        <button className="bg-[#F7E5D1] m-2 rounded-lg p-1 cursor-pointer hover:bg-[#efc493] hover:text-white">
          Add to Cart
        </button>
      </div>
    </div>
  );
};
