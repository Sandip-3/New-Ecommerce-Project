import AdminSideBar from "../../components/AdminSideBar";
import { IoIosSearch } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { CiBellOn } from "react-icons/ci";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { Barchart } from "../../components/Charts";
import Table from "../../components/DashboardTable";
import data from "../../assets/data.json";

const Dashboard = () => {
  return (
    <>
      <main className="grid grid-cols-5 gap-2 m-xy-2 h-screen">
        <AdminSideBar />

        <div className="col-span-4 overflow-y-auto scroll-p-0 flex flex-col mt-2  ">
          <nav className="flex gap-2 mr-6 items-center mb-8">
            <IoIosSearch size={25} />
            <input
              className="mr-auto w-full p-2 border-b outline-none text-xl focus:border-blue-400"
              type="text"
              placeholder="Search"
            />
            <CiBellOn size={30} />
            <IoMdPerson size={30} />
          </nav>
          <hr></hr>
          <section className="widgetIndex mt-8 ml-8 mr-8 grid grid-cols-4 gap-4">
            <WidgetItem
              heading="Revenue"
              value={2000}
              amount={true}
              percent={30}
            />
            <WidgetItem
              heading="Revenue"
              value={2000}
              amount={true}
              percent={-20}
            />
            <WidgetItem
              heading="Revenue"
              value={2000}
              amount={true}
              percent={80}
            />

            <WidgetItem
              heading="Revenue"
              value={2000}
              amount={true}
              percent={80}
            />
          </section>

          <section className="BarIndex mt-8 ml-8 mr-8 grid grid-cols-5">
            <div className="col-span-4 h-auto">
              <h1 className="text-center text-2xl font-extralight">
                Transaction and Revenue
              </h1>
              <Barchart
                data_1={[
                  200, 300, 400, 800, 1000, 200, 400, 400, 800, 900, 500,
                ]}
                data_2={[100, 200, 300, 400, 800, 900, 500, 400, 800, 900, 500]}
                title_1={"Revenue"}
                title_2="Transaction"
                bg_color_1="rgb(50, 94, 168)"
                bg_color_2="rgb(50, 125, 168)"
              />
            </div>
            <div className="col-span-1 ml-12">
              <h1 className="text-2xl font-extralight text-center">
                Inventory
              </h1>
              <div className="md:h-[424px] overflow-y-auto  ">
                <ProgressMenu
                  number={20}
                  color="rgb(26, 41, 125)"
                  name="Laptop"
                />
                <ProgressMenu
                  number={80}
                  color="rgb(188, 252, 3)"
                  name="Mobile"
                />
                <ProgressMenu
                  number={50}
                  color="rgb(252, 144, 3)"
                  name="Desktop"
                />
                <ProgressMenu
                  number={60}
                  color="rgb(227, 180, 3)"
                  name="Tablet"
                />
                <ProgressMenu
                  number={60}
                  color="rgb(112, 24, 163)"
                  name="Battery"
                />
                <ProgressMenu
                  number={60}
                  color="rgb(24, 163, 40)"
                  name="Rice-Cooker"
                />
                <ProgressMenu
                  number={60}
                  color="rgb(24, 54, 163)"
                  name="iPhone"
                />
                <ProgressMenu
                  number={60}
                  color="rgb(126, 24, 163)"
                  name="Mac-Book"
                />
              </div>
            </div>
          </section>
          {/* <section className="Table mt-8 ml-8 mr-8 grid grid-cols-5">
                      <div>
                          <Table data={data.transaction} />
            </div>
          </section> */}
        </div>
      </main>
    </>
  );
};

type WidgetProps = {
  heading: string;
  value: number;
  percent: number;
  amount?: boolean;
};

const WidgetItem = ({ heading, value, percent, amount }: WidgetProps) => {
  return (
    <article className="widget">
      <div className="widgetInfo col-span-1 md:flex  justify-center items-center gap-8 shadow-sm rounded-md">
        <div className="ml-4 mb-2">
          <p>{heading}</p>
          <h4>{amount ? `$${value}` : value}</h4>
          {percent > 0 ? (
            <span className="text-green-500">
              <HiTrendingUp /> + {percent}%{""}
            </span>
          ) : (
            <span className="text-red-500">
              <HiTrendingDown /> {percent}%{""}
            </span>
          )}
        </div>
        <div className="mb-2">
          <CircularProgress percentage={percent} />
        </div>
      </div>
    </article>
  );
};

type CircularProp = {
  percentage: number;
};

const CircularProgress = ({ percentage }: CircularProp) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (circumference * percentage) / 100;

  return (
    <div className="flex items-center justify-center">
      <svg
        className="w-16 h-16"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#ccc"
          strokeWidth="10"
        ></circle>

        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#3498db"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        ></circle>

        <text
          className="text-2xl"
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="12"
          fill="#333"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

type ProgressProp = {
  number: number;
  color: string;
  name: string;
};

const ProgressMenu = ({ number, color, name }: ProgressProp) => {
  const progressStyle = {
    width: `${number}%`,
    backgroundColor: color,
  };

  return (
    <>
      <div className="flex mt-8 justify-center items-center space-x-2">
        <span>{name}</span>
        <div className="w-20 bg-gray-300 h-2 rounded-full">
          <div className="h-full rounded-full" style={progressStyle}></div>
        </div>
        <span>{number}%</span>
      </div>
    </>
  );
};
export default Dashboard;
