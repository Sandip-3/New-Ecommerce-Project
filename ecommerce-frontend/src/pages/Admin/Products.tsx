import React, { ReactElement } from "react";
import AdminSideBar from "../../components/AdminSideBar";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Products = () => {
  return (
    <>
      <main className="grid grid-cols-5 gap-2 m-xy-2 h-screen">
        <AdminSideBar />
        <div className="col-span-4 mt-8 mx-8 overflow-y-auto no-scrollbar">
          <div className="flex justify-between items-center">
            <h2 className="uppercase">Products</h2>
            <Link to={"/admin/product/new"} className="text-green-400">
              <FaPlus size={25} />
            </Link>
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
                  Stock
                </th>
                <th className="py-2 px-4 border-b border-gray-100 text-start font-light">
                  Price
                </th>
                <th className="py-2 px-4 border-b border-gray-100 text-start font-light">
                  Actions
                </th>
              </tr>
            </thead>
          </table>
          <ProductTable
            name="Laptop"
            id={1234}
            stock={13}
            price={999}
            photo="/images/image.avif"
          />
          <ProductTable
            name="Laptop"
            id={12}
            stock={13}
            price={999}
            photo="/images/image.avif"
          />
          <ProductTable
            name="Laptop"
            id={123234}
            stock={13}
            price={999}
            photo="/images/image.avif"
          />
          <ProductTable
            name="Laptop"
            id={12144}
            stock={13}
            price={999}
            photo="/images/image.avif"
          />
          <ProductTable
            name="Laptop"
            id={1214234}
            stock={13}
            price={999}
            photo="/images/image.avif"
          />
          <ProductTable
            name="Laptop"
            id={122113434}
            stock={13}
            price={999}
            photo="/images/image.avif"
          />
        </div>
      </main>
    </>
  );
};

type ProductProps = {
  photo: string;
  id: number;
  name: string;
  stock: number;
  price: number;
};

const ProductTable = ({ photo, id, name, stock, price }: ProductProps) => {
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
            {stock}
          </td>
          <td className="py-2 px-4 border-b border-gray-100 font-thin">
            ${price}
          </td>
          <td className="py-2 px-4 border-b border-gray-100 font-thin">
            <Link
              to={`/admin/product/${id}`}
              className="bg-blue-400 text-white font-light px-3  rounded"
            >
              Manage
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Products;
