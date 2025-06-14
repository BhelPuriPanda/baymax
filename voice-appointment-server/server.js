// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRouter from "./routes/authRouter.js";
import authMiddleware from "./middleware/authMiddleware.js";
import appointmentRouter from "./routes/appointment.js";

dotenv.config();

const app = express();

app.use(cors()); // enable CORS
app.use(express.json()); // parses incoming requests with JSON

// routes
app.use('/api/auth', authRouter);
app.use('/api/appointment', appointmentRouter);

// connect to db
try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to Database.");

  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}.`) 
  });
} catch (err) {
  console.error(err);
}

