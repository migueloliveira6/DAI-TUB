const conn = require('../db');

const addLinha = (req, res) => {
    const { numero_linha, ocupantes, origem, destino, chegada } = req.body;
    const sql = 'INSERT INTO linhas (numero_linha, ocupantes, origem, destino, chegada) VALUES (?, ?, ?, ?, ?)';
    conn.query(sql, [numero_linha, ocupantes, origem, destino, chegada], (err, results) => {
        if (err) {
            console.error('Erro ao adicionar linha: ', err);
            res.status(500).send('Erro ao adicionar linha');
            return;
        }
        res.status(200).send('Linha adicionada com sucesso');
    });
};

const getAllLinhas = (req, res) => {
    const { numero_linha, origem, destino, chegada } = req.query;

    let sql = 'SELECT * FROM linhas WHERE 1=1';
    const queryParams = [];

    if (numero_linha) {
        sql += ' AND numero_linha = ?';
        queryParams.push(numero_linha);
    }
    if (origem) {
        sql += ' AND origem = ?';
        queryParams.push(origem);
    }
    if (destino) {
        sql += ' AND destino = ?';
        queryParams.push(destino);
    }
    if (chegada) {
        sql += ' AND chegada = ?';
        queryParams.push(chegada);
    }

    conn.query(sql, queryParams, (err, results) => {
        if (err) {
            console.error('Erro ao buscar linhas: ', err);
            res.status(500).send('Erro ao buscar linhas');
            return;
        }
        res.status(200).json(results);
    });
};

const getLinhaByNumeroLinha = (req, res) => {
    const numero_linha = req.params.numero_linha;
    const sql = 'SELECT * FROM linhas WHERE numero_linha = ?';

    conn.query(sql, [numero_linha], (err, results) => {
        if (err) {
            console.error('Erro ao buscar linha: ', err);
            res.status(500).send('Erro ao buscar linha');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Linha não encontrada');
            return;
        }
        res.status(200).json(results[0]);
    });
};

const deleteLinha = (req, res) => {
    const numero_linha = req.params.numero_linha;
    const sql = 'DELETE FROM linhas WHERE numero_linha = ?';
    conn.query(sql, [numero_linha], (err, results) => {
        if (err) {
            console.error('Erro ao remover linha: ', err);
            res.status(500).send('Erro ao remover linha');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Linha não encontrada');
            return;
        }
        res.status(200).send('Linha removida com sucesso');
    });
};

module.exports = {
    addLinha,
    getAllLinhas,
    getLinhaByNumeroLinha,
    deleteLinha
};