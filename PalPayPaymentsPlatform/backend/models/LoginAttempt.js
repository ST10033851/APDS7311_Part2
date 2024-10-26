import mongoose from "mongoose";

const loginAttemptSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        immutable: true,
        trim: true,
        match: [/^\w{5,15}$/, 'Please fill in a valid username (5-15 alphanumeric characters)'] // Alphanumeric and underscores, 5-15 chars
    },
    ipAddress: {
        type: String,
        required: true,
        immutable: true
    },
    successfulLogin: {
        type: Boolean,
        required: true,
        immutable: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});

export default mongoose.model("LoginAttempt", loginAttemptSchema);