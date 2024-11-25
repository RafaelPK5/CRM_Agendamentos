import express from "express";
import {
  createNewAvailability,
  getAvailabilityByCalendar,
  deleteAvailabilityById,
} from "../controllers/avaliabilityController.js";

const router = express.Router();

router.post("/", createNewAvailability);

router.get("/:calendarId", getAvailabilityByCalendar);

router.delete("/:id", deleteAvailabilityById);

export default router;
