Baymax — Appointment Booking System 🏥
📚 Project Overview
Baymax is a full-stack application designed to enable voice-assisted booking of appointments at a hospital or clinic.
It allows receptionists to:

✅ Book appointments by voice or by typing details.
✅ Store appointments in a MongoDB Atlas database.
✅ View a confirmation after booking.
✅ Implement authentication with JSON Web Token (JWT).

🔹Features🔹
🔑 User Authentication (with JWT)

🏥 Create Appointments (with patient name, symptoms, preferred doctor)

🦻 Voice Input for faster booking (using Web Speech API)

📅 Stores Appointment Date and Time

🌟 User-friendly UI with React + Tailwind CSS

🔹Tech Stack🔹

Frontend:
React
Axios
Speech Recognition API
Tailwind CSS

Backend:
Node.js
Express
Mongoose
JWT
bcrypt

Database:
MongoDB Atlas (cloud)

🔹API Endpoints🔹
Method	URL	Description
POST	/api/auth/login	Login and generate a JWT
POST	/api/appointment/create	Create a new appointment
GET	/api/appointment/list	Retrieve all appointments

🔹Installation🔹
bash
Copy
Edit
git clone https://github.com/BhelPuriPanda/baymax.git
cd baymax
🔹Environment Variables🔹
Create a .env in your server directory with:

bash
Copy
Edit
PORT=5000
MONGODB_URI=<your-mongodb-atlas-connection-string>
JWT_SECRET=<your-jwt-secret>
🔹Running the Application🔹
Start backend server:

bash
Copy
Edit
cd server
npm install
npm start
Start frontend application:

bash
Copy
Edit
cd frontend
npm install
npm start
🔹Developer Notes🔹
The application is currently set up to run:

Client at http://localhost:5173.

Server at http://localhost:5000.

🔹Contributing🔹
Contributions are welcome!
Please feel free to create a pull request or submit issues.

🔹License🔹
This project is licensed under MIT license.
