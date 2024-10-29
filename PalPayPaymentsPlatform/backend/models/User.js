import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        match: [/^\w{5,15}$/, 'Please fill in a valid username (5-15 alphanumeric characters)'] // Alphanumeric and underscores, 5-15 chars
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        match: [/.+@.+\..+/, 'Please fill a valid email address'] // Basic email pattern check
    },
    fullName: {
        type: String,
        required: true,
    },
    IDNumber: {
        type: String,
        required: true,
        unique: true
    },
    accountNumber: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true
    }
});

export default mongoose.model("User", userSchema);