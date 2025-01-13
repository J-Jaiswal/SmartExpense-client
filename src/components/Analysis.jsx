import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const Analysis = () => {
  // Mock data for charts
  const expenseData = [
    { category: "Canteen", amount: 150 },
    { category: "Transport", amount: 100 },
    { category: "Groceries", amount: 200 },
    { category: "Bills", amount: 300 },
    { category: "Entertainment", amount: 180 },
  ];

  const trendData = [
    { week: "Week 1", amount: 500 },
    { week: "Week 2", amount: 700 },
    { week: "Week 3", amount: 650 },
    { week: "Week 4", amount: 800 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Data Analysis
        </h2>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Bar Chart
          </h3>
          <BarChart
            width={600}
            height={300}
            data={expenseData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Pie Chart
          </h3>
          <PieChart width={400} height={300}>
            <Pie
              data={expenseData}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {expenseData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Line Chart
          </h3>
          <LineChart
            width={600}
            height={300}
            data={trendData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#ff7300" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
