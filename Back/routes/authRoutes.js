// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController'); // Importa a função do controller

// Rota para POST /api/auth/register
router.post('/register', registerUser);
router.post('/login', loginUser);

// A rota de login virá aqui depois

module.exports = router;