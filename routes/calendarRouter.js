import express from "express";
import {
  createNewCalendar,
  getUserCalendar,
  getCalendarByUniqueLink,
} from "../controllers/calendarController.js";

const router = express.Router();

router.post("/", createNewCalendar);

router.get("/user/:userId", getUserCalendar);

router.get("/link/:uniqueLink", getCalendarByUniqueLink);

export default router;
