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
    try{
        const { username, email, password, IDNumber, fullName, accountNumber, role} = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{username}, {email}]})
        if(existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        // Hash the users password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create the new user
        const newUser = new User({username, email, IDNumber, fullName, accountNumber, password: hashedPassword, role: "Customer"});
        await newUser.save();

        return res.status(201).json({message:'User created successfully'})

    } catch (err) {
        console.error("Registration error:", err); 
        res.status(500).json({ message: 'Internal Server Error', error: err.message || err.toString() });
    }
    
})

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
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

export default router