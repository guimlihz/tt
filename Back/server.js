const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); // 👈 novo
const exerciseRoutes = require('./routes/exerciseRoutes');
const aiRoutes = require('./routes/aiRoutes');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
  res.send('API do GYM APP está funcionando!');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);; // 👈 novo

app.use('/api/exercises', exerciseRoutes);
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} e MongoDB Conectado`);
});
