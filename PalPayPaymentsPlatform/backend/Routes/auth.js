import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bruteForce from '../middleware/bruteForceProtectionMiddleware.js';
import LoginAttemptLogger from '../middleware/loginAttemptLogMiddleware.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// base route
router.get("/", (req, res) => {
    res.send("Hello Auth");
});

// Register
router.post('/register', async (req, res) => {
    try {
        //This will make sure that all user inputs are strings to prevent NoSQL injection attacks
        const username = req.body.username?.toString().trim();
        const email = req.body.email?.toString().trim();
        const password = req.body.password?.toString();
        const IDNumber = req.body.IDNumber?.toString().trim();
        const fullName = req.body.fullName?.toString().trim();
        const accountNumber = req.body.accountNumber?.toString().trim();
        const role = req.body.role?.toString().trim();

        //This checks if the user already exists by their username or email
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        //This checks if the account number already exists in the db
        const existingAccountNumber = await User.findOne({ accountNumber });
        if (existingAccountNumber) {
            return res.status(400).json({ message: "Account number already exists" });
        }

        //Hashes the user's password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Creates the new user to be saved to the db
        const newUser = new User({
            username,
            email,
            IDNumber,
            fullName,
            accountNumber,
            password: hashedPassword,
            role
        });
        await newUser.save();

        return res.status(201).json({ message: 'User created successfully' });

    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: 'Failed to register user', error: err.message });
    }
});


// Login
router.post('/login', bruteForce.prevent, LoginAttemptLogger, async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find if the user exists by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not Found" }); // Add return here
        }

        // And then check password matches
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        // Create a JWT Token if valid user
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token, role: user.role, message: "Logged in successfully" }); // Add return here

    } catch (err) {
        return res.status(500).json({ message: 'Failed to login', error: err.message });
    }
});

export default router