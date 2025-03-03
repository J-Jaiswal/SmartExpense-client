import React, { useState } from "react";
import Axios from "axios";

const Debit = () => {
  const serverURL = import.meta.env.VITE_BASE_URL;
  const [expense, setExpense] = useState({
    description: "",
    date: "",
    amount: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const addExpense = async () => {
    const { description, date, amount } = expense;
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in to add expenses.");
      return;
    }

    if (!description || !date || !amount) {
      setError("Please fill out all fields before submitting.");
      return;
    }

    try {
      await Axios.post(
        `${serverURL}/api/expense/add`,
        { description, date, amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Expense added successfully!");
      setExpense({ description: "", date: "", amount: "" });
      setError("");
    } catch (error) {
      console.error("Error in adding expense:", error);
      setError("Failed to add expense. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full sm:w-[350px] md:w-[400px] bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Expense
        </h2>

        {/* Error & Success Messages */}
        {error && (
          <p className="text-red-500 bg-red-100 p-2 rounded text-center mb-4">
            {error}
          </p>
        )}
        {successMessage && (
          <p className="text-green-500 bg-green-100 p-2 rounded text-center mb-4">
            {successMessage}
          </p>
        )}

        <div className="space-y-5">
          {/* Amount Input */}
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
              value={expense.amount}
              onChange={handleInputChange}
              placeholder="Enter Amount"
              className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          {/* Description Input */}
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
              value={expense.description}
              onChange={handleInputChange}
              placeholder="E.g., Canteen"
              className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          {/* Date & Time Picker */}
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
              value={expense.date}
              onChange={handleInputChange}
              className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              className="w-full bg-[#387478] text-white font-semibold py-3 rounded-lg shadow-md hover:bg-[#62A388] transition duration-300"
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
