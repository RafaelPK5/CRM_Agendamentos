import pool from "../config/database.js";

// Listar todos os agentes
export const getAgents = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, timezone FROM agents"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar agentes:", error);
    res.status(500).json({ error: "Erro ao buscar agentes" });
  }
};

// Criar novo agente
export const createAgent = async (req, res) => {
  const { name, email, password, timezone } = req.body;
  try {
    await pool.query(
      "INSERT INTO agents (name, email, password, timezone) VALUES (?, ?, ?, ?)",
      [name, email, password, timezone || "UTC"]
    );
    res.status(201).json({ message: "Agente criado com sucesso!" });
  } catch (error) {
    console.error("Erro ao criar agente:", error);
    res.status(500).json({ error: "Erro ao criar agente" });
  }
};
