// routes/appointment.js
import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// CREATE a new appointment
router.post('/create', async (req, res) => {
  try {
    const { patientName, symptoms, preferredDoctor } = req.body;

    if (!patientName || !symptoms || !preferredDoctor) {
      return res.status(400).json({error:'All fields are required'})
    }

    const newAppointment = new Appointment({ 
      patientName, 
      symptoms, 
      preferredDoctor 
    });

    await newAppointment.save();

    res.json({ message:'Appointment successfully booked!', appointment: newAppointment });
  } catch (error) {
    res.status(500).json({error:'Server Error'})
  }
});

// GET all appointments
router.get('/list', async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.json(appointments);
  } catch (error) {
    res.status(500).json({error:'Server Error'})
  }
});

// export router
export default router;

