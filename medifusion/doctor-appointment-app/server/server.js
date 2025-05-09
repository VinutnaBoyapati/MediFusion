const mongoose = require("mongoose");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = require("./app");



// App Config
//const app = express();
app.use(cors());
app.use(express.json());

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! Shutting down...", err);
  process.exit(1);
});

// MongoDB Connection
const dbURI = process.env.DATABASE;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to Doctor Appointment DB"))
  .catch((error) => console.error("Database connection error:", error));

// Endpoint to communicate with the medicine reminder system
app.post("/api/sendReminder", async (req, res) => {
  try {
    const reminderData = {
      reminderMsg: req.body.message,
      remindAt: req.body.time,
    };

    // Send request to medicine reminder system using REMINDER_API_URL
    const response = await axios.post(`${process.env.REMINDER_API_URL}/api/reminders`, reminderData);
    res.status(200).json({ message: "Reminder sent to medicine system", data: response.data });
  } catch (error) {
    console.error("Failed to send reminder:", error);
    res.status(500).json({ error: "Failed to send reminder" });
  }
});

// Starting Server
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Doctor Appointment server running on port ${port}`);
});

// Handle unhandled rejections
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! Shutting down...", err);
  server.close(() => process.exit(1));
});
