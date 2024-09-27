import jwt from 'jsonwebtoken';
import User from './User-Model.js';
import MenteeUser from './Mentee-Model.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
// import { google } from 'googleapis';

const OTPs = {};
const SECRET_KEY = 'yashraj'; // Keep this key secure

// Function to handle login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Create a token
        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1hr' });
        res.status(200).json({ message: "Login successful", token, user });

    } catch (error) {
        res.status(500).json({ error: "Error occurred" });
    }
};
export const loginMentee = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await MenteeUser.findOne({ email });

        

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Create a token
        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1hr' });
        res.status(200).json({ message: "Login successful", token, user });

    } catch (error) {
        res.status(500).json({ error: "Error occurred" });
    }
};

// Function to generate OTP
function generateOTP() {
    return crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
}

// Email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sarathi062023@gmail.com',
        pass: process.env.pass,
    },
});

// Function to send OTP email
function sendOTPEmail(email, otp) {
    const mailOptions = {
        from: 'sarathi062023@gmail.com',
        to: email,
        subject: 'Action Required: One-Time Verification Code',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        border: 1px solid #ddd;
                        background-color: #f9f9f9;
                    }
                    .header {
                        text-align: center;
                    }
                    .header img {
                        width: 120px;
                    }
                    .content {
                        margin-top: 20px;
                    }
                    .otp {
                        font-size: 24px;
                        font-weight: bold;
                        text-align: center;
                        margin: 20px 0;
                    }
                    .footer {
                        font-size: 12px;
                        text-align: center;
                        color: #888;
                        margin-top: 30px;
                    }
                    img {   
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                        width: 50%;
                    }
                    
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Action Required: One-Time Verification Code</h1>
                    </div>
                    <div class="content">
                        <p>You are receiving this email because a request was made for a one-time code that can be used for authentication.</p>
                        <p>Please enter the following code for verification:</p>
                        <div class="otp">${otp}</div>
                        <p>If you did not request this change, please change your password or contact us.</p>
                    </div>
                    <div class="footer">
                        This message was sent from FireFlick Team.
                    </div>
                </div>
            </body>
            </html>
        `, // (Same HTML code for the email content)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
    });
}

// Function to handle sending OTP
export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = generateOTP();
        OTPs[email] = otp; // Store the OTP for this email.

        sendOTPEmail(email, otp);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
};

// Function to verify OTP
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (OTPs[email] === otp) {
            delete OTPs[email];
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({ success: false, message: "Invalid OTP" });
        }
    } catch (error) {
        res.status(500).json({ success: false });
    }
};

// Function to handle registration
export const registerMentor = async (req, res) => {
    try {
        const { email,
            password,
            role,
            firstName,
            lastName,
            jobTitle,
            company,
            location,
            linkedin,
            skills,
            experience, } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ error: "User already exists" });
        }
        const newUser = await User.create({
            email,
            password,
            role,
            firstName,
            lastName,
            jobTitle,
            company,
            location,
            linkedin,
            skills,
            experience,
        });
        res.status(200).json({ message: "Mentor Registration successful" });
    } catch (error) {
        res.status(500).json({ error: "Error occurred" });
    }
};
export const registerMentee = async (req, res) => {
    try {
        const { email,
            password,
            role,
            firstName,
            lastName,
            skills,
            educationStatus,
            interests,
            goals } = req.body;
        const userExist = await MenteeUser.findOne({ email });
        if (userExist) {
            return res.status(400).json({ error: "User already exists" });
        }
        const newUser = await MenteeUser.create({
            email,
            password,
            role,
            firstName,
            lastName,
            skills,
            educationStatus,
            interests,
            goals
        });
        res.status(200).json({ message: "Mentee Registration successful" });
    } catch (error) {
        res.status(500).json({ error: "Error occurred" });
    }
};
