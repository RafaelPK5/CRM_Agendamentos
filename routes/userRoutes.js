import express from "express";
import {
  registerUser,
  loginUser,
  updateUserInfo,
  updateUserName,
  deleteUserById,
} from "../controllers/userController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update/:id", authenticateToken, updateUserInfo);
router.patch("/update-name/:id", authenticateToken, updateUserName);
router.delete("/:id", authenticateToken, deleteUserById);

export default router;
