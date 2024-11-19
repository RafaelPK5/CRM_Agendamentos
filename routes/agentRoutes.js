import express from 'express';
import { getAgents, createAgent } from '../controllers/agentController.js';

const router = express.Router();

// Rotas de agentes
router.get('/', getAgents);
router.post('/', createAgent);

export default router;
