import React, { useState } from "react";
import { IoIosSearch, IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";

type UserInfo = {
  user?: { name: String; email: string; address: string };
};

const Header = (user: UserInfo) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  return (
    <>
      <div className="container flex justify-end py-4 items-center mx-auto space-x-8 ">
        <div className="flex items-center space-x-4  ">
          <Link to={"/"} className="uppercase hover:text-blue-500">
            Home
          </Link>
          {showSearch ? (
            <input
              className="border-b-2 outline-none focus:border-blue-500 border-black width-full"
              type="text"
              placeholder="Search"
            />
          ) : (
            ""
          )}
          <IoIosSearch
            className="cursor-pointer"
            onClick={() => setShowSearch((prev) => !prev)}
            size={30}
          />
        </div>
        <div className="flex items-center space-x-4">
          {user?.user?.name ? (
            ""
          ) : (
            <IoMdLogIn className="cursor-pointer" size={25} />
          )}
          <Link to={"/cart"}>
            {" "}
            <MdShoppingCart className="cursor-pointer" size={30} />{" "}
          </Link>
          <FaUser className="cursor-pointer" size={25} />
          {user?.user?.name ? (
            <IoMdLogOut className="cursor-pointer" size={30} />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
