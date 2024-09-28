import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const [transactionTitle, setTransactionTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [recipient, setRecipient] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {};

  return (
    <div>
      <h1>Welcome to the International Payments Portal</h1>
      <h1>Create</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="transactionTitle">Transaction Title</label>
        <input
          type="text"
          id="transactionTitle"
          value={transactionTitle}
          onChange={(e) => setTransactionTitle(e.target.value)}
          required
          autoComplete="true"
        />

        <label htmlFor="amount">Amount</label>
        <input
          type="text"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          autoComplete="true"
        />

        <label htmlFor="currency">currency</label>
        <input
          type="text"
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          required
          autoComplete="true"
        />

        <label htmlFor="recipient">Recipient</label>
        <input
          type="text"
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
          autoComplete="true"
        />

        <label htmlFor="transactionStatus">Transaction Status</label>
        <input
          type="text"
          id="transactionStatus"
          value={transactionStatus}
          onChange={(e) => setTransactionStatus(e.target.value)}
          required
          autoComplete="true"
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          autoComplete="true"
        />

        <label htmlFor="createdAt">Created At</label>
        <input
          type="text"
          id="createdAt"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
          required
          autoComplete="true"
        />

        <label htmlFor="updatedAt">Updated At</label>
        <input
          type="text"
          id="updatedAt"
          value={updatedAt}
          onChange={(e) => setUpdatedAt(e.target.value)}
          required
          autoComplete="true"
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default Create;
