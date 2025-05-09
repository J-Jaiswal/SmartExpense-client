import React, { useEffect, useState } from "react";
import Axios from "axios";
import { format } from "date-fns";

const paginate = (data, page, entriesPerPage = 5) => {
  const startIndex = (page - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  return data.slice(startIndex, endIndex);
};

const DebitHistory = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const serverURL = import.meta.env.VITE_BASE_URL;

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 8;

  const totalPages = Math.ceil(expenses.length / entriesPerPage);
  const paginatedExpenses = paginate(expenses, currentPage, entriesPerPage);

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
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setExpenses(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching expense history:", err.message);
        setError("Failed to fetch expense history. Please try again.");
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const deleteExpense = async (_id) => {
    const token = localStorage.getItem("token");

    try {
      await Axios.delete(`${serverURL}/api/expense/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenses(expenses.filter((expense) => expense._id !== _id));
    } catch (err) {
      console.error("Error deleting expense:", err.message);
    }
  };

  const getTotalExpenses = (expenses) => {
    if (!Array.isArray(expenses)) return 0;
    return expenses.reduce(
      (total, expense) => total + (expense.amount || 0),
      0
    );
  };

  const total = getTotalExpenses(expenses);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">Loading expense history...</p>
      </div>
    );
  }

  if (!localStorage.getItem("token")) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-700">
          Please log in to view your expense history.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center px-4">
      <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[50%] bg-white rounded-lg shadow-lg border-t-2 p-4 sm:p-6">
        {/* Header Section */}
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            DEBIT HISTORY
          </h2>
          <div className="font-bold text-md sm:text-lg p-2 text-[#f23333] border-[2px] border-[#f23333] rounded-lg">
            ₹ {new Intl.NumberFormat().format(total)} /-
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-2 sm:px-4">Description</th>
                <th className="py-2 px-2 sm:px-4">Amount</th>
                <th className="py-2 px-2 sm:px-4">Date</th>
                <th className="py-2 px-2 sm:px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedExpenses.length > 0 ? (
                paginatedExpenses.map((expense) => (
                  <tr key={expense._id} className="border-t">
                    <td className="py-2 px-2 sm:px-4">{expense.description}</td>
                    <td className="py-2 px-2 sm:px-4">
                      ₹ {new Intl.NumberFormat().format(expense.amount)}
                    </td>
                    <td className="py-2 px-2 sm:px-4">
                      {format(new Date(expense.date), "MMMM dd, yyyy")}
                    </td>
                    <td
                      className="py-2 px-2 sm:px-4 text-[#db4c4c] hover:text-[#9a3030] cursor-pointer"
                      onClick={() => deleteExpense(expense._id)}
                    >
                      Delete
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-4 text-center text-gray-500 font-medium"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {expenses.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded text-sm sm:text-base ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#387478] text-white hover:bg-[#578e92]"
              }`}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded text-sm sm:text-base ${
                  currentPage === i + 1
                    ? "bg-[#387478] text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded text-sm sm:text-base ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#387478] text-white hover:bg-[#578e92]"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebitHistory;
