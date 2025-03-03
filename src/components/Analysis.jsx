import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
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
  ResponsiveContainer,
} from "recharts";

dayjs.extend(isoWeek);

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28CFE",
  "#FF6361",
  "#58508D",
];

const Analysis = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const serverURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await Axios.get(
          `${serverURL}/api/expense/getExpense`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setExpenses(response.data);
        processFilters(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching expense history:", err.message);
        setError("Failed to fetch expense history. Please try again.");
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const processFilters = (data) => {
    if (data.length === 0) return;

    const uniqueWeeks = [];
    const uniqueMonths = new Set();
    const allMonths = [
      "December 2024",
      ...Array.from({ length: 12 }, (_, i) =>
        dayjs().year(2025).month(i).format("MMMM YYYY")
      ),
    ];

    data.forEach((expense) => {
      const expenseDate = dayjs(expense.date);
      const monthYear = expenseDate.format("MMMM YYYY");
      uniqueMonths.add(monthYear);

      const totalDays = expenseDate.daysInMonth();
      const weekOfMonth = Math.ceil(expenseDate.date() / 7);
      let weekLabel = `${monthYear} - Week ${weekOfMonth}`;

      if (weekOfMonth === 5 || expenseDate.date() > totalDays - 3) {
        weekLabel = `${monthYear} - Week 5`;
      }

      if (!uniqueWeeks.includes(weekLabel)) {
        uniqueWeeks.push(weekLabel);
      }
    });

    setWeeks(uniqueWeeks);
    setMonths([...new Set([...allMonths, ...uniqueMonths])]);
    if (uniqueWeeks.length > 0) setSelectedWeek(uniqueWeeks[0]);
    if (uniqueMonths.size > 0) setSelectedMonth([...uniqueMonths][0]);
  };

  useEffect(() => {
    if (selectedWeek && selectedMonth) {
      const [monthYear, weekNum] = selectedWeek.split(" - Week ");
      const firstDay = dayjs(`${monthYear} 1`, "MMMM YYYY D").startOf("month");
      const startOfWeek = firstDay.add((parseInt(weekNum) - 1) * 7, "day");
      const weekDays = Array.from({ length: 7 }, (_, i) =>
        startOfWeek.add(i, "day").format("YYYY-MM-DD")
      );

      const groupedByDay = weekDays.map((date) => {
        const dayExpense = expenses.filter(
          (expense) => dayjs(expense.date).format("YYYY-MM-DD") === date
        );
        const totalAmount = dayExpense.reduce(
          (sum, exp) => sum + exp.amount,
          0
        );
        return {
          date: dayjs(date).format("ddd, MMM D"), // Shortened day name
          amount: totalAmount || 0,
        };
      });

      setFilteredExpenses(groupedByDay);
    }
  }, [selectedWeek, selectedMonth, expenses]);

  if (loading) return <div>Loading...</div>;
  if (!localStorage.getItem("token")) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-700">
          Please log in to view your expense analysis.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="w-full max-w-4xl bg-[#e9e9e9] rounded-2xl p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Weekly Expense Analysis
        </h2>

        <div className="flex flex-wrap justify-center gap-4 md:gap-10 w-full">
          <div className="flex flex-col w-full sm:w-full md:w-[400px]">
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Select Month:
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="block w-full p-2 border rounded-lg"
              >
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <label className="block text-gray-700 font-medium mb-2">
                Select Week:
              </label>
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                className="block w-full p-2 border rounded-lg"
              >
                {weeks.map((week, index) => (
                  <option key={index} value={week}>
                    {week}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bar Chart - Scrollable */}
        <div className="w-full overflow-x-auto overflow-y-auto max-h-[400px] my-6">
          <div className="bg-white p-4 rounded-lg shadow-md w-full min-w-[600px]">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Daily Expenses
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredExpenses}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                  height={100}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="amount"
                  fill="#82ca9d"
                  label={{ position: "top" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="flex justify-center my-6 bg-white p-4 rounded-lg shadow-md w-full">
          <PieChart width={300} height={300}>
            <Pie
              data={filteredExpenses}
              dataKey="amount"
              nameKey="date"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {filteredExpenses.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
