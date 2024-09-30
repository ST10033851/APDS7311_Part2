import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { color2, account_circle, lock, mail } from "../../assets";

function Create() {
  const [transactionTitle, setTransactionTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [recipient, setRecipient] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date().toISOString());
  const [updatedAt, setUpdatedAt] = useState(new Date().toISOString());
  const navigate = useNavigate();
  const statusOptions = ["Pending", "Completed", "Failed"];
  const currencyOptions = ["ZAR", "EUR", "GBP", "USD"];
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    //setError('');

    try {
      setCreatedAt(new Date().toISOString());
      setUpdatedAt(new Date().toISOString());
      setRecipient("Kaushil");
      const response = await axios.post("/api/transaction/create", {
            transactionTitle,
            amount,
            currency,
            recipient,
            transactionStatus,
            description, 
            createdAt, 
            updatedAt
        });
      if (response.status === 201) {
        navigate("/");
      }
      console.log('Transaction created:', response.data);
  } catch (err) {
    
    if (err.response) {
    } else if (err.request) {

      setError('No response received from server');


    } else {
      setError('Error: ' + err.message);
      
    }
  }
};
  return (
    <div className="bg-primary bg-cover h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-[60vh] flex">
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-semibold mb-8 text-center">
            Add Transaction
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-2">
              <label htmlFor="transactionTitle">
                <img src={account_circle} alt="account" className="w-6 h-6" />
              </label>
              <input
                type="text"
                id="transactionTitle"
                name="transactionTitle"
                placeholder="Transaction Title"
                value={transactionTitle}
                onChange={(e) => setTransactionTitle(e.target.value)}
                autoComplete="true"
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="amount">
                <img src={mail} alt="email" className="w-6 h-6" />
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                autoComplete="true"
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="currency">
                <img src={lock} alt="passwordImg" className="w-6 h-6" />
              </label>
              <select
                id="currency"
                name="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="border rounded-md p-2 w-full"
              >
                <option value="" disabled>
                  Select Currency
                </option>
                {currencyOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="description">
                <img src={account_circle} alt="account" className="w-6 h-6" />
              </label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoComplete="true"
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="transactionStatus">
                <img src={account_circle} alt="account" className="w-6 h-6" />
              </label>
              <select
                id="transactionStatus"
                name="transactionStatus"
                value={transactionStatus}
                onChange={(e) => setTransactionStatus(e.target.value)}
                className="border rounded-md p-2 w-full"
              >
                <option value="" disabled>
                  Select Transaction Status
                </option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
            >
              Add
            </button>
          </form>
        </div>

        <div
          className="w-1/2 bg-cover bg-right rounded-r-lg"
          style={{ backgroundImage: `url(${color2})` }}
        ></div>
      </div>
    </div>
  );
}

export default Create;
