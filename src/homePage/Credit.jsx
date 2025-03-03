import React from "react";

// Currently not functional with no backend
const Credit = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full sm:w-[350px] md:w-[400px] bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Income
        </h2>
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
              placeholder="E.g., Salary, Bonus"
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
              className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-[#387478] text-white font-semibold py-3 rounded-lg shadow-md hover:bg-[#62A388] transition duration-300"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credit;
