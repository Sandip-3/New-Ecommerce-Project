import { useState } from "react";
import SearchProductCard from "../components/SearchProductCard";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  return (
    <>
      <div className="container mx-auto mt-12 gap-4 grid grid-cols-4 h-[85vh]">
        <div className="col-span-1 shadow-xl h-[85vh]">
          <h2 className="text-center mt-2 text-xl py-2 font-bold">Filters</h2>
          <div className="mx-8 space-y-2">
            <h4>Sort</h4>
            <select
              className="py-1 px-2 w-full border-2 rounded-sm outline-none"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">None</option>
              <option value="asc">Price (Low to High)</option>
              <option value="dsc">Price (High to Low)</option>
            </select>
          </div>
          <div className="mx-8 mt-4 space-y-2">
            <h2>Max Price : {maxPrice || ""}</h2>
            <input
              className="w-full"
              type="range"
              min={100}
              max={100000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
          <div className="mx-8  mt-4 space-y-2">
            <h4>Categories</h4>
            <select
              className="py-1 px-2  w-full border-2 rounded-sm outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="laptop">Laptop</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>
        </div>
        <div className="container mx-auto col-span-3 shadow-sm overflow-y-auto h-[85vh] no-scrollbar">
          <div className="flex justify-around items-center gap-20 mx-8 ">
            <h1 className="uppercase ">Products</h1>
            <input
              className="border-b-2 py-1 outline-none w-full text-lg font-light focus:border-blue-500"
              type="text"
              value={search}
              placeholder="Search Products"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="Products mt-2 grid grid-cols-3 gap-4 ">
            <SearchProductCard
              name="Laptop"
              price={900}
              image="/images/laptop.jpg"
              _id="asdf"
              stock={10}
            />
            <SearchProductCard
              name="Mobile"
              price={400}
              image="/images/mobile.jpeg"
              _id="asdfghi"
              stock={10}
            />
            <SearchProductCard
              name="Camera"
              price={200}
              image="/images/canon.webp"
              _id="asdfgh"
              stock={10}
            />
            <SearchProductCard
              name="PlayStation"
              price={1000}
              image="/images/ps5.jpg"
              _id="asdfg"
              stock={10}
            />
            <SearchProductCard
              name="Camera"
              price={100}
              image="/images/image.avif"
              _id="asdfg"
              stock={10}
            />
          </div>
          <div className="container mx-auto mt-4 mb-4">
            <div className="flex justify-center items-center gap-4">
              <button
                className={
                  page === 1
                    ? "disabled px-2 py-1 bg-gray-500 rounded-full text-white font-normal"
                    : "px-2 py-1 bg-gray-500 rounded-full text-white font-normal"
                }
                onClick={() => {
                  if (page === 1) return;
                  else setPage(page - 1);
                }}
              >
                <FaLongArrowAltLeft />
              </button>
              <p className="font-mono text-lg">{page}</p>
              <button
                className={
                  "px-2 py-1 bg-gray-500 rounded-full text-white font-normal"
                }
                onClick={() => setPage(page + 1)}
              >
                <FaLongArrowAltRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
