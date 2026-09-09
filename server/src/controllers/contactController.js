import mongoose from 'mongoose';
import ContactMessage from '../models/ContactMessage.js';

let fallbackMessages = [];

export const submitContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required fields.' });
    }

    if (mongoose.connection.readyState === 1) {
      const contact = new ContactMessage({
        name,
        email,
        subject: subject || 'General Inquiry',
        message
      });
      await contact.save();
      return res.status(201).json({
        success: true,
        message: 'Thank you for reaching out! Our travel specialist will get back to you shortly.',
        contact
      });
    }

    const newContact = {
      _id: "msg_" + Date.now(),
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      createdAt: new Date()
    };
    fallbackMessages.unshift(newContact);

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Our travel specialist will get back to you shortly.',
      contact: newContact
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getContactMessages = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      return res.json(messages);
    }
    res.json(fallbackMessages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
