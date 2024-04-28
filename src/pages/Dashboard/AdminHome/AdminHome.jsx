import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaFileAlt, FaUsers } from "react-icons/fa";
import { GiForkKnifeSpoon, GiGroundSprout } from "react-icons/gi";
// import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const colors = ["darkBlue", "DeepPink", "green", "royalBlue", "red", "purple"];
const COLORS = ["darkBlue", "DeepPink", "green", "royalBlue", "red", "purple"];
// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });

  // custom shape for the bar chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // custom shape for pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = chartData.map((data) => {
    return { name: data.category, value: data.revenue };
  });

  // demo data for barchart
  const data = [
    {
      name: "Pizza",
      uv: 14,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Dessert",
      uv: 8,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Soup",
      uv: 10,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Salad",
      uv: 6,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Drinks",
      uv: 11,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Offered",
      uv: 9,
      pv: 3800,
      amt: 2500,
    },
  ];

  // demo data for pie chart
  const pieData = [
    { name: "Pizza", value: 12 },
    { name: "Dessert", value: 6 },
    { name: "Soup", value: 10 },
    { name: "Salad", value: 6 },
    { name: "Drinks", value: 11 },
    { name: "Offered", value: 9 },
  ];
  return (
    <div className="text-center">
      <h2 className=" text-lg font-semibold mb-8">
        <span>Hi... </span>
        <span className="text-[#FF00FF] text-xl font-bold opacity-80">
          {user?.displayName ? user.displayName : ""}
        </span>
        <span>
          {" "}
          !!! Welcome to{" "}
          <span className="bg-slate-50 px-2 mx-1 pb-[1px] rounded-lg">
            Happy Bites
          </span>{" "}
        </span>
      </h2>
      {/* <div className="mb-10">
        <Divider title={"Admin Home"}></Divider>
      </div> */}
      <div className="stats shadow w-full">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <GiGroundSprout className="text-3xl"></GiGroundSprout>
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value">{stats.revenue}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <GiForkKnifeSpoon className="text-3xl"></GiForkKnifeSpoon>
          </div>
          <div className="stat-title">Total Items</div>
          <div className="stat-value">{stats.menuItems}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUsers className="text-3xl"></FaUsers>
          </div>
          <div className="stat-title">Total Clients</div>
          <div className="stat-value">{stats.users}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaFileAlt className="text-3xl"></FaFileAlt>
          </div>
          <div className="stat-title">Total Orders</div>
          <div className="stat-value">{stats.orders}</div>
          <div className="stat-desc">↗︎ 90 (14%)</div>
        </div>
      </div>
      <div className="flex ">
        <div className="w-3/4 py-10">
          {/* demo barchart for demo data start */}
          <BarChart
            width={600}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar
              dataKey="uv"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
          {/* demo barchart for demo data end */}

          {/* -------------------------------------divider------------------------------------------------ */}
          {/* original barchart for dynamic data from database start */}
          <BarChart
            width={600}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
          {/* original barchart for dynamic data from database end */}
        </div>
        <div className="pt-10">
          {/*---------------- demo piechart------------------ */}
          <PieChart width={300} height={300}>
            <Legend></Legend>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>

          {/* ---------------------------------------divider--------------------------------------------- */}

          {/* original pie chart */}
          <PieChart width={300} height={300}>
            <Legend></Legend>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
