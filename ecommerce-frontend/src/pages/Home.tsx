import { Link } from "react-router-dom";
import HomeProduct from "./HomeProduct";

const Home = () => {
  return (
    <>
      <div className="container mx-auto  mt-6 mb-8">
        <img
          className="w-full h-[35vh] object-cover rounded-md"
          src="/images/image.avif"
          alt="productBanner"
        />
        <div className="px-4 w-full flex items-center justify-between mt-8 ">
          <h1 className="uppercase font-light text-gray-500 text-2xl  tracking-wider">
            Latest Products
          </h1>
          <Link to={"/search"} className="text-lg font-light text-gray-400">
            See more
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-4 overflow-x-auto h-[45vh] no-scrollbar">
          <HomeProduct
            name="Laptop"
            price={900}
            image="/images/laptop.jpg"
            _id="asdf"
            stock={10}
          />
          <HomeProduct
            name="Mobile"
            price={400}
            image="/images/mobile.jpeg"
            _id="asdfghi"
            stock={10}
          />
          <HomeProduct
            name="Camera"
            price={200}
            image="/images/canon.webp"
            _id="asdfgh"
            stock={10}
          />
          <HomeProduct
            name="PlayStation"
            price={1000}
            image="/images/ps5.jpg"
            _id="asdfg"
            stock={10}
          />
          <HomeProduct
            name="Camera"
            price={100}
            image="/images/image.avif"
            _id="asdfg"
            stock={10}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
