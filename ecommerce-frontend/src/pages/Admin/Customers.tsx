import React from "react";
import AdminSideBar from "../../components/AdminSideBar";
import { FaTrash } from "react-icons/fa";

const Customers = () => {
  return (
    <>
      <main className="grid grid-cols-5 gap-2 m-xy-2 h-screen">
        <AdminSideBar />
        <div className="col-span-4 mt-8 mx-8 overflow-y-auto no-csrollbar">
          <div className="flex justify-between items-center">
            <h2 className="uppercase">Customers</h2>
          </div>
          <table className="w-full shadow-sm  text-start  border-none bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-100 text-center font-light">
                  Photo
                </th>
                <th className="py-2 px-4 border-b border-gray-100 text-center font-light">
                  Name
                </th>
                <th className="py-2 px-4 border-b border-gray-100 text-center font-light">
                  Email
                </th>
                <th className="py-2 px-4 border-b border-gray-100 text-start font-light">
                  Role
                </th>
                <th className="py-2 px-4 border-b border-gray-100 text-start font-light">
                  Actions
                </th>
              </tr>
            </thead>
          </table>
          <CustomerTable
            name="Sandy"
            id={1234}
            email="sandy@gmail.com"
            role="User"
            photo="/images/image.avif"
          />

          <CustomerTable
            name="Sandy"
            id={1234}
            email="sandy@gmail.com"
            role="User"
            photo="/images/image.avif"
          />
          <CustomerTable
            name="Sandy"
            id={1234}
            email="sandy@gmail.com"
            role="User"
            photo="/images/image.avif"
          />
          <CustomerTable
            name="Sandy"
            id={1234}
            email="sandy@gmail.com"
            role="User"
            photo="/images/image.avif"
          />
          <CustomerTable
            name="Sandy"
            id={1234}
            email="sandy@gmail.com"
            role="User"
            photo="/images/image.avif"
          />
          <CustomerTable
            name="Sandy"
            id={1234}
            email="sandy@gmail.com"
            role="User"
            photo="/images/image.avif"
          />
          <CustomerTable
            name="Sandy"
            id={1234}
            email="sandy@gmail.com"
            role="User"
            photo="/images/image.avif"
          />
        </div>
      </main>
    </>
  );
};

type CustomerProps = {
  photo: string;
  id: number;
  name: string;
  email: string;
  role: string;
};

const CustomerTable = ({ photo, id, name, email, role }: CustomerProps) => {
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
          <td className="py-2 px-4 border-b">
            <img
              src={photo}
              alt={name}
              className="w-18 h-20 object-cover rounded"
            />
          </td>
          <td className="py-2 px-4 border-b border-gray-100 font-thin">
            {name}
          </td>
          <td className="py-2 px-4 border-b border-gray-100 font-thin">
            {email}
          </td>
          <td className="py-2 px-4 border-b border-gray-100 font-thin">
            {role}
          </td>
          <td className="py-2 px-4 border-b border-gray-100 font-thin">
            <button className="text-red-500 font-thin">
              <FaTrash size={15} />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Customers;
