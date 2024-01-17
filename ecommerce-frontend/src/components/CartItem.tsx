import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

const CartItem = () => {
  const [itemCount, setItemCount] = useState<number>(1);
  return (
    <>
      {/* <div className="container mx-auto grid grid-cols-4 mt-12 gap-6"> */}
        <div className="flex  w-full items-center text-center col-span-3 justify-between">
          <div className="flex space-x-12 items-center">
            <img
              className="w-auto h-32 object-cover px-2 py-1 rounded-xl"
              src="/images/image.avif"
              alt="productName"
            />
            <div className="flex flex-col items-center ">
              <h1 className="font-thin text-2xl">Camera</h1>
              <h2 className=" text-2xl">$500</h2>
            </div>
          </div>
          <div className="flex space-x-12 items-center">
            <div className="flex space-x-6">
              <button
                className="border px-4 py-.5 rounded-sm hover:bg-gray-400 text-xl hover:text-white text-center"
                onClick={() => setItemCount(itemCount - 1)}
              >
                -
              </button>
              <p className="text-xl font-thin">{itemCount}</p>
              <button
                className="border px-4 py-.5 rounded-sm hover:bg-gray-400 text-xl hover:text-white text-center"
                onClick={() => setItemCount(itemCount + 1)}
              >
                +
              </button>
            </div>
            <AiFillDelete className="hover:text-red-500" size={20} />
          </div>
        </div>
        
      {/* </div> */}
    </>
  );
};

export default CartItem;
