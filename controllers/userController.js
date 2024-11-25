import {
  createUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  updateNameUserbyId,
} from "../models/user.js";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica se o e-mail já está registrado
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "E-mail já registrado." });
    }

    const newUser = await createUser(email, password);

    res
      .status(201)
      .json({ message: "Usuário criado com sucesso.", user: newUser });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ message: "Erro ao registrar usuário." });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca o usuário pelo e-mail
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    // Gera um token JWT
    const token = generateToken({ id: user.id, email: user.email });

    res.status(200).json({ message: "Login realizado com sucesso.", token });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ message: "Erro ao realizar login." });
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    const affectedRows = await updateUser(id, email, password);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json({ message: "Usuário atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ message: "Erro ao atualizar usuário." });
  }
};

export const updateUserName = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const affectedRows = await updateNameUserbyId(id, name);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res
      .status(200)
      .json({ message: "Nome do usuário atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar nome do usuário:", error);
    res.status(500).json({ message: "Erro ao atualizar nome do usuário." });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const affectedRows = await deleteUser(id);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json({ message: "Usuário deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ message: "Erro ao deletar usuário." });
  }
};
