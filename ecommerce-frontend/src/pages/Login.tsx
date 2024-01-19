import React from "react";
import { FcGoogle, FcReddit } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";


const Login = () => {
  return (
    <>
      <div className="container flex justify-center mx-auto mt-12">
        <div className="mx-8 w-[50vh] flex flex-col justify-center rounded-lg  shadow-lg ">
          <h1 className="text-center my-2 text-2xl font-bold">Login</h1>
          <div className="mx-8 my-2 space-y-2">
            <h1 className="text-start text-xl font-light">
              Email<span className="text-red-500">*</span>
            </h1>
            <input
              className="w-full py-1 px-2 border-2 outline-none rounded-md"
              type="text"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mx-8 my-2 space-y-2">
            <h1 className="text-start text-xl font-light">
              Password<span className="text-red-500">*</span>
            </h1>
            <input
              className="w-full py-1 px-2 border-2 outline-none rounded-md"
              type="text"
              placeholder="Enter Your Name"
            />
          </div>
          <button className="bg-black hover:opacity-90 hover:shadow-lg text-xl text-white mx-8 my-4 py-1 px-2 rounded-md">
            Login
          </button>
          <div className="mx-8 mb-4 flex items-center space-x-4">
            <h1 className="text-start text-lg  font-light">
              Forget Passowrd ?
            </h1>
            <span className="text-lg  font-light hover:text-blue-500 hover:underline cursor-pointer">
              Click Here
            </span>
          </div>

          <div className="flex space-x-2 items-center mx-8 mb-4">
            <h1 className="text-start text-lg  font-light">
              Other option available <span className="text-xl">?</span>
            </h1>
            <FcGoogle className="cursor-pointer" size={25} />
            <FcReddit className="cursor-pointer" size={25} />
            <RiTwitterXLine className="cursor-pointer" size={25} />
            <FaFacebook className="cursor-pointer text-blue-600" size={25} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
