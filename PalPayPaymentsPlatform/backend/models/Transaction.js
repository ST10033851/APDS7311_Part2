import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    transactionTitle: { // Title of the transaction 
        type: String,
        required: true,
        trim: true
    },
    amount: { // The amount of money being transferred
        type: Number,
        required: true,
        min: 0
    },
    currency: { // The currency used in the transaction
        type: String,
        required: true,
        enum: ['ZAR', 'EUR', 'GBP', 'USD'], 
        default: 'ZAR'
    },
    recipient: { // Details about the recipient
        type: String,
        required: true,
        trim: true,
    },
    transactionStatus: { // Status of the payment
        type: String,
        required: true,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    description: { // Details about the transaction
        type: String,
        maxLength: 20000,
        trim: true
    },
    createdAt: { // When the transaction was initiated
        type: Date,
        default: Date.now,
        immutable: true
    },
    updatedAt: { // When the transaction status was last updated
        type: Date,
        default: Date.now
    }
});

// Middleware to update the `updatedAt` field when transactionStatus is updated
paymentSchema.pre('save', function (next) {
    if (this.isModified('transactionStatus')) {
        this.updatedAt = Date.now();
    }
    next();
});

export default mongoose.model("Payment", paymentSchema);
