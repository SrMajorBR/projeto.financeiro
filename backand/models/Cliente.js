const mongoose = require('mongoose');

//Definindo o esquema para um cliente
const clienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    telefone: {
        type: String
    }
});

//Criando o modelo do cliente
const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;