// routes/appointmentRoutes.js
import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  getAllAppointmentsByCalendar,
  createNewAppointment,
  updateAppointment,
  cancelAppointmentById,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.get("/appointments", authenticateToken, getAllAppointmentsByCalendar);
router.post("/appointments", authenticateToken, createNewAppointment);
router.put("/appointments/:id", authenticateToken, updateAppointment);
router.delete("/appointments/:id", authenticateToken, cancelAppointmentById);

export default router;
