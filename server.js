const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const clienteRoutes = require('./routes/cliente'); // Importe a rota de clientes
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware para permitir que o express leia o corpo da requisição JSON

// Conectar ao MongoDB
mongoose.connect('mongodb+srv://nicolasfontes:eu21947a@users.cbcpz.mongodb.net/projetoFinanceiro?retryWrites=true&w=majority')
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.log('Erro ao conectar ao MongoDB', err));

// Usar as rotas de cliente
app.use(clienteRoutes);

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
