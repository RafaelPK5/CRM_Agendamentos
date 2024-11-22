import express from 'express';
import { registerUser, loginUser, updateUser, deleteUser, updateNameUser} from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Rotas públicas
router.post('/register', registerUser);
router.post('/login', loginUser);
// Rota para atualizar usuário
router.put('/:id', authenticateToken, updateUser);

// Rota para deletar usuário
router.delete('/:id', authenticateToken, deleteUser);
// Rotas protegidas (exemplo)
router.get('/protected', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Acesso autorizado!', userId: req.userId });
});

// Rota para atualizar usuário
router.put('/:id', authenticateToken, updateUser);
router.put('/name/:id', authenticateToken, updateNameUser)
// Rota para deletar usuário
router.delete('/:id', authenticateToken, deleteUser);

export default router;
