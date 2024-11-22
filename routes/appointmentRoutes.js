// routes/appointmentRoutes.js
import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getAllAppointments, createNewAppointment, updateAppointmentDetails, cancelAppointment } from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/appointments', authenticateToken, getAllAppointments);
router.post('/appointments', authenticateToken, createNewAppointment);
router.put('/appointments/:id', authenticateToken, updateAppointmentDetails);
router.delete('/appointments/:id', authenticateToken, cancelAppointment);

export default router;
