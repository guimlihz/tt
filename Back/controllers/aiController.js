// controllers/aiController.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const User = require('../models/User'); // Para buscar mais detalhes do usuário, se necessário
const Exercise = require('../models/Exercise'); // Nosso modelo de exercício

console.log("GEMINI_API_KEY do .env:", process.env.GEMINI_API_KEY);

// Inicializa o cliente do Gemini com sua chave de API (do .env)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); // Tente este modelo


exports.generateWorkoutPlan = async (req, res) => {
  try {
    // Dados do usuário podem vir do corpo da requisição ou do req.user se a rota for protegida
    // Para este exemplo, vamos assumir que o frontend envia os dados relevantes no corpo.
    // No futuro, com autenticação, você pegaria o ID do usuário de req.user.id
    // e buscaria os dados do perfil no seu banco se necessário.
    const { age, weight, height, goal, availability, experienceLevel /* outros dados... */ } = req.body;

    if (!goal || !availability) {
      return res.status(400).json({ message: 'Objetivo e disponibilidade são necessários para gerar o treino.' });
    }

    // 1. Construir o Prompt para o Gemini
    // Este é um exemplo MUITO SIMPLES. Você precisará refinar bastante este prompt
    // para obter os resultados desejados e no formato que você espera.
    const prompt = `
      Crie um plano de treino de ${availability} focado em ${goal} para uma pessoa com ${age} anos, ${weight}kg e ${height}cm de altura.
      Nível de experiência: ${experienceLevel || 'iniciante'}.
      Para cada dia de treino, especifique o foco principal (ex: Peito e Tríceps).
      Para cada dia, liste os exercícios. Para cada exercício, forneça:
      - "exerciseName": o nome exato do exercício (ex: "Supino Reto", "Agachamento Livre")
      - "sets": número de séries (ex: "3" ou "3-4")
      - "reps": número de repetições (ex: "8-12" ou "15")
      - "rest": tempo de descanso em segundos (ex: "60s" ou "90-120s")

      Retorne a resposta APENAS em formato JSON, seguindo esta estrutura:
      {
        "planName": "Nome do Plano Sugerido pela IA",
        "weeklySchedule": [
          {
            "dayOfWeek": "Dia 1", // ou "Segunda-feira", etc.
            "focus": "Foco do dia",
            "exercises": [
              { "exerciseName": "Nome Exercicio 1", "sets": "...", "reps": "...", "rest": "..." },
              { "exerciseName": "Nome Exercicio 2", "sets": "...", "reps": "...", "rest": "..." }
            ]
          }
        ]
      }
    `;

    console.log("Enviando prompt para o Gemini:", prompt);

    // 2. Chamar a API do Gemini
    const result = await model.generateContent(prompt);
    const response = result.response;
    let textResponse = response.text(); 


    console.log("Resposta crua do Gemini:", textResponse);

    let aiWorkoutPlan;
    let cleanedJsonString = textResponse;


    try {
      // Tenta parsear a resposta do Gemini como JSON
      // É crucial que o prompt instrua o Gemini a retornar JSON VÁLIDO.
      aiWorkoutPlan = (textResponse);
    } catch (parseError) {
      console.error("Erro ao parsear JSON da resposta do Gemini:", parseError);
      console.error("Resposta do Gemini que causou o erro:", textResponse);
      return res.status(500).json({ message: 'Erro ao processar a resposta da IA. A resposta não foi um JSON válido.' });
    }

    // 3. Enriquecer o plano com dados do nosso banco de Exercícios
    if (aiWorkoutPlan && aiWorkoutPlan.weeklySchedule) {
      for (const day of aiWorkoutPlan.weeklySchedule) {
        if (day.exercises && Array.isArray(day.exercises)) {
          for (let i = 0; i < day.exercises.length; i++) {
            const aiExercise = day.exercises[i];
            if (aiExercise.exerciseName) {
              // Busca o exercício no nosso banco pelo nome (case-insensitive)
              const dbExercise = await Exercise.findOne({
                name: { $regex: new RegExp(`^<span class="math-inline">\{aiExercise\.exerciseName\}</span>`, 'i') }
              });

              if (dbExercise) {
                // Adiciona as URLs e outros dados do nosso banco
                aiExercise.videoId = dbExercise.videoUrl;
                aiExercise.thumbnailUrl = dbExercise.thumbnailUrl;
                aiExercise.targetMuscle = dbExercise.targetMuscle;
                aiExercise.description = dbExercise.description;
                // Renomeia exerciseName para name para padronizar (opcional)
                aiExercise.name = dbExercise.name; // Usa o nome canônico do banco
                // delete aiExercise.exerciseName; // Remove o antigo se renomeou
              } else {
                // Exercício sugerido pela IA não encontrado no nosso banco
                // Poderia ter um fallback ou apenas não incluir vídeo/thumbnail
                console.warn(`Exercício "${aiExercise.exerciseName}" não encontrado no banco de dados local.`);
                aiExercise.name = aiExercise.exerciseName; // Mantém o nome da IA
                aiExercise.videoId = null;
                aiExercise.thumbnailUrl = null;
              }
            }
          }
        }
      }
    }

    res.status(200).json(aiWorkoutPlan);

  } catch (error) {
    console.error('Erro ao gerar plano de treino via IA:', error);
    if (error.message.includes('API key not valid')) {
         return res.status(500).json({ message: 'Erro de configuração da API do Gemini: Chave de API inválida.' });
    }
    res.status(500).json({ message: 'Erro interno do servidor ao gerar plano de treino.' });
  }
};