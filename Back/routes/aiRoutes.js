// routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const { generateWorkoutPlan } = require('../controllers/aiController');
// const authMiddleware = require('../middleware/authMiddleware'); // Descomente quando tiver autenticação

// POST /api/ai/generate-workout
// No futuro, proteja esta rota: router.post('/generate-workout', authMiddleware, generateWorkoutPlan);
router.post('/generate-workout', generateWorkoutPlan);

module.exports = router;