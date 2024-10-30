import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Create() {
  const [transactionTitle, setTransactionTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [description, setDescription] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentCode, setPaymentCode] = useState("");
  const navigate = useNavigate();
  const statusOptions = ["Pending", "Completed", "Failed"];
  const currencyOptions = ["ZAR", "EUR", "GBP", "USD"];
  const paymentOptions = ['SWIFT', 'Visa', 'Mastercard', 'Amazon Pay'];
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //setError('');
    const token = localStorage.getItem("token");
    const recipient = localStorage.getItem("recipient");
    const titlePattern = /^.{3,35}$/;//allows all characters from 3 to 35 characters
    const pricePattern = /^\d*\.?\d+$/;//allows both decimals or normal whole numbers
    const descriptionPattern = /^.{3,100}$/;//allows all characters from 3 to 100 characters
    const paymentCodePattern = /^\d{8,13}$/;//nly takes numbers and up until 13 
;

    // This code was inspired by mdn web docs
    // Title: Regular expressions
    // Uploaded by: mdn web docs
    // Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions

    //const username = localStorage.getItem('username');
    try {
      const createdAt = new Date().toISOString();
      const updatedAt = new Date().toISOString();
      const isVerified = "Pending";

      if (!titlePattern.test(transactionTitle)) {
        return setError("Please enter a name with less then 35 characters.");
      }
      if (!pricePattern.test(amount)) {
        return setError("Please enter a valid amount.");
      }
      if (!descriptionPattern.test(description)) {
        return setError("Please enter a name with less then 100 characters.");
      }
      if (!paymentCodePattern.test(paymentCode)) {
        return setError("Please enter a valid bank code.");
      }
      
      const response = await axios.post(
        "/api/create",
        {
          transactionTitle,
          amount,
          currency,
          recipient,
          transactionStatus,
          paymentMethod,
          paymentCode,
          description,
          isVerified,
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
    <div className="bg-primary bg-cover h-screen flex justify-center items-center relative">
      <div className='absolute z-[0] w-[20%] h-[35%] top-0 pink__gradient'/>
      <div className='absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient rounded'/>
      <div className="flex flex-col items-center justify-start space-y-2">
        <h1 className="text-3xl font-semibold text-center relative z-[40] mb-4 text-white">
          Add Transaction
        </h1> 

        <div className="bg-white rounded-lg shadow-lg w-[50vh] flex flex-col justify-start items-center z-[30] px-4 py-5">
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
                className="border rounded-md py-3 px-2 w-full"
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
                className="border rounded-md py-3 px-2 w-full"
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <select
                id="currency"
                name="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="border rounded-md py-3 px-2 w-full"
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
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="border rounded-md py-3 px-2 w-full"
              >
                <option value="" disabled>
                  Select Payment Method
                </option>
                {paymentOptions.map((paymentMethod) => (
                  <option key={paymentMethod} value={paymentMethod}>
                    {paymentMethod}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                id="paymentCode"
                name="paymentCode"
                placeholder="Payment Code"
                value={paymentCode}
                onChange={(e) => setPaymentCode(e.target.value)}
                autoComplete="true"
                className="border rounded-md py-3 px-2 w-full"
              />
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
                className="border rounded-md py-3 px-2 w-full"
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <select
                id="transactionStatus"
                name="transactionStatus"
                value={transactionStatus}
                onChange={(e) => setTransactionStatus(e.target.value)}
                className="border rounded-md py-3 px-2 w-full"
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
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full h-12 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// This code was inspired by Flowbite
// Title: Tailwind CSS Forms - Flowbite
// Uploaded by: Flowbite
// Available at: https://flowbite.com/docs/components/forms/

export default Create;
