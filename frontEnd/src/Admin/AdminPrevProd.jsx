export const AdminPrevProd = () => {
  return (
    <div className="  flex flex-wrap justify-center gap-[1rem] p-[0.5rem]    border">
      {/* div for product */}
      <div className=" bg-white p-[1rem] h-[30rem]  max-w-[30rem] min-w-[18rem] flex flex-col justify-around items-center">
        Product 1
        <div className="flex flex-col  gap-[1rem]">
          <button className="border text-black p-[0.5rem] cursor-pointer">
            Edit
          </button>
          <button className="border text-black p-[0.5rem]  cursor-pointer">
            Remove
          </button>
          <button className="border text-black p-[0.5rem] cursor-pointer">
            Publish
          </button>
        </div>
      </div>

      <div className=" bg-white p-[1rem] h-[30rem]  max-w-[30rem] min-w-[18rem] flex flex-col justify-around items-center">
        Product 2
        <div className="flex flex-col  gap-[1rem]">
          <button className="border text-black p-[0.5rem] cursor-pointer">
            Edit
          </button>
          <button className="border text-black p-[0.5rem]  cursor-pointer">
            Remove
          </button>
          <button className="border text-black p-[0.5rem] cursor-pointer">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};
