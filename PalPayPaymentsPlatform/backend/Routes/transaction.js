import express from "express";
import Payment from "../models/Transaction.js"; // Keep it as Payment if that's what you're calling it
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to create a payment transaction
router.post("/create", authMiddleware, async (req, res) => {
  const {
    transactionTitle,
    amount,
    currency,
    recipient,
    transactionStatus,
    description,
    paymentMethod,
    paymentCode,
    createdAt,
    updatedAt,
  } = req.body;

  // Ensure all required fields are provided
  if (
    !transactionTitle ||
    !amount ||
    !currency ||
    !transactionStatus ||
    !paymentMethod ||
    !paymentCode ||
    !description
  ) {
    return res
      .status(400)
      .json({ error: "All required fields must be filled" });
  }

  try {
    const newPayment = new Payment({
      transactionTitle,
      amount,
      currency,
      recipient,
      transactionStatus,
      description,
      paymentMethod,
      paymentCode,
      createdAt,
      updatedAt,
    });

    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to update a payment transaction by ID
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const {
    transactionTitle,
    amount,
    currency,
    recipient,
    transactionStatus,
    description,
    paymentMethod,
    paymentCode,
  } = req.body;

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      {
        transactionTitle,
        amount,
        currency,
        recipient,
        transactionStatus,
        description,
        paymentMethod,
        paymentCode,
        updatedAt: Date.now(), // Update the timestamp manually in case `transactionStatus` isn't modified
      },
      { new: true } // Return the updated document
    );

    if (!updatedPayment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json(updatedPayment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to delete a payment transaction by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPayment = await Payment.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json({ message: "Payment successfully deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to view all transactions for a specific recipient
router.get("/:recipient", authMiddleware, async (req, res) => {
  const { recipient } = req.params;

  try {
    const transactions = await Payment.find({ recipient });

    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ error: "No transactions found for this recipient" });
    }

    res.status(200).json(transactions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//const Transaction = mongoose.model("Transaction", newPayment);

export default router;
