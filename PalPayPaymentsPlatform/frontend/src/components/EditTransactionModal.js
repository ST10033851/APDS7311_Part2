// This code was inspired by a YouTube video
// Title: Build a Modal Component purely in ReactJS and TailwindCSS
// Uploaded by: Your Code Lab
// Available at: https://www.youtube.com/watch?v=dEGbXY-8YtU
import React, { useEffect, useState, useRef } from "react";
import { checkList, description, money, money_universal, title } from "../assets";

const currencyOptions = ["ZAR", "USD", "EUR", "GBP"]; // Replace with your actual currency options
const statusOptions = ["Pending", "Completed", "Failed"]; // Replace with your actual status options

const EditTransactionModal = ({ transaction, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    transactionTitle: "",
    amount: "",
    currency: "",
    description: "",
    transactionStatus: "",
  });

  const modalRef = useRef(null); // Ref to the modal

  useEffect(() => {
    if (transaction) {
      setFormData({
        transactionTitle: transaction.transactionTitle,
        amount: transaction.amount,
        currency: transaction.currency,
        description: transaction.description,
        transactionStatus: transaction.transactionStatus,
      });
    }
  }, [transaction]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Close the modal if clicked outside
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
    try {
      await onUpdate(transaction._id, formData);
      onClose();
    } catch (error) {
      console.error("Failed to update transaction:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-5" ref={modalRef}>
        <h2 className="text-xl font-bold mb-4">Edit Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-2">
            <label htmlFor="transactionTitle">
              <img src={title} alt="account" className="w-6 h-6" />
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

          <div className="flex items-center space-x-2">
            <label htmlFor="amount">
              <img src={money} alt="amount" className="w-6 h-6" />
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

          <div className="flex items-center space-x-2">
            <label htmlFor="currency">
              <img src={money_universal} alt="currency" className="w-6 h-6" />
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

          <div className="flex items-center space-x-2">
            <label htmlFor="description">
              <img src={description} alt="description" className="w-6 h-6" />
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

          <div className="flex items-center space-x-2">
            <label htmlFor="transactionStatus">
              <img src={checkList} alt="status" className="w-6 h-6" />
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

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Update
            </button>
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

export default EditTransactionModal;
