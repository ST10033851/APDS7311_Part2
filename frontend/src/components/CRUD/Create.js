import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Create() {
  const [transactionTitle, setTransactionTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const statusOptions = ["Pending", "Completed", "Failed"];
  const currencyOptions = ["ZAR", "EUR", "GBP", "USD"];
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //setError('');
    const token = localStorage.getItem("token");
    const recipient = localStorage.getItem("recipient");
    const titlePattern = /^.{3,35}$/;//allows all characters from 3 to 35 characters
    const pricePattern = /^\d*\.?\d+$/;//allows both decimals or normal whole numbers
    const descriptionPattern = /^.{3,100}$/;//allows all characters from 3 to 100 characters


    //const username = localStorage.getItem('username');
    try {
      const createdAt = new Date().toISOString();
      const updatedAt = new Date().toISOString();

      if(!titlePattern.test(transactionTitle)){
        return setError("Please enter a name with less then 35 characters.");
      }
      if(!pricePattern.test(amount)){
        return setError("Please enter a valid amount.");
      }
      if(!descriptionPattern.test(description)){
        return setError("Please enter a name with less then 100 characters.");
      }

      const response = await axios.post(
        "/api/create",
        {
          transactionTitle,
          amount,
          currency,
          recipient,
          transactionStatus,
          description,
          createdAt,
          updatedAt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        navigate("/");
      }
      console.log("Transaction created:", response.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <div className="bg-primary bg-cover h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-[60vh] flex flex-col justify-start items-center">
        <h1 className="text-3xl font-semibold mt-4 mb-4 text-center">
          Add Transaction
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <form className="max-w-md mx-auto w-full" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
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
          <div className="relative z-0 w-full mb-5 group">
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
          <div className="relative z-0 w-full mb-5 group">
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
              {currencyOptions.map((currencies) => (
                <option key={currencies} value={currencies}>
                  {currencies}
                </option>
              ))}
            </select>
          </div>
          <div className="relative z-0 w-full mb-5 group">
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
          <div className="relative z-0 w-full mb-5 group">
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
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-40 h-12 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
