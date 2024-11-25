import {
  createAvailability,
  getAvailabilityByCalendarId,
  deleteAvailability,
} from "../models/availabilities.js";

export const createNewAvailability = async (req, res) => {
  const { calendarId, dayOfWeek, startTime, endTime } = req.body;

  if (!calendarId || !dayOfWeek || !startTime || !endTime) {
    return res
      .status(400)
      .json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
  }

  try {
    const newAvailabilityId = await createAvailability(
      calendarId,
      dayOfWeek,
      startTime,
      endTime
    );
    res.status(201).json({
      message: "Disponibilidade criada com sucesso.",
      id: newAvailabilityId,
    });
  } catch (error) {
    console.error("Erro ao criar disponibilidade:", error);
    res.status(500).json({ message: "Erro ao criar disponibilidade." });
  }
};

export const getAvailabilityByCalendar = async (req, res) => {
  const { calendarId } = req.params;

  try {
    const availability = await getAvailabilityByCalendarId(calendarId);
    res.status(200).json(availability);
  } catch (error) {
    console.error("Erro ao listar disponibilidades:", error);
    res.status(500).json({ message: "Erro ao listar disponibilidades." });
  }
};

export const deleteAvailabilityById = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteAvailability(id);
    res.status(200).json({ message: "Disponibilidade excluída com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir disponibilidade:", error);
    res.status(500).json({ message: "Erro ao excluir disponibilidade." });
  }
};
