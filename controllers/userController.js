import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByEmail, createUser, updateUser, deleteUser, updateNameUserbyId } from '../models/user.js';
import { sendWelcomeEmail } from '../utils/jwt.js'; // Supondo que você tenha a função de enviar email

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  // Verificar se o usuário já existe
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: 'Usuário já existe' });
  }

  // Criptografar a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criar o usuário
  const userId = await createUser(email, hashedPassword);

  // Enviar email de boas-vindas
  sendWelcomeEmail(email);

  res.status(201).json({ message: 'Usuário registrado com sucesso', userId });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Buscar o usuário pelo email
  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  // Verificar se a senha está correta
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: 'Senha incorreta' });
  }

  // Gerar o token JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ token });
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { email, password } = req.body;

  // Criptografar a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await updateUser(userId, email, hashedPassword);

  if (result === 0) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  res.status(200).json({ message: 'Usuário atualizado com sucesso' });
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  const result = await deleteUser(userId);

  if (result === 0) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  res.status(200).json({ message: 'Usuário excluído com sucesso' });
};

export const updateNameUser = async (req,res) => {
  const {userId} = req.params;
  const {name} = req.body;

  const result = await updateNameUserbyId(userId, name);
  if (result === 0){
    return res.status(404).json({message: 'Usuário não encontrado'})
  }

  res.status(200).json({message: 'Nome alterado com sucesso'})
}