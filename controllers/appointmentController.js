import {
  createAppointment,
  getAppointmentsByCalendarId,
  cancelAppointment,
  updateAppointmentDetails,
  deleteAppointment,
} from "../models/appointment.js";

export const getAllAppointmentsByCalendar = async (req, res) => {
  const { calendarId } = req.params;

  try {
    const appointments = await getAppointmentsByCalendarId(calendarId);
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Erro ao listar agendamentos:", error);
    res.status(500).json({ message: "Erro ao listar agendamentos" });
  }
};

export const createNewAppointment = async (req, res) => {
  const { calendarId, clientName, date, time, meetingType, reason } = req.body;

  if (!calendarId || !clientName || !date || !time) {
    return res
      .status(400)
      .json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
  }

  try {
    const newAppointmentId = await createAppointment(
      calendarId,
      clientName,
      date,
      time,
      meetingType,
      reason
    );
    res.status(201).json({
      message: "Agendamento criado com sucesso.",
      appointmentId: newAppointmentId,
    });
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    res.status(500).json({ message: "Erro ao criar agendamento" });
  }
};

export const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { date, status } = req.body;

  try {
    const affectedRows = await updateAppointmentDetails(id, date, status);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Agendamento não encontrado." });
    }

    res.status(200).json({ message: "Agendamento atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar agendamento:", error);
    res.status(500).json({ message: "Erro ao atualizar agendamento" });
  }
};

export const cancelAppointmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const affectedRows = await cancelAppointment(id);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Agendamento não encontrado." });
    }

    res.status(200).json({ message: "Agendamento cancelado com sucesso." });
  } catch (error) {
    console.error("Erro ao cancelar agendamento:", error);
    res.status(500).json({ message: "Erro ao cancelar agendamento" });
  }
};

export const deleteAppointmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const affectedRows = await deleteAppointment(id);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Agendamento não encontrado." });
    }

    res.status(200).json({ message: "Agendamento excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir agendamento:", error);
    res.status(500).json({ message: "Erro ao excluir agendamento" });
  }
};
