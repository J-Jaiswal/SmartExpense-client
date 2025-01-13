import React from "react";

// const expenses = [
//   {
//     description: "Shanhank",
//     amount: "1100",
//     date: " dec 12 , 2024",
//   },
//   {
//     description: "devansh",
//     amount: "2300",
//     date: " dec 12 , 2024",
//   },
// ];
const expenses = [];

const CreditHistory = () => {
  return (
    <div className=" p-6 ">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border-t-2  p-6">
        <div className="w-full flex justify-between px-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Credit
          </h2>
          <div className="font-bold flex text-xl text-[#33f236]">₹ 4500 /-</div>
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
                    <td className="py-2 px-4">₹{expense.amount}</td>
                    <td className="py-2 px-4">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 text-[#db4c4c] hover:text-[#9a3030] cursor-pointer">
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
                    No entry found.
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

export default CreditHistory;
