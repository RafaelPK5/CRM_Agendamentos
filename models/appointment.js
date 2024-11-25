import db from "../config/database.js";

export const createAppointment = async (
  calendarId,
  clientName,
  date,
  time,
  meetingType,
  reason
) => {
  const query = `
        INSERT INTO appointments (calendar_id, client_name, appointment_date, appointment_time, meeting_type, reason)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
  const [result] = await db.query(query, [
    calendarId,
    clientName,
    date,
    time,
    meetingType,
    reason,
  ]);
  return result.insertId;
};

export const getAppointmentsByCalendarId = async (calendarId) => {
  const query = `
        SELECT * FROM appointments
        WHERE calendar_id = ?
        ORDER BY appointment_date, appointment_time
    `;
  const [rows] = await db.query(query, [calendarId]);
  return rows;
};

export const cancelAppointment = async (id) => {
  const query = `
        UPDATE appointments
        SET status = 'cancelled'
        WHERE id = ?
    `;
  const [result] = await db.query(query, [id]);
  return result.affectedRows;
};

export const updateAppointmentDetails = async (id, appointmentDate, status) => {
  const query = `
        UPDATE appointments
        SET appointment_date = ?, status = ?
        WHERE id = ?
    `;
  const [result] = await db.query(query, [appointmentDate, status, id]);
  return result.affectedRows;
};

export const deleteAppointment = async (id) => {
  const query = `
        DELETE FROM appointments
        WHERE id = ?
    `;
  const [result] = await db.query(query, [id]);
  return result.affectedRows;
};
