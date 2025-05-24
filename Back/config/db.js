// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Tenta conectar ao MongoDB usando a URI do arquivo .env
    // Mongoose 6+ não precisa mais das opções como useNewUrlParser, useUnifiedTopology, etc.
    // Elas são padrão ou não são mais suportadas.
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erro ao conectar ao MongoDB: ${error.message}`);
    process.exit(1); // Sai do processo com falha
  }
};

module.exports = connectDB; // Exporta a função para ser usada em outros lugares