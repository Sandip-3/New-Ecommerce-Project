import React, { useState } from "react";
import { OrderItemType, OrderItem } from "../../type";
import AdminSideBar from "../../components/AdminSideBar";
import { Link } from "react-router-dom";

const image = "/images/image.avif";

const orderItems: OrderItemType[] = [
  {
    name: "Laptop",
    photo: image,
    price: 200,
    quantity: 4,
    _id: "1256",
  },
];

const TransactionManage = () => {
  const [order, setOrder] = useState<OrderItem>({
    name: "Sandy",
    price: 200,
    address: "Sankhamul",
    quantity: 12,
    status: "Shipped",
    subTotal: 800,
    discount: 100,
    shippingCharge: 100,
    tax: 20,
    OrderItems: orderItems,
    _id: "string",
  });
  const {
    name,
    address,
    status,
    subTotal,
    discount,
    shippingCharge,
    tax,
    _id,
  } = order;

  const changeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOrder((prevState) => ({
      ...prevState,
      status:
        prevState.status === "Processing"
          ? "Shipped"
          : prevState.status === "Shipped"
          ? "Delivered"
          : prevState.status === "Delivered"
          ? "Processing"
          : "Shipped",
    }));
  };
  return (
    <>
      <main className="grid grid-cols-5 gap-2 m-xy-2 h-screen">
        <AdminSideBar />
        <div className="col-span-4 mt-8 mx-8 overflow-y-auto">
          <div className="flex justify-between items-center">
            <h2 className="uppercase">Manage Transaction</h2>
          </div>
          <div className="grid grid-cols-2 min-h-[600px] gap-4 mx-auto mt-12 ">
            {order.OrderItems.map((item) => (
              <ProductDetails
                name={item.name}
                photo={item.photo}
                price={item.price}
                quantity={item.quantity}
                _id={item._id}
              />
            ))}
            <div className=" col-span-1 ">
              <div className="bg-gray-50 shadow rounded mb-8 min-h-[600px]">
                <h1 className="uppercase mx-12 text-lg text-Start ">
                  Transaction Details
                </h1>

                <div className="flex flex-col  mx-12 my-4">
                  <h1 className="font-bold mb-2 uppercase">User Info</h1>
                  <h1 className="text-start">Name : {name}</h1>
                  <h1 className="text-start">Address : {address}</h1>
                  <h1 className="font-bold my-2 uppercase">Transaction Info</h1>
                  <h1 className="text-start">Sub-Total : {subTotal}</h1>
                  <h1 className="text-start">
                    Shipping Charge : {shippingCharge}
                  </h1>
                  <h1 className="text-start">Tax : {tax}</h1>
                  <h1 className="text-start">Discount : {discount}</h1>
                  <h1 className="text-start text-green-300">
                    Total : {subTotal} - {discount} + {shippingCharge}+ {tax} ={" "}
                    {subTotal + shippingCharge - discount + tax}
                  </h1>
                  <h1>
                    Status :{" "}
                    {status === "Processing" ? (
                      <span className="text-red-400">Processing</span>
                    ) : status === "Shipped" ? (
                      <span className="text-green-400">Shipped</span>
                    ) : (
                      <span className="text-gray-400">Delivered</span>
                    )}
                  </h1>
                  <button
                    onClick={changeHandler}
                    className="text-white bg-blue-400 py-1 rounded my-2"
                  >
                    Change Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const ProductDetails = ({
  name,
  photo,
  price,
  quantity,
  _id,
}: OrderItemType) => {
  return (
    <>
      <div className=" bg-gray-50  rounded col-span-1 mb-8 flex justify-center shadow-sm">
        <div className="flex flex-col">
          {/* <h1 className="text-end mx-8 mt-4">
            {quantity >= 10 ? (
              <span className="text-green-400 uppercase">
                In Stock - {quantity}
              </span>
            ) : (
              <span className="text-red-500 uppercase">
                Low Stock - {quantity}
              </span>
            )}
          </h1> */}
          <img
            className="mx-8 my-6 rounded-sm md:h-[400px]"
            src={photo}
            alt="productImage"
          />
          <h1 className="text-center text-2xl font-normal">{name}</h1>
          {/* <h1 className="text-center text-2xl font-semibold">${price}</h1> */}
          <h1 className="text-center text-2xl mt-2 font-light text-green-400">
            Total : {quantity} * {price} = ${price * quantity}
          </h1>
        </div>
      </div>
    </>
  );
};

export default TransactionManage;
