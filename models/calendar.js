import db from "../config/database.js";

// CRUD de Calendários
export const createCalendar = async (userId, uniqueLink) => {
  const query = `
        INSERT INTO calendars (user_id, unique_link)
        VALUES (?, ?)
    `;
  const [result] = await db.query(query, [userId, uniqueLink]);
  return result.insertId;
};

export const getCalendarByUserId = async (userId) => {
  const query = `
        SELECT * FROM calendars
        WHERE user_id = ?
    `;
  const [rows] = await db.query(query, [userId]);
  return rows[0];
};

export const getCalendarByLink = async (uniqueLink) => {
  const query = `
        SELECT * FROM calendars
        WHERE unique_link = ?
    `;
  const [rows] = await db.query(query, [uniqueLink]);
  return rows[0];
};
