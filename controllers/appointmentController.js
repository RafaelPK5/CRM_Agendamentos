// controllers/appointmentController.js
import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from '../models/appointmentModel.js';

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await getAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar agendamentos' });
  }
};

export const createNewAppointment = async (req, res) => {
  const { agent_id, client_id, appointment_date } = req.body;
  
  if (!agent_id || !client_id || !appointment_date) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const newAppointment = await createAppointment(agent_id, client_id, appointment_date);
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar agendamento' });
  }
};

export const updateAppointmentDetails = async (req, res) => {
  const { id } = req.params;
  const { appointment_date, status } = req.body;
  
  try {
    const updatedAppointment = await updateAppointment(id, appointment_date, status);
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar agendamento' });
  }
};

export const cancelAppointment = async (req, res) => {
  const { id } = req.params;
  
  try {
    const cancelledAppointment = await deleteAppointment(id);
    res.status(200).json(cancelledAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cancelar agendamento' });
  }
};
