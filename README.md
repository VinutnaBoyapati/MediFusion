# MediFusion

MediFusion is a comprehensive healthcare management system designed to streamline the process of booking doctor appointments, setting medication reminders, issuing emergency alerts, and collecting patient feedback through reviews. It integrates four major functionalities to enhance patient convenience and ensure timely medical care.

## Project Overview

MediFusion consists of the following key systems:

### 1. Appointment System
- Allows patients to schedule appointments with doctors.
- Provides real-time availability of doctors.
- Ensures hassle-free booking and rescheduling.

### 2. Review System
- Enables patients to provide feedback on their medical experience.
- Helps improve service quality by analyzing patient reviews.
- Maintains transparency between healthcare providers and users.

### 3. Reminder System
- Provides timely reminders to help patients take medicine via WhatsApp.
- Helps patients adhere to their prescribed treatments.
- Reduces the risk of missed medications.

### 4. Red Alert System
- Detects and alerts users of potential disease outbreaks in their area.
- Can be used for urgent medical attention requests.
- Provides a quick response mechanism for users.

## 👥 Contributors

### Appointment & Review System
- **Dhanasree Gidijala**
- **Ridhima**
- **Tasneem**

### Reminder & Red Alert System
- **Vinutna Boyapati**
- **Malavika Badam**
- **Afreen**

### Integration of All Systems
- **Dhanasree Gidijala**
- **Vinutna Boyapati**

##  Tech Stack

- **Client:** React, TypeScript, Redux Toolkit, Material UI, Formik
- **API Handlers:** RTK Query
- **Server:** Node, Express
- **Database:** MongoDB
- **Communication Service:** Twilio Messaging API

##  How to Setup Twilio

1. Go to the Twilio website: [Twilio Signup](https://www.twilio.com/)
2. Register on Twilio.
3. Retrieve the following credentials:
   - **ACCOUNT SID**
   - **AUTH TOKEN**
4. Copy these values and paste them into the `.env` file in the backend folder.
5. Navigate to **Messaging > Try it out > Send a WhatsApp message**.
6. Scan the QR code or send a message to the given number.

## 💻 How to Run the Project

### Doctor Appointment System

#### Server
```sh
cd server
npm install
npm start
```

#### Client
```sh
cd client
npm install
npm start
```

### Reminder System

#### Backend
```sh
cd Backend
npm install
npm start
```

#### Frontend
```sh
cd Frontend
npm install
npm start
```

##  Environment Variables

To run this project, add the following environment variables to your .env file:

#### Backend
```sh
NODE_ENV=development
PORT=5000
DATABASE=Insert your MongoDB database connection link
```

#### Frontend
```sh
REACT_APP_API_URL='http://127.0.0.1:5000/api/v1/'
```

##  API Reference

#### Routes
```sh
Endpoint: http://127.0.0.1:5000/api/v1/users
Endpoint: http://127.0.0.1:5000/api/v1/doctors
```
#### Users API
**Signup**

- Method: POST

- Endpoint: /signup

**Login**

- Method: POST

- Endpoint: /login

**Get All Users**

- Method: GET

- Endpoint: /

**Get User**

- Method: GET

- Endpoint: /:id

**Delete User**

- Method: DELETE

- Endpoint: /:id

**Verify User**

- Method: GET

- Endpoint: /verify-user/:id

**Book Appointment**

- Method: POST

- Endpoint: /book-appointment

**User Appointments**

- Method: GET

- Endpoint: /user-appointments/:id

**Notifications Seen**

- Method: POST

- Endpoint: /mark-all-notification-as-seen

**Delete Notifications**

- Method: POST

- Endpoint: /delete-all-notifications

**Change Doctor Status**

- Method: POST

- Endpoint: /change-doctor-status

#### Doctors API

**Get All Doctors**

- Method: GET

- Endpoint: /

**Get All Approved Doctors**

- Method: GET

- Endpoint: /approved-doctors

**Doctor Signup**

- Method: POST

- Endpoint: /signup

**Get Doctor**

- Method: GET

- Endpoint: /:id

**Update Doctor**

- Method: PUT

- Endpoint: /:id

**Get All Doctor Appointments**

- Method: GET

- Endpoint: /appointments/:id

**Get Booked Doctor Appointments**

- Method: GET

- Endpoint: /booked-appointments/:id

**Change Appointment Status**

- Method: POST

- Endpoint: /change-appointment-status

**Appointment Booking Availability**

- Method: POST

- Endpoint: /check-booking-availability

##  License

This project is licensed under the **MIT License**.
