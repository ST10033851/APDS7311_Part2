// This code was inspired by a YouTube video
// Title: Build a Modal Component purely in ReactJS and TailwindCSS
// Uploaded by: Your Code Lab
// Available at: https://www.youtube.com/watch?v=dEGbXY-8YtU
import React, { useEffect, useState, useRef } from "react";
import { FaMoneyBillWave, FaDollarSign, FaCreditCard, FaFileAlt, FaFlag, FaHashtag } from "react-icons/fa";
import { MdTextFields } from "react-icons/md";
import PropTypes from "prop-types";

const currencyOptions = ["ZAR", "USD", "EUR", "GBP"]; 
const statusOptions = ["Pending", "Completed", "Failed"]; 
const paymentOptions = ['SWIFT', 'Visa', 'Mastercard', 'Amazon Pay']; 

const Notification = ({ message, onClose }) => (
  <div className="bg-red-500 text-white p-3 rounded-md mb-4 flex justify-between items-center">
    <div>{message}</div>
    <button onClick={onClose} className="font-bold ml-1 underline hover:text-yellow-300 transition-colors duration-200">Close</button>
  </div>
);

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};


const EditTransactionModal = ({ transaction, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    transactionTitle: "",
    amount: "",
    currency: "",
    description: "",
    transactionStatus: "",
    paymentMethod: "",
    paymentCode: "",
  });

  const [notification, setNotification] = useState(null);
  const modalRef = useRef(null); 

  useEffect(() => {
    if (transaction) {
      setFormData({
        transactionTitle: transaction.transactionTitle,
        amount: transaction.amount,
        currency: transaction.currency,
        description: transaction.description,
        transactionStatus: transaction.transactionStatus,
        paymentMethod: transaction.paymentMethod || "", 
        paymentCode: transaction.paymentCode || "",
      });
    }
  }, [transaction]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { transactionTitle, amount, description, paymentCode } = formData;

    // Validation checks
    if (transactionTitle.length < 3 || transactionTitle.length > 35) {
      setNotification("Transaction title must be between 3 and 35 characters.");
      return;
    }
  
    if (!/^\d+(\.\d+)?$/.test(amount)) {
      setNotification("Amount must be a valid number (integer or decimal).");
      return;
    }
  
    if (description.length < 3 || description.length > 100) {
      setNotification("Description must be between 3 and 100 characters.");
      return;
    }
  
    if (!/^\d{1,13}$/.test(paymentCode)) {
      setNotification("Payment code must be up to 13 digits.");
      return;
    }   

    try {
      await onUpdate(transaction._id, formData);
      onClose();
    } catch (error) {
      setNotification("Failed to update transaction. Please try again.");
      console.error("Failed to update transaction:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-5" ref={modalRef}>
        <h2 className="text-xl font-bold mb-4">Edit Transaction</h2>

        {notification && (
          <Notification
            message={notification}
            onClose={() => setNotification(null)}
          />
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Transaction title row */}
          <div className="flex items-center space-x-2">
            <label htmlFor="transactionTitle">
              <MdTextFields className="h-5 w-5" />
            </label>
            <input
              type="text"
              id="transactionTitle"
              name="transactionTitle"
              placeholder="Transaction Title"
              value={formData.transactionTitle}
              onChange={handleChange}
              autoComplete="true"
              className="border rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Transaction amount row */}
          <div className="flex items-center space-x-2">
            <label htmlFor="amount">
              <FaMoneyBillWave className="h-5 w-5" />
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              autoComplete="true"
              className="border rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Transaction currency row */}
          <div className="flex items-center space-x-2">
            <label htmlFor="currency">
              <FaDollarSign className="h-5 w-5" />
            </label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
              required
            >
              <option value="" disabled>Select Currency</option>
              {currencyOptions.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          {/* Transaction description row */}
          <div className="flex items-center space-x-2">
            <label htmlFor="description">
              <FaFileAlt className="h-5 w-5" />
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              autoComplete="true"
              className="border rounded-md p-2 w-full h-24 resize-none"
              required
            />
          </div>
          
          {/* Transaction Status row */}
          <div className="flex items-center space-x-2">
            <label htmlFor="transactionStatus">
              <FaFlag className="h-5 w-5" />
            </label>
            <select
              id="transactionStatus"
              name="transactionStatus"
              value={formData.transactionStatus}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
              required
            >
              <option value="" disabled>Select Transaction Status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Method row */}
          <div className="flex items-center space-x-2">
            <label htmlFor="paymentMethod">
              <FaCreditCard className="h-5 w-5" />
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
              required
            >
              <option value="" disabled>Select Payment Method</option>
              {paymentOptions.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Code row */}
          <div className="flex items-center space-x-2">
            <label htmlFor="paymentCode">
              <FaHashtag className="h-5 w-5" />
            </label>
            <input
              type="text"
              id="paymentCode"
              name="paymentCode"
              placeholder="Payment Code"
              value={formData.paymentCode}
              onChange={handleChange}
              autoComplete="true"
              className="border rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Update button */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Update
            </button>

            {/* Cancel button */}
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditTransactionModal.propTypes = {
  transaction: PropTypes.shape({
    transactionTitle: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    transactionStatus: PropTypes.string.isRequired,
    paymentMethod: PropTypes.string,
    paymentCode: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditTransactionModal;
