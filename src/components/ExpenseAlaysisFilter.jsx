import React, { useEffect, useState } from "react";
import Axios from "axios";
import ExpenseFilter from "./ExpenseFilter";
import FilteredExpenses from "./FilteredExpenses";

const ExpenseAnalysisFilter = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const serverURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found, user is not authenticated.");
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
        setFilteredExpenses(response.data); // ✅ Initially show all expenses
      } catch (err) {
        console.error("Error fetching expenses:", err.message);
      }
    };

    fetchExpenses();
  }, []);

  // ✅ Apply filters based on user input
  useEffect(() => {
    let filtered = [...expenses];

    if (selectedFilter) {
      const filterValue = parseInt(selectedFilter, 10);

      if (filterValue === 1000) {
        filtered = filtered.filter((expense) => expense.amount > 1000);
      } else {
        filtered = filtered.filter((expense) => expense.amount <= filterValue);
      }
    }

    setFilteredExpenses(filtered);
  }, [selectedFilter, expenses]);

  return (
    <div className="flex w-full justify-center">
      <div className="min-h-screen w-[70%] p-6">
        <div className="container mx-auto">
          {/* ✅ Pass All Necessary Props to Filter Component */}
          <ExpenseFilter
            expenses={expenses}
            onFilter={setFilteredExpenses}
            selectedFilter={selectedFilter} // ✅ Preserving Existing Props
            setSelectedFilter={setSelectedFilter} // ✅ Keeping Functionality
          />

          {/* ✅ Ensure Filtered Expenses Component Receives Correct Data */}
          <FilteredExpenses
            filteredExpenses={filteredExpenses}
            expenses={expenses} // ✅ Keeping Original Prop Structure
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseAnalysisFilter;
