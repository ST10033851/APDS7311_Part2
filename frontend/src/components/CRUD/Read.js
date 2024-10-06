import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import EditTransactionModal from "../EditTransactionModal.js";

function Read() {
  const [transactions, setTransactions] = useState([]);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const recipient = localStorage.getItem("recipient");

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

  // This code was inspired by a YouTube video
  // Title: JavaScript CRUD Application With Local Storage - CRUD Operations In JS
  // Uploaded by: Dear Programmer
  // Available at: https://www.youtube.com/watch?v=AX9k9bjCBD0
  const deleteTransaction = async () => {
    if (!transactionToDelete) return;

    const id = transactionToDelete._id;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions(transactions.filter((item) => item._id !== id));
      setTransactionToDelete(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete transaction");
    }
  };

  // This code was inspired by a YouTube video
  // Title: JavaScript CRUD Application With Local Storage - CRUD Operations In JS
  // Uploaded by: Dear Programmer
  // Available at: https://www.youtube.com/watch?v=AX9k9bjCBD0
  const confirmDelete = (transaction) => {
    setTransactionToDelete(transaction);
  };

  const cancelDelete = () => {
    setTransactionToDelete(null);
  };

  // This code was inspired by a YouTube video
  // Title: JavaScript CRUD Application With Local Storage - CRUD Operations In JS
  // Uploaded by: Dear Programmer
  // Available at: https://www.youtube.com/watch?v=AX9k9bjCBD0
  const handleUpdateTransaction = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`/api/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions(
        transactions.map((item) => (item._id === id ? response.data : item))
      );
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update transaction");
    }
  };

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
          View Transactions
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
                    onClick={() => setTransactionToEdit(item)}
                  >
                    Edit
                  </a>
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-red-500 hover:underline"
                    onClick={() => confirmDelete(item)}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 
          This code was inspired by a YouTube video
          Title: JavaScript CRUD Application With Local Storage - CRUD Operations In JS
          Uploaded by: Dear Programmer
          Available at: https://www.youtube.com/watch?v=AX9k9bjCBD0 */}
        {transactionToDelete && (
          <DeleteConfirmationModal
            transaction={transactionToDelete}
            onDelete={deleteTransaction}
            onCancel={cancelDelete}
          />
        )}

        {transactionToEdit && (
          <EditTransactionModal
            transaction={transactionToEdit}
            onClose={() => setTransactionToEdit(null)}
            onUpdate={handleUpdateTransaction}
          />
        )}
      </div>
    </div>
  );
}

export default Read;
