import React, { useEffect, useState } from "react";
import axios from "axios";

function View() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const recipient = localStorage.getItem("recipient");

        const response = await axios.get('/api/view', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data);
      } catch (err) {
        setError("Please, enter a transaction.");
      }
    };
    fetchAllTransactions();
  }, []);
  
  // This code was inspired by Flowbite
  // Title: Tailwind CSS Table - Flowbite
  // Uploaded by: Flowbite
  // Available at: https://flowbite.com/docs/components/tables/
  return (
    <div className="bg-primary bg-cover h-screen flex justify-center items-center">
      <div
        className="relative overflow-x-auto shadow-md sm:rounded-lg"
        style={{ marginTop: "0px", maxWidth: "80%", margin: "0 auto" }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "50px",
            fontStyle: "bold",
            textAlign: "center",
          }}
          className="text-center text-2xl font-bold my-8"
        >
          View All Transactions
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Transaction Title
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Currency
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Method
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Code
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{item.transactionTitle}</td>
                <td className="px-6 py-4">{item.amount}</td>
                <td className="px-6 py-4">{item.currency}</td>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">{item.transactionStatus}</td>
                <td className="px-6 py-4">{item.paymentMethod}</td>
                <td className="px-6 py-4">{item.paymentCode}</td> 

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default View;