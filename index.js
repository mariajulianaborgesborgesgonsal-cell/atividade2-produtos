const express = require('express');
const app = express();

app.use(express.json());
const PORTA = 3000;

let bancoDeProdutos = [];
let contadorID = 1;

app.post('/produtos', (req, res) => {
    const dadosRecebidos = req.body;
    const produtoCriado = {
        id: contadorID,
        nome: dadosRecebidos.nome,
        preco: dadosRecebidos.preco,
        quantidade: dadosRecebidos.quantidade
    };
    bancoDeProdutos.push(produtoCriado);
    contadorID++;
    res.status(201).json(produtoCriado);
});

app.get('/produtos', (req, res) => {
    res.json(bancoDeProdutos);
});

app.get('/produtos/:id', (req, res) => {
    const idBuscado = parseInt(req.params.id);
    const produtoEncontrado = bancoDeProdutos.find(item => item.id === idBuscado);
    if (!produtoEncontrado) {
        res.status(404).json({ mensagem: "Produto não encontrado!" });
    } else {
        res.json(produtoEncontrado);
    }
});

app.put('/produtos/:id', (req, res) => {
    const idAlvo = parseInt(req.params.id);
    const posicaoNoVetor = bancoDeProdutos.findIndex(item => item.id === idAlvo);
    if (posicaoNoVetor < 0) {
        return res.status(404).json({ mensagem: "Produto não encontrado!" });
    }
    bancoDeProdutos[posicaoNoVetor] = {
        id: idAlvo,
        nome: req.body.nome,
        preco: req.body.preco,
        quantidade: req.body.quantidade
    };
    res.json(bancoDeProdutos[posicaoNoVetor]);
});

app.patch('/produtos/:id', (req, res) => {
    const idAlvo = parseInt(req.params.id);
    const produtoAlvo = bancoDeProdutos.find(item => item.id === idAlvo);
    if (!produtoAlvo) {
        return res.status(404).json({ mensagem: "Produto não encontrado!" });
    }
    if (req.body.nome) produtoAlvo.nome = req.body.nome;
    if (req.body.preco) produtoAlvo.preco = req.body.preco;
    if (req.body.quantidade) produtoAlvo.quantidade = req.body.quantidade;
    res.json(produtoAlvo);
});

app.delete('/produtos/:id', (req, res) => {
    const idDeletar = parseInt(req.params.id);
    const posicao = bancoDeProdutos.findIndex(item => item.id === idDeletar);
    if (posicao < 0) {
        return res.status(404).json({ mensagem: "Produto não encontrado!" });
    }
    bancoDeProdutos.splice(posicao, 1);
    res.json({ mensagem: "Produto excluído com sucesso!" });
});

app.listen(PORTA, () => {
    console.log(`Servidor da Atividade 2 rodando na porta ${PORTA}`);
});