// models/appointmentModel.js
import db from '../config/database.js';

export const getAppointments = async () => {
  const query = 'SELECT * FROM appointments';
  const [appointments] = await db.execute(query);
  return appointments;
};

export const createAppointment = async (agent_id, client_id, appointment_date) => {
  const query = 'INSERT INTO appointments (agent_id, client_id, appointment_date) VALUES (?, ?, ?)';
  const [result] = await db.execute(query, [agent_id, client_id, appointment_date]);
  return result;
};

export const updateAppointment = async (id, appointment_date, status) => {
  const query = 'UPDATE appointments SET appointment_date = ?, status = ? WHERE id = ?';
  const [result] = await db.execute(query, [appointment_date, status, id]);
  return result;
};

export const deleteAppointment = async (id) => {
  const query = 'DELETE FROM appointments WHERE id = ?';
  const [result] = await db.execute(query, [id]);
  return result;
};
