import express from "express";
import {
  createNewAvailability,
  getAvailabilityByCalendar,
  deleteAvailabilityById,
} from "../controllers/availabilityController.js";

const router = express.Router();

router.post("/", createNewAvailability);

router.get("/:calendarId", getAvailabilityByCalendar);

router.delete("/:id", deleteAvailabilityById);

export default router;
