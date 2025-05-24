// controllers/exerciseController.js
const Exercise = require('../models/Exercise');

// Adicionar um novo exercício
exports.addExercise = async (req, res) => {
  try {
    const { name, muscleGroup, targetMuscle, videoUrl, thumbnailUrl, description } = req.body;

    if (!name || !muscleGroup || !videoUrl) {
      return res.status(400).json({ message: 'Nome, grupo muscular e URL do vídeo são obrigatórios.' });
    }

    const existingExercise = await Exercise.findOne({ name });
    if (existingExercise) {
      return res.status(400).json({ message: 'Um exercício com este nome já existe.' });
    }

    const newExercise = new Exercise({
      name,
      muscleGroup,
      targetMuscle,
      videoUrl,
      thumbnailUrl,
      description,
    });

    await newExercise.save();
    res.status(201).json({ message: 'Exercício adicionado com sucesso!', exercise: newExercise });

  } catch (error) {
    console.error('Erro ao adicionar exercício:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

// Listar todos os exercícios (ou por grupo muscular)
exports.getExercises = async (req, res) => {
  try {
    const { muscleGroup } = req.query; // Permite filtrar por ?muscleGroup=Perna
    const query = muscleGroup ? { muscleGroup } : {};
    const exercises = await Exercise.find(query);
    res.status(200).json(exercises);
  } catch (error) {
    console.error('Erro ao buscar exercícios:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

// (Opcional) Buscar um exercício por nome (pode ser útil para o endpoint da IA)
exports.getExerciseByName = async (req, res) => {
    try {
        const exerciseName = req.params.name;
        // Busca case-insensitive usando regex (opcional, mas útil)
        const exercise = await Exercise.findOne({ name: { $regex: new RegExp(`^<span class="math-inline">\{exerciseName\}</span>`, 'i') } });
        if (!exercise) {
            return res.status(404).json({ message: 'Exercício não encontrado.' });
        }
        res.status(200).json(exercise);
    } catch (error) {
        console.error('Erro ao buscar exercício por nome:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};