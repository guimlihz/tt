// Em models/Exercise.js (no seu projeto da API backend)
const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O nome do exercício é obrigatório.'],
    unique: true, // Garante que não haja exercícios com o mesmo nome
    trim: true,
  },
  muscleGroup: { // Ex: Peito, Costas, Perna, Bíceps, Tríceps
    type: String,
    required: [true, 'O grupo muscular é obrigatório.'],
    trim: true,
  },
  targetMuscle: { // Ex: Quadríceps, Peitoral Maior (mais específico)
    type: String,
    trim: true,
  },
  videoUrl: { // URL completa do vídeo do YouTube
    type: String,
    required: [true, 'A URL do vídeo é obrigatória.'],
    trim: true,
  },
  thumbnailUrl: { // URL de uma imagem de thumbnail (pode ser a thumbnail padrão do YouTube)
    type: String,
    trim: true,
  },
  description: { // Descrição curta ou dicas
    type: String,
    trim: true,
  },
  // Você pode adicionar outros campos se desejar, como dificuldade, equipamento necessário, etc.
}, {
  timestamps: true, // Adiciona createdAt e updatedAt
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;