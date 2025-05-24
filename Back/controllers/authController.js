// controllers/authController.js
const User = require('../models/User'); // Importa o modelo User
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Função para registrar um novo usuário
exports.registerUser = async (req, res) => {
  try {
    // 1. Obter os dados do corpo da requisição
    const { username, email, password, age, weight, height, goal, availability } = req.body;

    // 2. Validar se os campos obrigatórios (username, email, password) foram enviados
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Por favor, forneça nome de usuário, email e senha.' });
    }

    // 3. Verificar se o usuário (email ou username) já existe
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ message: 'Este nome de usuário já está em uso.' });
    }

    // 4. Hashear a senha
    const salt = await bcrypt.genSalt(10); // Gera um "salt" para o hash
    const hashedPassword = await bcrypt.hash(password, salt); // Cria o hash da senha

    // 5. Criar o novo usuário
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Salva a senha hasheada
      age,
      weight,
      height,
      goal,
      availability,
    });

    // 6. Salvar o usuário no banco de dados
    await newUser.save();

    // 7. Responder com sucesso (sem enviar a senha)
    // Poderíamos enviar o usuário criado (sem a senha) ou apenas uma mensagem.
    // Para o JWT, faremos o login e geração do token separadamente.
    res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      // Opcional: enviar alguns dados do usuário (sem a senha!)
      // user: {
      //   id: newUser._id,
      //   username: newUser.username,
      //   email: newUser.email
      // }
    });

  } catch (error) {
    // Tratar erros de validação do Mongoose ou outros erros
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join('. ') });
    }
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao registrar usuário.' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Validar entrada
    if (!email || !password) {
      return res.status(400).json({ message: 'Por favor, forneça email e senha.' });
    }

    // 2. Encontrar usuário pelo email
    // Lembre-se que a senha no banco está hasheada, então não a selecionamos aqui diretamente
    const user = await User.findOne({ email }).select('+password'); // Seleciona o password explicitamente para comparação

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' }); // Usuário não encontrado
    }

    // 3. Comparar a senha fornecida com a senha hasheada no banco
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' }); // Senha incorreta
    }

    // 4. Usuário autenticado, gerar token JWT
    const payload = {
      user: {
        id: user.id, // ou user._id dependendo do Mongoose
        username: user.username
        // Não inclua informações sensíveis no payload se não for necessário
      },
    };

    // Crie uma variável de ambiente para seu JWT_SECRET no arquivo .env
    // Ex: JWT_SECRET=seuSegredoSuperSecretoParaJWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Seu segredo JWT
      { expiresIn: '1h' }, // Token expira em 1 hora (exemplo)
      (err, token) => {
        if (err) throw err;
        res.json({
          message: 'Login bem-sucedido!',
          token,
          user: { // Enviar alguns dados do usuário é útil para o app
            id: user.id,
            username: user.username,
            email: user.email
          }
        });
      }
    );

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao tentar fazer login.' });
  }
};
// A função de login virá aqui depois