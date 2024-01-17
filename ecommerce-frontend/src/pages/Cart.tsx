import CartItem from "../components/CartItem";

const Cart = () => {
  return (
    <div className="container mx-auto grid grid-cols-4 mt-12 gap-6 h-[85vh] scroll-p-0">
      <div className="col-span-3 overflow-y-auto no-scrollbar">
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </div>

      <div className="container mt-12 mx-auto shadow-sm col-span-1 max-h-[85vh] ">
        <h1 className="text-center text-2xl uppercase py-2 mt-12">
          Cart Details
        </h1>
        <div className="flex flex-col mx-12 mt-8 space-y-2">
          <p className="font-light text-lg">Product Name : Camera </p>
          <p className="font-light text-lg">Product Price : $500 </p>
          <p className="font-light text-lg">Shipping Charge : $100 </p>
          <p className="font-light text-lg">Tax : 13%</p>
          <p className="font-light text-lg">Address : Sankhamul</p>
          <p className="font-light text-lg">Discount : -$100</p>
          <h1 className="text-2xl">Total : $630</h1>
          <button className="bg-blue-400 text-white py-1 px-4 rounded-sm hover:opacity-95 hover:shadow-md">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
