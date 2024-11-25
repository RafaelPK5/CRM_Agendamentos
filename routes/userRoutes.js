import express from "express";
import {
  registerUser,
  loginUser,
  updateUserInfo,
  updateUserName,
  deleteUserById,
} from "../controllers/userController.js";
import { authenticateToken } from "../middleware/auth.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.put("/update/:id", authenticateToken, updateUserInfo);
userRoutes.patch("/update-name/:id", authenticateToken, updateUserName);
userRoutes.delete("/:id", authenticateToken, deleteUserById);

export default userRoutes;
