import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { firebaseAuth } from "../config/firebase.js";
import { generateOTP, verifyOTPToken } from "../services/totpService.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const userRecord = await firebaseAuth.createUser({
      email,
      password,
    });

    const newUser = new User({
      uid: userRecord.uid,
      fullName,
      email,
      password,
    });

    await newUser.save();

    const { qrCode } = await generateOTP(newUser);
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ message: "User created successfully", user: newUser, token, qrCode });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ message: "User signed in successfully", user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isValid = verifyOTPToken(user, otp);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};