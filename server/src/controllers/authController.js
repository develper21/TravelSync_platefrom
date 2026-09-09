import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { firebaseAuth } from "../config/firebase.js";
import { generateOTP, verifyOTPToken } from "../services/totpService.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "User already exists with this email address" });
    }

    let uid = "";
    try {
      if (firebaseAuth && firebaseAuth.createUser) {
        const userRecord = await firebaseAuth.createUser({
          email,
          password,
        });
        uid = userRecord.uid;
      }
    } catch (fbError) {
      console.warn("Firebase auth skipped or failed:", fbError.message);
      uid = "local_" + Date.now();
    }

    const newUser = new User({
      uid: uid || ("local_" + Date.now()),
      fullName,
      email,
      password,
    });

    await newUser.save();

    let qrCode = "";
    try {
      const otpRes = await generateOTP(newUser);
      qrCode = otpRes?.qrCode || "";
    } catch (otpErr) {
      console.warn("OTP generation warning:", otpErr.message);
    }

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || "default_jwt_secret", {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        preferences: newUser.preferences,
        role: newUser.role
      },
      token,
      qrCode
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate('savedDestinations');
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "default_jwt_secret", {
      expiresIn: "7d"
    });

    res.status(200).json({
      message: "User signed in successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        country: user.country,
        avatarUrl: user.avatarUrl,
        role: user.role,
        preferences: user.preferences,
        savedDestinations: user.savedDestinations,
        paymentMethods: user.paymentMethods
      },
      token
    });
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

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: "New password must be at least 6 characters" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  res.json({ message: "Logged out successfully" });
};