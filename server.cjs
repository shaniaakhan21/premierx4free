// server.js
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config(); // Load environment variables

dotenv.config();
// Create Express app
const app = express();
app.use(cors());

// Set up JSON parsing
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Create User schema and model using Mongoose
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetToken: {
        type: String,
        default: null,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipcode: {
        type: String,
        required: true,
    },
    referral: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);

// Register a new user
app.post('/api/register', async (req, res) => {
    try {
        const { 
            fullName, 
            email, 
            password, 
            phoneNumber,
            confirmPassword,
            address,
            city,
            state,
            zipcode,
            referral, } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            fullName,
            email,
            phoneNumber,
            confirmPassword,
            address,
            city,
            state,
            zipcode,
            referral,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'An error occurred during registration' });
    }
});

// User login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // Return a success message or JWT token
        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});

// Forgot password
app.post('/api/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate and save password reset token
        const resetToken = generateResetToken();
        user.resetToken = resetToken;
        await user.save();

        // Send password reset email
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        sendPasswordResetEmail(email, resetLink);

        res.json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ error: 'An error occurred during password reset' });
    }
});

// Reset password
app.post('/api/reset-password', async (req, res) => {
    try {
        const { token, password } = req.body;

        // Find user by reset token
        const user = await User.findOne({ resetToken: token });
        if (!user) {
            return res.status(404).json({ error: 'Invalid reset token' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update user's password
        user.password = hashedPassword;
        user.resetToken = null;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ error: 'An error occurred during password reset' });
    }
});

// Helper function to generate a random reset token
function generateResetToken() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < 32; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
}

// // Helper function to send password reset email
// function sendPasswordResetEmail(email, resetLink) {
//     // Configure nodemailer with your email provider's credentials
//     const transporter = nodemailer.createTransport({
//         service: 'your_email_provider',
//         auth: {
//             user: 'your_email_username',
//             pass: 'your_email_password',
//         },
//     });

//     // Set up email options
//     const mailOptions = {
//         from: 'your_email@example.com',
//         to: email,
//         subject: 'Password Reset',
//         text: `Click the following link to reset your password: ${resetLink}`,
//     };

//     // Send the email
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error sending password reset email:', error);
//         } else {
//             console.log('Password reset email sent:', info.response);
//         }
//     });
// }

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

