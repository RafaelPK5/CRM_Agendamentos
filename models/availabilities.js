import db from "../config/database.js";

// CRUD de Disponibilidade
export const createAvailability = async (
  calendarId,
  dayOfWeek,
  startTime,
  endTime
) => {
  const query = `
        INSERT INTO availability (calendar_id, day_of_week, start_time, end_time)
        VALUES (?, ?, ?, ?)
    `;
  const [result] = await db.query(query, [
    calendarId,
    dayOfWeek,
    startTime,
    endTime,
  ]);
  return result.insertId;
};

export const getAvailabilityByCalendarId = async (calendarId) => {
  const query = `
        SELECT * FROM availability
        WHERE calendar_id = ?
    `;
  const [rows] = await db.query(query, [calendarId]);
  return rows;
};

export const deleteAvailability = async (id) => {
  const query = `
        DELETE FROM availability
        WHERE id = ?
    `;
  await db.query(query, [id]);
};
