import AdminSideBar from "../../components/AdminSideBar";
import { Barchart } from "../../components/Charts";

const Barcharts = () => {
  return (
    <>
      <main className="grid grid-cols-5 gap-2 m-xy-2 h-screen">
        <AdminSideBar />
        <div className="col-span-4 mt-8 mx-8 overflow-y-auto">
          <div className="flex items-center">
            <h2 className="uppercase">Barchart</h2>
          </div>
          <section className="mt-12">
            <Barchart
              data_1={[
                300, 400, 500, 600, 700, 800, 450, 500, 100, 600, 400, 300,
              ]}
              data_2={[120, 450, 180, 700, 400, 700, 600, 500, 400, 300,303,430]}
              title_1="Products"
              title_2="Users"
              bg_color_1="rgb(245, 159, 39)"
              bg_color_2="rgb(42, 120, 245)"
            />
            <h1 className="text-center font-light mt-4 uppercase">
              Top Selling Porduct and Top Customers
            </h1>
          </section>
          <section className="mt-12 mb-8">
            <Barchart
              horizontal={true}
              data_1={[
                300, 400, 500, 600, 700, 800, 450, 500, 100, 600, 400, 300,
              ]}
              data_2={[]}
              title_1="Products"
              title_2=""
              bg_color_1="rgb(42, 191, 55)"
              bg_color_2=""
            />
            <h1 className="text-center font-light mt-4 uppercase">
              All Year Orders
            </h1>
          </section>
        </div>
      </main>
    </>
  );
};

export default Barcharts;
