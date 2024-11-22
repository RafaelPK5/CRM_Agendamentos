// models/user.js
import { pool } from '../config/database.js';

export const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  const [rows] = await pool.query(query, [email]);
  return rows[0]; // Retorna o primeiro usuário encontrado
};

export const createUser = async (email, passwordHash) => {
  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
  const [result] = await pool.query(query, [email, passwordHash]);
  return result.insertId; // Retorna o ID do novo usuário inserido
};

export const updateNameUserbyId = async (userId, name) => {
    const query = 'UPDATE users SET name = ? WHERE id = ?';
    const [result] = await pool.query(query, [name, userId]);
    return result.affectedRows; // Retorna o número de linhas afetadas
};

export const updateUser = async (userId, email, passwordHash) => {
  const query = 'UPDATE users SET email = ?, password = ? WHERE id = ?';
  const [result] = await pool.query(query, [email, passwordHash, userId]);
  return result.affectedRows; // Retorna o número de linhas afetadas
};

export const deleteUser = async (userId) => {
  const query = 'DELETE FROM users WHERE id = ?';
  const [result] = await pool.query(query, [userId]);
  return result.affectedRows; // Retorna o número de linhas afetadas
};
