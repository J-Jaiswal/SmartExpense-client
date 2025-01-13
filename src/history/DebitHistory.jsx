import React, { useEffect, useState } from "react";
import Axios from "axios";
import { format } from "date-fns";

const DebitHistory = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const serverURL = import.meta.env.VITE_BASE_URL;

  // Example:
  // const date = new Date(); // Current date and time
  // const formattedDate = format(date, "MMMM dd, yyyy");
  // console.log(formattedDate);

  // Fetch all expenses from the backend
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await Axios.get(`${serverURL}/api/expense/getExpense`);
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
    try {
      const res = await Axios.delete(`${serverURL}/api/expense/${_id}`);
      // await getUserTransactions();
      // toast.info("Transaction deleted successsfully");
      alert("Expense deleted successfully!");
      window.location.reload();
      // console.log("Transaction deleted successsfully");
    } catch (err) {
      console.log("Error in deleting transaction", err);
      alert("Error in deleting transaction ", err);
    }
  };

  const getTotalExpenses = (expenses) => {
    if (!Array.isArray(expenses)) {
      throw new Error("Invalid input: expected an array");
    }

    return expenses.reduce((total, expense) => {
      return total + (expense.amount || 0); // Add amount if it exists, otherwise add 0
    }, 0);
  };

  const total = getTotalExpenses(expenses);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">Loading expense history...</p>
      </div>
    );
  }

  // const getPerDayExpenses = (expenses) => {
  //   return expenses.reduce((acc, { date, amount = 0 }) => {
  //     if (!date) return acc; // Skip if date is missing
  //     acc[date] = (acc[date] || 0) + amount; // Sum amounts for each date
  //     return acc;
  //   }, {});
  // };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className=" p-6 ">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border-t-2 p-6">
        <div className="w-full flex items-center justify-between px-4 py-2 mb-3 ">
          <div className="text-2xl font-bold text-center text-gray-800  underline">
            Debit
          </div>
          <div className="font-bold flex text-md p-2 text-[#f23333] border-[2px] border-[#f23333] rounded-lg">
            {/* ₹ {total}/- */}₹ {new Intl.NumberFormat().format(total)} /-
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length > 0 ? (
                expenses.map((expense) => (
                  <tr key={expense._id} className="border-t">
                    <td className="py-2 px-4">{expense.description}</td>
                    <td className="py-2 px-4">₹ {expense.amount}</td>
                    <td className="py-2 px-4">
                      {format(expense.date, "MMMM dd, yyyy")}
                      {/* {new Date(expense.date).toLocaleDateString()} */}
                    </td>
                    <td
                      className="py-2 px-4 text-[#db4c4c] hover:text-[#9a3030] cursor-pointer"
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
                    No expenses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DebitHistory;
