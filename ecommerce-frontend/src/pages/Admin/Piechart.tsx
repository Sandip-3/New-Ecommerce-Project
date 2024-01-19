import React from "react";
import AdminSideBar from "../../components/AdminSideBar";
import { DoughnutChart, PieChart } from "../../components/Charts";

const Piechart = () => {
  return (
    <>
      <main className="grid grid-cols-5 gap-2 m-xy-2 h-screen">
        <AdminSideBar />
        <div className="col-span-4 mt-8 mx-8 overflow-y-auto no-scrollbar">
          <div className=" ">
            <h2 className="uppercase">Piechart</h2>
          </div>
          <div className="w-full flex justify-center mt-8 ">
            <section className="mb-12 w-[40vw] h-[60vh] ">
              <PieChart
                labels={["Processing", "Delivered", "Shipped"]}
                dataSet={[12, 30, 50]}
                backgroundColor={[
                  "rgb(255, 206, 86, 1)",
                  "rgb(153, 102, 255, 1)",
                  "rgb(255, 159, 64, 1)",
                ]}
                offset={[0, 0, 50]}
              />
              <h1 className="text-center font-light mt-4 uppercase">
                Order Fullfilment ratio
              </h1>
            </section>
          </div>
          <div className="w-full flex justify-center mt-8 ">
            <section className="mb-12 w-[40vw] h-[60vh] ">
              <DoughnutChart
                labels={["Lapptop", "Watch", "Mobiles"]}
                data={[12, 13, 40]}
                backgroundColor={[
                  "rgb(255, 06, 86, 1)",
                  "rgb(153, 02, 255, 1)",
                  "rgb(55, 29, 64, 1)",
                ]}
                              cutout={"70%"}
                              offset={[0,0,50]}
              />
              <h1 className="text-center font-light mt-4 uppercase">
                Items Available
              </h1>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Piechart;
