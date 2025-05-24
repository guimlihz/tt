const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET - listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// PUT - atualizar usuário por ID
router.put('/:id', async (req, res) => {
  console.log('➡️ PUT recebido em /users/:id');
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.password) {
      return res.status(400).json({ message: 'Atualização de senha não permitida por aqui.' });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.json({ message: 'Usuário atualizado com sucesso.', user: updatedUser });
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    res.status(500).json({ message: 'Erro ao atualizar usuário.' });
  }
});

// DELETE - deletar usuário por ID
router.delete('/:id', async (req, res) => {
  console.log('➡️ DELETE recebido em /users/:id');
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.json({ message: 'Usuário deletado com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    res.status(500).json({ message: 'Erro ao deletar usuário.' });
  }
});

module.exports = router;


