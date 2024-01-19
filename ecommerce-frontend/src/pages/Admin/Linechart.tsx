import React from "react";

import AdminSideBar from "../../components/AdminSideBar";
import { LineChart } from "../../components/Charts";

const Linechart = () => {
  return (
    <>
      <main className="grid grid-cols-5 gap-2 m-xy-2 h-screen">
        <AdminSideBar />
        <div className="col-span-4 mt-8 mx-8 overflow-y-auto mb-4 no-scrollbar">
          <div className="flex items-center">
            <h2 className="uppercase">Linechart</h2>
          </div>
          <section className="mt-12">
            <LineChart
              name_1="User"
              fill={false}
              name_2="Product"
              data_1={[12, 22, 34, 45, 56, 65, 22, 34, 45, 56, 65, 10]}
              data_2={[23, 34, 21, 23, 45, 56, 34, 21, 23, 45, 56, 12]}
            />
            <h1 className="text-center font-light mt-4 uppercase">
              User & Total Products
            </h1>
          </section>
          <section className="mt-12 mb-2">
            <LineChart
              name_1="Discount"
              data_1={[12, 22, 34, 45, 56, 65, 22, 34, 45, 56, 65, 10]}
              data_2={[]}
              fill={true}
            />
            <h1 className="text-center font-light mt-4 uppercase">
              Total Discount
            </h1>
          </section>
          <section className="mt-12 mb-2">
            <LineChart
              name_1="Revenue"
              data_1={[12, 22, 34, 45, 56, 65, 22, 34, 45, 56, 65, 10]}
              data_2={[]}
              borderColor="rgb(55, 219, 69)"
              backgroundColor="rgb(221,255,221)"
              fill={true}
            />
            <h1 className="text-center font-light mt-4 uppercase">
              Total  Revenue
            </h1>
          </section>
        </div>
      </main>
    </>
  );
};

export default Linechart;
