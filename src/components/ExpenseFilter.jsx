import React, { useState } from "react";

const ExpenseFilter = ({ expenses, onFilter }) => {
  const [customMin, setCustomMin] = useState("");
  const [customMax, setCustomMax] = useState("");

  const filterExpenses = (min, max) => {
    const filtered = expenses.filter((expense) => {
      return expense.amount >= min && (max === null || expense.amount <= max);
    });
    onFilter(filtered);
  };

  const handleCustomFilter = (e) => {
    e.preventDefault();
    const min = customMin ? Number(customMin) : 0;
    const max = customMax ? Number(customMax) : null;
    filterExpenses(min, max);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Filter Expenses by Amount
      </h3>

      {/* Predefined Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          onClick={() => filterExpenses(0, 49)}
        >
          Less than ₹50
        </button>
        <button
          className="px-4 py-2 bg-[#387478] text-white rounded-lg hover:bg-[#578e92]"
          onClick={() => filterExpenses(50, 100)}
        >
          ₹50 - ₹100
        </button>
        <button
          className="px-4 py-2 bg-[#387478] text-white rounded-lg hover:bg-[#578e92]"
          onClick={() => filterExpenses(100, 200)}
        >
          ₹100 - ₹200
        </button>
        <button
          className="px-4 py-2 bg-[#387478] text-white rounded-lg hover:bg-[#578e92]"
          onClick={() => filterExpenses(200, 500)}
        >
          ₹200 - ₹500
        </button>
        <button
          className="px-4 py-2 bg-[#387478] text-white rounded-lg hover:bg-[#578e92]"
          onClick={() => filterExpenses(500, 1000)}
        >
          ₹500 - ₹1000
        </button>
        <button
          className="px-4 py-2 bg-[#c03329] text-white rounded-lg hover:bg-[#c75b57]"
          onClick={() => filterExpenses(1000, null)}
        >
          Above ₹1000
        </button>
      </div>

      {/* Custom Amount Filter */}
      <form onSubmit={handleCustomFilter} className="flex gap-2">
        <input
          type="number"
          value={customMin}
          onChange={(e) => setCustomMin(e.target.value)}
          placeholder="Min Amount"
          className="p-2 border rounded-lg w-1/2 focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          value={customMax}
          onChange={(e) => setCustomMax(e.target.value)}
          placeholder="Max Amount"
          className="p-2 border rounded-lg w-1/2 focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#457838] text-white rounded-lg hover:bg-[#639257]"
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default ExpenseFilter;
