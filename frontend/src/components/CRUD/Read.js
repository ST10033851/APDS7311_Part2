import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { color2, account_circle, lock, mail } from "../../assets";

function Read() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const recipient = "Jereshan2";

        const response = await axios.get(`/api/${recipient}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data);
      } catch (err) {
        setError("You are not authorised to view transactions");
      }
    };
    fetchTransactions();
  }, []);

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
          View Transactions
        </h1>
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
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Delete</span>
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
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Read;
