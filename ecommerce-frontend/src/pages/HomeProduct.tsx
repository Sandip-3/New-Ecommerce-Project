import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

type HomeProp = {
  name: string;
  price: number;
  image: string;
  _id: string;
  stock: number;
};

const HomeProduct = ({ name, price, image }: HomeProp) => {
  return (
    <>
      <div className=" container px-4 mt-4 mx-auto ">
        <div className="relative w-full flex flex-col space-y-2 shadow-sm rounded-sm overflow-hidden">
          <div
            className="absolute rounded-sm mt-2   text-green-400
            inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-300 bg-gray-900 bg-opacity-50  "
          >
            <Link to={"/cart"}>
              <FaPlus size={40} />
            </Link>
          </div>
          <div className="hover:scale-105">
            <img
              className="w-full h-[30vh] object-cover rounded-sm  "
              src={image}
              alt="productImage"
            />
          </div>

          <h1 className="text-center text-xl font-light">{name}</h1>
          <h1 className="text-center text-2xl py-2 font-light">${price}</h1>
        </div>
      </div>
    </>
  );
};

export default HomeProduct;
