import React, { useEffect, useState } from "react";
import axios from "axios";
import EditTransactionModal from "../EditTransactionModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import { updateTransaction, deleteTransaction } from '../transactionUtils';
import TableHeader from '../TableHeader';
import TableBody from '../TableBody';

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

  const handleDeleteTransaction = async () => {
    if (!transactionToDelete) return;

    const id = transactionToDelete._id;
  
    try {
      await deleteTransaction(id, setTransactions, setSuccessMessage);
      setTransactionToDelete(null); // Clear the transaction to delete after deletion
    } catch (error) {
      setError(error.message);
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
      await updateTransaction(id, updatedData, setTransactions, setSuccessMessage);
      // Additional success handling can be done here if needed
    } catch (error) {
      setError(error.message);
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
        style={{ maxWidth: "80%", margin: "0 auto", maxHeight: "60vh", overflowY: "auto" }}
      >
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500 font-bold">{successMessage}</p>}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <TableHeader showSubmit={true} />
          <TableBody 
            transactions={transactions} 
            setTransactionToEdit={setTransactionToEdit} 
            confirmDelete={confirmDelete} 
            onSubmitToSWIFT={submitToSWIFT} 
          />
        </table>
  
        {transactionToDelete && (
          <DeleteConfirmationModal
            transaction={transactionToDelete}
            onDelete={handleDeleteTransaction}
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