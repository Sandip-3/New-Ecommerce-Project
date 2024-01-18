import React, { useState } from "react";
import { IoIosSearch, IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";

type UserInfo = {
  user: { name: String; email: string; address: string; isAdmin: boolean };
};

const Header = ({ user }: UserInfo) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [userClick, setUserClick] = useState<boolean>(false);

  const handleClick = () => {
    setUserClick(!userClick);
  };

  return (
    <>
      <div className="container flex justify-end py-4 items-center mx-auto space-x-8 ">
        <div className="flex items-center space-x-4  ">
          {user.isAdmin ? (
            <Link
              to={"/admin/dashboard"}
              className="uppercase hover:text-blue-500"
            >
              Dashboard
            </Link>
          ) : (
            <Link to={"/"} className="uppercase hover:text-blue-500">
              Home
            </Link>
          )}
          {showSearch
            ? ""
            : // <input
              //   className="border-b-2 outline-none focus:border-blue-500 border-black width-full"
              //   type="text"
              //   placeholder="Search"
              // />
              ""}
          <Link to={"/search"}>
            <IoIosSearch
              className="cursor-pointer"
              onClick={() => setShowSearch((prev) => !prev)}
              size={30}
            />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {user?.name ? "" : <IoMdLogIn className="cursor-pointer" size={25} />}
          <Link to={"/cart"}>
            {" "}
            <MdShoppingCart className="cursor-pointer" size={30} />{" "}
          </Link>
          <div className="relative">
            <FaUser
              onClick={handleClick}
              className="cursor-pointer"
              size={25}
            />
            <div
              className={
                userClick
                  ? "bg-opacity-100 mt-2 flex flex-col items-center justify-center rounded-sm px-2 py-1 w-auto  absolute top-50 left-0 right-40  z-50"
                  : "hidden"
              }
            >
              <div className="bg-white px-2 py-1 flex items-center justify-center space-x-2 shadow-lg rounded bg-opacity-100">
                <FaUser />
                {user.isAdmin ? (
                  <Link onClick={handleClick} to={"/admin/dashboard"}>
                    Dashboard
                  </Link>
                ) : (
                  <Link onClick={handleClick} to={"/orders"}>
                    Orders
                  </Link>
                )}
              </div>
            </div>
          </div>
          {user?.name ? (
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
