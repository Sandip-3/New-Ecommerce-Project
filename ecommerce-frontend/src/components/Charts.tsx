import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  PointElement,
  LineElement,
  ChartData,
  ChartOptions,
  Filler,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Filler,
  Title,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Ocotber",
  "November",
  "December",
];

type BarchartProps = {
  horizontal?: boolean;
  data_1: number[];
  data_2: number[];
  title_1: string;
  title_2: string;
  bg_color_1: string;
  bg_color_2: string;
  labels?: string[];
};

export const Barchart = ({
  horizontal,
  data_1,
  data_2,
  title_1,
  title_2,
  bg_color_1,
  bg_color_2,
  labels = months,
}: BarchartProps) => {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    indexAxis: horizontal ? "y" : "x",
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Sandy Chart",
      },
    },
  };

  const data: ChartData<"bar", number[], string> = {
    labels,
    datasets: [
      {
        label: title_1,
        data: data_1,
        backgroundColor: bg_color_1,
      },
      {
        label: title_2,
        data: data_2,
        backgroundColor: bg_color_2,
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

type PieProps = {
  labels: string[];
  dataSet: number[];
  backgroundColor: string[];
  offset?: number[];
};

export const PieChart = ({
  labels,
  dataSet,
  backgroundColor,
  offset,
}: PieProps) => {
  const data: ChartData<"pie", number[], string> = {
    labels,
    datasets: [
      {
        data: dataSet,
        backgroundColor: backgroundColor,
        borderWidth: 1,
        offset,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Sandy Chart",
      },
    },
  };

  return (
    <>
      <Pie data={data} options={options} />
    </>
  );
};

interface DoughnutChartProps {
  labels: string[];
  data: number[];
  backgroundColor: string[];
  cutout?: number | string;
  legends?: boolean;
  offset?: number[];
}

export const DoughnutChart = ({
  labels,
  data,
  backgroundColor,
  cutout,
  legends = true,
  offset,
}: DoughnutChartProps) => {
  const doughnutData: ChartData<"doughnut", number[], string> = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 0,
        offset,
      },
    ],
  };

  const doughnutOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        display: legends,
        position: "top",
        labels: {
          padding: 40,
        },
      },
    },
    cutout,
  };

  return <Doughnut data={doughnutData} options={doughnutOptions} />;
};

type LineProps = {
  name_1: string;
  name_2?: string;
  data_1: number[];
  data_2: number[];
  labels?: string[];
  fill: boolean;
  borderColor?: string;
  backgroundColor?: string;
};

export const LineChart = ({
  name_1,
  name_2,
  data_1,
  data_2,
  labels,
  fill = false,
  borderColor = "rgb(255, 99, 132)",
  backgroundColor = "rgba(255, 99, 132, 0.5)",
}: LineProps) => {
  const lineOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Sandy Line Chart",
      },
    },
  };

  const dataLineChart: ChartData<"line", number[], string> = {
    labels: labels ? labels : months,
    datasets: [
      {
        label: name_1,
        data: data_1,
        borderColor: borderColor ? borderColor : "rgb(255, 99, 132)",
        backgroundColor: backgroundColor
          ? backgroundColor
          : "rgba(255, 99, 132, 0.5)",
        fill: fill,
      },
      {
        label: name_2,
        data: data_2,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <>
      <Line options={lineOptions} data={dataLineChart} />
    </>
  );
};
