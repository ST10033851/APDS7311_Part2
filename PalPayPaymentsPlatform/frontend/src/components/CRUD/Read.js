import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import EditTransactionModal from "../EditTransactionModal.js";
import { updateTransaction, deleteTransaction } from '../transactionUtils';
import TableHeader from '../TableHeader';
import TableBody from '../TableBody';
import { AuthContext } from '../AuthContext';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  
  const { isAuthenticated, role } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        
        //This will check the correct Endpoint depending on the users role
        const endpoint = role === "Employee" ? "/api/view" : `/api/${localStorage.getItem("recipient")}`;
        
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data);
      } catch (err) {
        setError("Failed to fetch transactions. Please try again.");
      }
    };
    
    if (isAuthenticated) {
      fetchTransactions();
    }
  }, [isAuthenticated, role]);
  
  // Blog post
  // Titled: How to Perform CRUD Operations using React, React Hooks, and Axios
  // Posted by: Patra
  // Posted on: 24 November 2023
  // Available at: https://medium.com/@bhairabpatra.iitd/crud-create-read-update-delete-application-in-react-566bf229aaee
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
  
  // Blog post
  // Titled: How to Perform CRUD Operations using React, React Hooks, and Axios
  // Posted by: Patra
  // Posted on: 24 November 2023
  // Available at: https://medium.com/@bhairabpatra.iitd/crud-create-read-update-delete-application-in-react-566bf229aaee
  const handleUpdateTransaction = async (id, updatedData) => {
    try {
      await updateTransaction(id, updatedData, setTransactions, setSuccessMessage);
    } catch (error) {
      setError(error.message);
    }
  };
  

  // Blog post
  // Titled: How to Perform CRUD Operations using React, React Hooks, and Axios
  // Posted by: Patra
  // Posted on: 24 November 2023
  // Available at: https://medium.com/@bhairabpatra.iitd/crud-create-read-update-delete-application-in-react-566bf229aaee
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
  
  // Blog post
  // Titled: How to Perform CRUD Operations using React, React Hooks, and Axios
  // Posted by: Patra
  // Posted on: 24 November 2023
  // Available at: https://medium.com/@bhairabpatra.iitd/crud-create-read-update-delete-application-in-react-566bf229aaee
  return (
    <div className="bg-primary bg-cover h-screen flex justify-center items-center">
      <div
        className="relative overflow-x-auto shadow-md sm:rounded-lg"
        style={{ maxWidth: "80%", margin: "0 auto" }}
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
          {role === "Employee" ? "View All Transactions" : "View Transactions"}
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500 font-bold">{successMessage}</p>}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <TableHeader showSubmit={role === "Employee"} />
          <TableBody 
            transactions={transactions} 
            setTransactionToEdit={setTransactionToEdit} 
            confirmDelete={confirmDelete} 
            onSubmitToSWIFT={role === "Employee" ? submitToSWIFT : null} 
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

export default Transactions;
