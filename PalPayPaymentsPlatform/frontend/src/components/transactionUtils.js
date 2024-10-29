// transactionUtils.js
import axios from 'axios';

export const updateTransaction = async (id, updatedData, setTransactions, setSuccessMessage) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`/api/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTransactions(prevTransactions =>
      prevTransactions.map(item => (item._id === id ? response.data : item))
    );

    // Set success message
    setSuccessMessage("Transaction updated successfully!");

    // Clear the message after a short duration
    setTimeout(() => setSuccessMessage(""), 3000);
  } catch (err) {
    throw new Error(err.response?.data?.error || "Failed to update transaction");
  }
};

export const deleteTransaction = async (id, setTransactions, setSuccessMessage) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setTransactions(prevTransactions =>
        prevTransactions.filter(item => item._id !== id)
      );
  
      // Set success message
      setSuccessMessage("Transaction deleted successfully!");
  
      // Clear the message after a short duration
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      throw new Error(err.response?.data?.error || "Failed to delete transaction");
    }
};
