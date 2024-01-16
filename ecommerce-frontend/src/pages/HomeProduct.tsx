import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

type HomeProp = {
  name: string;
  price: number;
  image: string;
};

const HomeProduct = ({ name, price, image }: HomeProp) => {
  return (
    <>
      <div className="container px-4 mt-4 mx-auto ">
        <div className=" w-full flex flex-col space-y-2 shadow-sm rounded-sm overflow-hidden duration-1000 ">
          <div className="relative hover:opacity-50 hover:scale-105 transition-transform">
            <img
              className="w-full h-[30vh] object-cover rounded-sm  "
              src={image}
              alt="productImage"
            />
            <div className="absolute text-green-500 inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-300">
              <Link to={"/cart"}>
                <FaPlus clssName="text-white" size={50} />
              </Link>
            </div>
          </div>

          <h1 className="text-center text-xl font-light">{name}</h1>
          <h1 className="text-center text-2xl  font-light">${price}</h1>
        </div>
      </div>
    </>
  );
};

export default HomeProduct;
