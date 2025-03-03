import React from "react";
import { format } from "date-fns";

const FilteredExpenses = ({ filteredExpenses, expenses }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Filtered Expenses
      </h3>

      {filteredExpenses.length === expenses.length ? (
        <p className="mt-4 text-gray-500">
          Please select a filter to view transactions.
        </p>
      ) : (
        <div>
          {filteredExpenses.length > 0 ? (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="py-2 px-4 border">Date</th>
                      <th className="py-2 px-4 border">Description</th>
                      <th className="py-2 px-4 border">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpenses.map((expense) => (
                      <tr key={expense.id} className="text-center border-b">
                        <td className="py-2 px-4 border">
                          {format(new Date(expense.date), "MMMM dd, yyyy")}
                        </td>
                        <td className="py-2 px-4 border">
                          {expense.description || "N/A"}
                        </td>
                        <td className="py-2 px-4 border">₹{expense.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List */}
              <div className="block md:hidden space-y-4">
                {filteredExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="border border-gray-300 rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">
                        {format(new Date(expense.date), "MMMM dd, yyyy")}
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        ₹{expense.amount}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      {expense.description || "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-600">No expenses found in this range.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FilteredExpenses;
