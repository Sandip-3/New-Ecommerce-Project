import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { MdDashboardCustomize } from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi2";
import { AiOutlineTransaction } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { MdPieChart } from "react-icons/md";
import { FaChartLine } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";

const AdminSideBar = () => {
  const location = useLocation();
  return (
    <div className="col-span-1 bg-slate-100">
      <div className="flex gap-6 justify-center cursor-pointer items-center mt-4 ">
        <h2 className="text-start text-3xl ml-2 m-y-12 font-mono">Kaimono</h2>
        <FaCartShopping size={30} />
      </div>
      <h2 className="text-start text-sm  font-extralight mt-8 ml-8 uppercase">
        Dashboard
      </h2>
      <div className="cursor-pointer items-center gap-6 mt-2 mx-4 hover:bg-blue-200 py-2 hover:rounded-md">
        <ul>
          <li className="flex items-center gap-4 text-start ml-8 hover:text-blue-600">
            <MdDashboardCustomize size={25} />
            <Link to={"/admin/dashboard"}>
              <h5 className="text-2xl font-thin ">Dashboard</h5>
            </Link>
          </li>
        </ul>
      </div>
      <div className=" cursor-pointer items-center gap-6 mt-2 mx-4 hover:bg-blue-200 py-2 hover:rounded-md">
        <ul>
          <li className="flex items-center gap-4 text-start ml-8 hover:text-blue-600">
            <HiShoppingBag size={25} />
            <Link to={"/admin/products"}>
              <h5 className="text-2xl font-thin">Products</h5>
            </Link>
          </li>
        </ul>
      </div>
      <div className=" cursor-pointer items-center gap-6 mt-2 mx-4 hover:bg-blue-200 py-2 hover:rounded-md">
        <ul>
          <li className="flex items-center gap-4 text-start ml-8 hover:text-blue-600">
            <IoIosPeople size={25} />
            <Link to={"/admin/customers"}>
              <h5 className="text-2xl font-thin">Customers</h5>
            </Link>
          </li>
        </ul>
      </div>
      <div className=" cursor-pointer items-center gap-6 mt-2 mx-4 hover:bg-blue-200 py-2 hover:rounded-md">
        <ul>
          <li className="flex items-center gap-4 text-start ml-8 hover:text-blue-600">
            <AiOutlineTransaction size={25} />
            <Link to={"/admin/transaction"}>
              <h5 className="text-2xl font-thin">Transaction</h5>
            </Link>
          </li>
        </ul>
      </div>
      {/* Charts */}

      <h2 className="text-start text-sm font-extralight mt-8  ml-8 uppercase">
        Charts
      </h2>
      <div className="cursor-pointer items-center gap-6 mt-2 mx-4 hover:bg-blue-200 py-2 hover:rounded-md">
        <ul>
          <li className="flex items-center gap-4 text-start ml-8 hover:text-blue-600 hover:text-blue-600">
            <MdPieChart size={25} />
            <Link to={"/admin/dashboard"}>
              <h5 className="text-2xl font-thin">Pie Chart</h5>
            </Link>
          </li>
        </ul>
      </div>
      <div className=" cursor-pointer items-center gap-6 mt-2 mx-4 hover:bg-blue-200 py-2 hover:rounded-md">
        <ul>
          <li className="flex items-center gap-4 text-start ml-8 hover:text-blue-600">
            <FaChartLine size={25} />
            <Link to={"/admin/products"}>
              <h5 className="text-2xl font-thin">Line Chart</h5>
            </Link>
          </li>
        </ul>
      </div>
      <div className=" cursor-pointer items-center gap-6 mt-2 mx-4 hover:bg-blue-200 py-2 hover:rounded-md">
        <ul>
          <li className="flex items-center gap-4 text-start ml-8 hover:text-blue-600">
            <FaChartBar size={25} />
            <Link to={"/admin/products"}>
              <h5 className="text-2xl font-thin">Bar Chart</h5>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSideBar;

