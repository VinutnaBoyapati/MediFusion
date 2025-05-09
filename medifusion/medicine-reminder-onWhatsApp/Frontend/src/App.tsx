import React, { useState, useEffect } from "react";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import axios from 'axios';
import DateTimePicker from "react-datetime-picker";

// Define the type for a reminder object
interface Reminder {
  _id: string;
  reminderMsg: string;
  remindAt: Date;
}

function MedicineReminder() {
  const [reminderMsg, setReminderMsg] = useState<string>("");
  const [remindAt, setRemindAt] = useState<Date | null>(null);
  const [reminderList, setReminderList] = useState<Reminder[]>([]); // Use the Reminder type here

  useEffect(() => {
    axios.get("http://localhost:9000/api/reminders")
      .then(res => setReminderList(res.data))
      .catch(error => console.error("Failed to fetch reminders:", error));
  }, []);

  const addReminder = () => {
    if (reminderMsg && remindAt) {
      axios.post("http://localhost:9000/api/reminders", { reminderMsg, remindAt })
        .then(res => setReminderList(res.data))
        .catch(error => console.error("Failed to add reminder:", error));
      setReminderMsg("");
      setRemindAt(null);
    } else {
      console.warn("Please provide both a message and a reminder time.");
    }
  };

  const deleteReminder = (id: string) => {
    axios.delete(`http://localhost:9000/api/reminders/${id}`)
      .then(res => setReminderList(res.data))
      .catch(error => console.error("Failed to delete reminder:", error));
  };

  return (
    <div className="App">
      <div className="homepage">
        <div className="homepage_header">
          <h1>MEDICINE REMINDER</h1>
          <h2>Never Miss a Dose Again</h2>
          <input
            type="text"
            placeholder="Enter the Medicine Name "
            value={reminderMsg}
            onChange={e => setReminderMsg(e.target.value)}
          />
          <DateTimePicker
            value={remindAt}
            onChange={setRemindAt}
            minutePlaceholder="mm"
            hourPlaceholder="hh"
            dayPlaceholder="DD"
            monthPlaceholder="MM"
            yearPlaceholder="YYYY"
          />
          <div className="button" onClick={addReminder}>Add Reminder</div>
        </div>
        <div className="homepage_body">
          {reminderList.map((reminder) => (
            <div className="reminder_card" key={reminder._id}>
              <h2>{reminder.reminderMsg}</h2>
              <h3>Remind Me at:</h3>
              <p>{new Date(reminder.remindAt).toLocaleString()}</p>
              <div className="button" onClick={() => deleteReminder(reminder._id)}>Delete</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MedicineReminder;
