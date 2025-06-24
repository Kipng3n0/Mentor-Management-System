import express from 'express';
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  getAssignedMentees,
  getAssignedMentor,
} from '../controllers/appointmentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new appointment
router.post('/', authMiddleware, createAppointment);

// Get all appointments for the logged-in user
router.get('/', authMiddleware, getAppointments);

// Update appointment status (Accept/Reject)
router.patch('/:appointmentId', authMiddleware, updateAppointmentStatus);

// Get mentees assigned to a mentor
router.get('/assigned-mentees', authMiddleware, getAssignedMentees);

// Get mentor assigned to a mentee
router.get('/mentor', authMiddleware, getAssignedMentor);
// Accept an appointment
router.patch("/:id/accept", authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    appointment.status = "Accepted";
    await appointment.save();

    res.json({ message: "Appointment accepted" });
  } catch (error) {
    console.error("Accept error:", error);
    res.status(500).json({ message: "Error accepting appointment" });
  }
});

// Reject an appointment
router.patch("/:id/reject", authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    appointment.status = "Rejected";
    await appointment.save();

    res.json({ message: "Appointment rejected" });
  } catch (error) {
    console.error("Reject error:", error);
    res.status(500).json({ message: "Error rejecting appointment" });
  }
});


export default router;
