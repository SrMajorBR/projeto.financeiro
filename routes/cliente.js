const express = require('express');
const Cliente = require('../backand/models/Cliente');
const router = express.Router();

//Rota para adicionar um novo cliente
router.post('/clientes', async (req, res) => {
    const {nome, email, telefone} = req.body;

    //Verificar se o cliente já existe
    const clienteExistente = await Cliente.findOne({ email });
    if (clienteExistente) {
        return res.status(400).json({ mensagem: 'Cliente com este e-mail já existe.'});
    }

//Criar um novo cliente
const cliente = new Cliente({
    nome,
    email,
    telefone
});

try {
    await cliente.save();
    res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso!', clente});
} catch (err) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar cliente', erro: err});
}
});

module.exports = router;