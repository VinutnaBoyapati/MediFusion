require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// App Config
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({ origin: 'http://localhost:3000' })); // Allowing the doctor appointment frontend (adjust if hosted elsewhere)

// Database Config
mongoose.connect(process.env.MEDICINE_REMINDER_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to medicineReminderDB"))
    .catch((err) => console.error(err));

// Reminder Schema & Model
const reminderSchema = new mongoose.Schema({
    reminderMsg: String, // Store only the medicine name
    remindAt: String,
    isReminded: Boolean
});
const Reminder = mongoose.model("Reminder", reminderSchema);

// Twilio Config
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// Reminder Check Interval
setInterval(async () => {
    try {
        const reminderList = await Reminder.find({}).exec();
        reminderList.forEach(async (reminder) => {
            if (!reminder.isReminded && new Date(reminder.remindAt) < new Date()) {
                await Reminder.findByIdAndUpdate(reminder._id, { isReminded: true });
                const messageBody = `It's time to take your medicine now!! ${reminder.reminderMsg}`;
                client.messages.create({
                    body: messageBody, // Prefix the message here
                    from: 'whatsapp:+14155238886',
                    to: 'whatsapp:+91----------' // Adjust with your number
                }).then((message) => console.log("Reminder sent:", message.sid));
            }
        });
    } catch (error) {
        console.error(error);
    }
}, 10000);

// API Routes
app.get("/api/reminders", async (req, res) => {
    try {
        const reminders = await Reminder.find({});
        res.json(reminders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/reminders", async (req, res) => {
    try {
        const reminder = new Reminder(req.body);
        await reminder.save();
        res.json(reminder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/api/reminders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Reminder.findByIdAndDelete(id);
    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(process.env.REMINDER_PORT || 9000, () => console.log("Medicine Reminder System started"));
