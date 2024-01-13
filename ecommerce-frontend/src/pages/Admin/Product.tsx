import React, { useState } from "react";
import AdminSideBar from "../../components/AdminSideBar";
import { IoMdCloudUpload } from "react-icons/io";
import { Link } from "react-router-dom";

type State = {
  name: string;
  price: number;
  stock: number;
};

const initialState: State = {
  name: "",
  price: 0,
  stock: 1,
};

const Product = () => {
  const [inputData, setInputData] = useState<State>(initialState);
  const [photo, setPhoto] = useState<string>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const photoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file: File | undefined = event.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") setPhoto(reader.result);
      };
    }
  };
  console.log(photo);
  return (
    <>
      <main className="grid grid-cols-5 gap-2 m-xy-2 h-screen">
        <AdminSideBar />
        <div className="col-span-4 flex justify-center h-auto mt-8 mx-8 overflow-y-auto">
          <div className="bg-slate-50 shadow rounded-sm mb-8">
            <h1 className="uppercase text-lg text-center mt-2">Add New Product</h1>
            <div className="flex flex-col items-center  mx-12 my-4">
              <div className="flex items-center mx-8 my-6">
                <label className="text-xl mr-4 block font-light" htmlFor="name">
                  Name
                </label>
                <input
                  className="bg-slate-50 px-1 text-xl border-b outline-none font-light border-black focus:border-blue-500"
                  type="text"
                  value={inputData?.name}
                  onChange={handleChange}
                  name="name"
                  placeholder="Enter Product Name"
                />
              </div>
              <div className="flex items-center mx-8 my-6">
                <label className="text-xl font-light mr-4" htmlFor="price">
                  Price
                </label>
                <input
                  className="bg-slate-50 px-1 text-xl border-b outline-none font-light border-black focus:border-blue-500"
                  type="text"
                  value={inputData?.price}
                  onChange={handleChange}
                  placeholder="Enter Price"
                  name="price"
                />
              </div>
              <div className="flex items-center mx-8 my-6">
                <label className="text-xl font-light mr-4" htmlFor="stock">
                  Stock
                </label>
                <input
                  className="bg-slate-50 px-1 text-xl border rounded outline-none font-light border-black focus:border-blue-500"
                  type="number"
                  value={inputData?.stock}
                  onChange={handleChange}
                  name="stock"
                  placeholder="Enter Stock"
                />
              </div>
              <div className="flex justify-center ml-12 mr-8 my-6">
                <label
                  htmlFor="uploadFile1"
                  className="bg-white text-black text-base rounded w-80 h-auto mb-2 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto"
                >
                  <IoMdCloudUpload size={30} />
                  Upload file
                  <input
                    onChange={photoHandler}
                    type="file"
                    id="uploadFile1"
                    className="hidden"
                  />
                  <p className="text-xs text-gray-400 mt-2 mb-2">
                    PNG, JPG SVG, WEBP, and GIF are Allowed.
                  </p>
                </label>
              </div>
              <div>
                {photo ? (
                  <img className="w-64 h-52" src={photo} alt="productImage" />
                ) : null}
              </div>
              <Link
                to={"/admin/products"}
                className="mt-6 bg-blue-400 px-2 py-1 text-white rounded-md"
              >
                Submit
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Product;
