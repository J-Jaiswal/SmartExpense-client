import React, { useState } from "react";
import Axios from "axios";

const Debit = () => {
  const serverURL = import.meta.env.VITE_BASE_URL;

  const [expense, setExpense] = useState({
    // expenseName: "",
    description: "",
    date: "",
    // time: "",
    amount: "",
    // category: "",
    // paymentMethod: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const addExpense = async () => {
    const { description, date, amount } = expense;
    if (
      // !expenseName ||
      !description ||
      !date ||
      // !time ||
      !amount
      // !category ||
      // !paymentMethod
    ) {
      setError("Please fill out all fields before submitting.");
      return;
    }

    console.log("Fuction runned");
    try {
      await Axios.post(`${serverURL}/api/expense/add`, expense);
      // const response = await getUserTransactions();
      setExpense({});
      console.log("Expense added successfully");
      window.location.reload();
      alert("Expense added successfully");
    } catch (error) {
      console.log("Error in adding expense:", error);
    }
  };

  // console.log(expense);
  return (
    <div className="flex items-center justify-center bg-gray-100 p-4">
      <div className="w-[300px] bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Expense
        </h2>
        <div className="space-y-4">
          {/* Expense Name */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              // value={expense.amount}
              onChange={handleInputChange}
              placeholder="Enter Amount"
              className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>
          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              onChange={handleInputChange}
              placeholder="E.g., Canteen"
              className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          {/* Date Picker */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date & Time
            </label>
            <input
              type="datetime-local"
              id="date"
              onChange={handleInputChange}
              className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              // type="submit"
              className="w-full bg-[#4fab9a] text-white font-semibold py-3 rounded-lg shadow-md hover:bg-[#bed4d9] transition duration-300"
              onClick={addExpense}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debit;
