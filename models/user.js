import pool from "../config/database.js";
import { hashPassword, comparePassword } from "../utils/password.js";

export const getUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?";
  const [rows] = await pool.query(query, [email]);
  if (rows.length === 0) return null;

  const user = rows[0];
  user.checkPassword = async (password) =>
    await comparePassword(password, user.password);
  return user;
};

export const createUser = async (email, password) => {
  const passwordHash = await hashPassword(password);
  const query = "INSERT INTO users (email, password) VALUES (?, ?)";
  const [result] = await pool.query(query, [email, passwordHash]);
  return { id: result.insertId, email };
};

export const updateNameUserbyId = async (userId, name) => {
  const query = "UPDATE users SET name = ? WHERE id = ?";
  const [result] = await pool.query(query, [name, userId]);
  return result.affectedRows;
};

export const updateUser = async (userId, email, password) => {
  const passwordHash = await hashPassword(password);
  const query = "UPDATE users SET email = ?, password = ? WHERE id = ?";
  const [result] = await pool.query(query, [email, passwordHash, userId]);
  return result.affectedRows;
};

export const deleteUser = async (userId) => {
  const query = "DELETE FROM users WHERE id = ?";
  const [result] = await pool.query(query, [userId]);
  return result.affectedRows;
};
