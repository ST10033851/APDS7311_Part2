import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import EditTransactionModal from "../EditTransactionModal.js";
import { updateTransaction, deleteTransaction } from '../transactionUtils';
import TableHeader from '../TableHeader';
import TableBody from '../TableBody';

function Read() {
  const [transactions, setTransactions] = useState([]);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
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
        setError("Please, enter a transaction.");
      }
    };
    fetchTransactions();
  }, []);

  // This code was inspired by a YouTube video
  // Title: JavaScript CRUD Application With Local Storage - CRUD Operations In JS
  // Uploaded by: Dear Programmer
  // Available at: https://www.youtube.com/watch?v=AX9k9bjCBD0
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
      await updateTransaction(id, updatedData, setTransactions, setSuccessMessage);
      // Additional success handling can be done here if needed
    } catch (error) {
      setError(error.message);
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
        {successMessage && <p className="text-green-500 font-bold">{successMessage}</p>}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <TableHeader />
          <TableBody 
            transactions={transactions} 
            setTransactionToEdit={setTransactionToEdit} 
            confirmDelete={confirmDelete} 
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

export default Read;
