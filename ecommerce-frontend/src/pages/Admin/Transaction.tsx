import React from "react";
import AdminSideBar from "../../components/AdminSideBar";
import { Link } from "react-router-dom";

const Transaction = () => {
  return (
    <>
      <main className="grid grid-cols-5 gap-2 m-xy-2 h-screen">
        <AdminSideBar />
        <div className="col-span-4 mt-8 mx-8 overflow-y-auto no-scrollbar">
          <div className="flex justify-between items-center">
            <h2 className="uppercase">Transaction</h2>
          </div>
          <TransactionTable
            name="Sandy"
            id={1234}
            amount={2000}
            quantity={13}
            status="Pending"
          />
          <TransactionTable
            name="Sandy"
            id={1234}
            amount={2000}
            quantity={13}
            status="Pending"
          />
          <TransactionTable
            name="Sandy"
            id={1234}
            amount={2000}
            quantity={13}
            status="Pending"
          />
          <TransactionTable
            name="Sandy"
            id={1234}
            amount={2000}
            quantity={13}
            status="Pending"
          />
          <TransactionTable
            name="Sandy"
            id={1234}
            amount={2000}
            quantity={13}
            status="Delivered"
          />
          <TransactionTable
            name="Sandy"
            id={1234}
            amount={2000}
            quantity={13}
            status="Shipped"
          />
        </div>
      </main>
    </>
  );
};

type TransProp = {
  id: number;
  name: string;
  amount: number;
  quantity: number;
  status: string;
};

const TransactionTable = ({
  id,
  name,
  amount,
  quantity,
  status,
}: TransProp) => {
  return (
    <table className="w-full shadow-sm  text-start  border-none bg-white border border-gray-300">
      {/* <thead>
        <tr>
          <th className="py-2 px-4 border-b border-gray-100 text-start font-normal">
            Photo
          </th>
          <th className="py-2 px-4 border-b border-gray-100 text-start font-normal">
            Name
          </th>
          <th className="py-2 px-4 border-b border-gray-100 text-start font-normal">
            Stock
          </th>
          <th className="py-2 px-4 border-b border-gray-100 text-start font-normal">
            Price
          </th>
          <th className="py-2 px-4 border-b border-gray-100 text-start font-normal">
            Actions
          </th>
        </tr>
      </thead> */}
      <tbody>
        {/* {products.map((product) => ( */}
        <tr key={id}>
          <td className="py-2 px-4 border-b border-gray-100 font-thin ">
            {name}
          </td>
          <td className="py-2 px-4 border-b border-gray-100 font-thin ">
            {amount}
          </td>
          <td className="py-2 px-4 border-b border-gray-100 font-thin ">
            {quantity}
          </td>
          <td className="py-2 px-4 border-b border-gray-100 font-normal ">
            {status === "Pending" ? (
              <span className="text-red-500">Pending</span>
            ) : status === "Shipped" ? (
              <span className="text-green-500">Shipped</span>
            ) : status === "Delivered" ? (
              <h1 className="text-gray-400">Delivered</h1>
            ) : (
              <h1>Done</h1>
            )}
          </td>
          <td className="py-2 px-4 border-b border-gray-100 font-thin ">
            <Link  to={'/admin/transaction/id'} className="bg-blue-400 text-white font-light px-3  rounded">
              Manage
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Transaction;
