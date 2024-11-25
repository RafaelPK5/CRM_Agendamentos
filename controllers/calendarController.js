import {
  createCalendar,
  getCalendarByUserId,
  getCalendarByLink,
} from "../models/calendar.js";

export const createNewCalendar = async (req, res) => {
  const { userId, uniqueLink } = req.body;

  if (!userId || !uniqueLink) {
    return res
      .status(400)
      .json({ message: "Os campos userId e uniqueLink são obrigatórios." });
  }

  try {
    const newCalendarId = await createCalendar(userId, uniqueLink);
    res
      .status(201)
      .json({ message: "Calendário criado com sucesso.", id: newCalendarId });
  } catch (error) {
    console.error("Erro ao criar calendário:", error);
    res.status(500).json({ message: "Erro ao criar calendário." });
  }
};

export const getUserCalendar = async (req, res) => {
  const { userId } = req.params;

  try {
    const calendar = await getCalendarByUserId(userId);

    if (!calendar) {
      return res.status(404).json({ message: "Calendário não encontrado." });
    }

    res.status(200).json(calendar);
  } catch (error) {
    console.error("Erro ao obter calendário do usuário:", error);
    res.status(500).json({ message: "Erro ao obter calendário do usuário." });
  }
};

export const getCalendarByUniqueLink = async (req, res) => {
  const { uniqueLink } = req.params;

  try {
    const calendar = await getCalendarByLink(uniqueLink);

    if (!calendar) {
      return res.status(404).json({ message: "Calendário não encontrado." });
    }

    res.status(200).json(calendar);
  } catch (error) {
    console.error("Erro ao obter calendário pelo link:", error);
    res.status(500).json({ message: "Erro ao obter calendário pelo link." });
  }
};
