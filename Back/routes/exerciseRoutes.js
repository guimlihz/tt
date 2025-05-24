// routes/exerciseRoutes.js
const express = require('express');
const router = express.Router();
const { addExercise, getExercises, getExerciseByName } = require('../controllers/exerciseController');
// Futuramente, você pode adicionar middleware de autenticação aqui se certas rotas precisarem

router.post('/', addExercise); // POST /api/exercises
router.get('/', getExercises);   // GET /api/exercises  (ou GET /api/exercises?muscleGroup=Perna)
router.get('/:name', getExerciseByName); // GET /api/exercises/Supino%20Reto (nome url-encoded)


module.exports = router;