// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Por favor, forneça um nome de usuário.'],
    unique: true, // Nomes de usuário devem ser únicos
    trim: true,   // Remove espaços em branco extras
  },
  email: {
    type: String,
    required: [true, 'Por favor, forneça um email.'],
    unique: true, // Emails devem ser únicos
    trim: true,
    lowercase: true, // Armazena emails em minúsculas para consistência
    // Adicionar uma validação simples de email (pode ser mais robusta)
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Por favor, forneça um email válido.'],
  },
  password: {
    type: String,
    required: [true, 'Por favor, forneça uma senha.'],
    minlength: [6, 'A senha deve ter pelo menos 6 caracteres.'], // Define um tamanho mínimo
    select: false, // Por padrão, não retorna a senha nas queries (para segurança)
  },
  age: {
    type: Number,
    // required: [true, 'Por favor, forneça sua idade.'], // Descomente se for obrigatório no backend
  },
  weight: { // Peso em Kg
    type: Number,
    // required: [true, 'Por favor, forneça seu peso.'],
  },
  height: { // Altura em cm
    type: Number,
    // required: [true, 'Por favor, forneça sua altura.'],
  },
  goal: { // Ex: Hipertrofia, Perda de Peso, Condicionamento
    type: String,
    trim: true,
    // required: [true, 'Por favor, forneça seu objetivo.'],
  },
  availability: { // Ex: "3 dias/semana", "Seg, Qua, Sex"
    type: String,
    trim: true,
    // required: [true, 'Por favor, forneça sua disponibilidade.'],
  },
  // Adicionaremos campos de data de criação/atualização automaticamente com timestamps
}, {
  timestamps: true, // Adiciona os campos createdAt e updatedAt automaticamente
});

// Antes de salvar, vamos adicionar a lógica para hashear a senha (faremos isso no passo de rotas/controllers)

const User = mongoose.model('User', userSchema); // Cria o modelo 'User' baseado no schema

module.exports = User; // Exporta o modelo