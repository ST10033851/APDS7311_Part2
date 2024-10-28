import React, { useEffect, useState } from "react";
import axios from "axios";
import EditTransactionModal from "../EditTransactionModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import { FaEdit, FaTrash } from 'react-icons/fa';

function View() {
  const [transactions, setTransactions] = useState([]);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("/api/view", {
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

  const confirmDelete = (transaction) => {
    setTransactionToDelete(transaction);
  };

  const cancelDelete = () => {
    setTransactionToDelete(null);
  };

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

  const submitToSWIFT = async (id) => {
    try {
      const token = localStorage.getItem("token");
      // Make the API call to update the isVerified status
      await axios.put(`/api/${id}/submit`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Update the transactions state with the new isVerified value
      setTransactions(transactions.map((item) => 
        item._id === id ? { ...item, isVerified: "Verified" } : item
      ));
      
      // Set success message
      setSuccessMessage("Transaction submitted to SWIFT successfully!");

      // Clear the message after a short duration
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit transaction to SWIFT");
    }
  };  
  
  // This code was inspired by Flowbite
  // Title: Tailwind CSS Table - Flowbite
  // Uploaded by: Flowbite
  // Available at: https://flowbite.com/docs/components/tables/
  return (
    <div className="bg-primary bg-cover h-screen flex flex-col justify-center items-center">
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
      <div
        className="relative overflow-x-auto shadow-md sm:rounded-lg"
        style={{ maxWidth: "80%", margin: "0 auto", maxHeight: "60vh", overflowY: "auto",}}
      >
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500 font-bold">{successMessage}</p>}
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
              <th scope="col" className="px-6 py-3">
                Verification Status
              </th>
              <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>
              <th scope="col" className="px-6 py-3"><span className="sr-only">Delete</span></th>
              <th scope="col" className="px-6 py-3"><span className="sr-only">Submit</span></th>
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
                <td className="px-6 py-4">{item.isVerified}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => setTransactionToEdit(item)} className="text-blue-600 dark:text-blue-500 hover:text-blue-700" aria-label="Edit transaction">
                    <FaEdit className="h-5 w-5 inline" />
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => confirmDelete(item)} className="text-red-500 hover:text-red-700" aria-label="Delete transaction">
                    <FaTrash className="h-5 w-5 inline" />
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => submitToSWIFT(item._id)} 
                      style={{
                        border: '2px solid green',
                        backgroundColor: item.isVerified === "Verified" ? 'gray' : 'green',
                        color: 'white',
                        cursor: item.isVerified === "Verified" ? 'not-allowed' : 'pointer',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.25rem',
                        borderColor: item.isVerified === "Verified" ? 'gray' : 'green', // Match border color with background when disabled
                      }}
                      // Disable if already verified/Submitted to SWIFT
                      disabled={item.isVerified === "Verified"}
                      aria-label="Submit to SWIFT"
                    >
                      Submit to SWIFT
                    </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>

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

export default View;