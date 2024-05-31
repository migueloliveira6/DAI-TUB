const conn = require('../db');
const Joi = require('joi');

const stationSchema = Joi.object({
    id_estacao: Joi.number().integer().required(),
    nome_estacao: Joi.string().required(),
    CoordenadasN: Joi.string().regex(/^\d+$/).required(),
    CoordenadasS: Joi.string().regex(/^\d+$/).required(),
    numero_linha: Joi.number().integer().required()
});

const addStation = (req, res) => {
    const { error } = stationSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { id_estacao, nome_estacao, CoordenadasN, CoordenadasS, numero_linha } = req.body;
    const sql = 'INSERT INTO estacoes (id_estacao, nome_estacao, CoordenadasN, CoordenadasS, numero_linha) VALUES (?, ?, ?, ?, ?)';
    conn.query(sql, [id_estacao, nome_estacao, CoordenadasN, CoordenadasS, numero_linha], (err, results) => {
        if (err) {
            console.error('Erro ao inserir estação: ', err);
            res.status(500).send('Erro ao adicionar a estação');
            return;
        }
        res.status(200).send('Estação adicionada com sucesso');
    });
};

const getStations = (req, res) => {
    const { id_estacao, nome_estacao, CoordenadasN, CoordenadasS, numero_linha } = req.query;

    let sql = 'SELECT * FROM estacoes WHERE 1=1';
    const queryParams = [];

    if (id_estacao) {
        sql += ' AND id_estacao = ?';
        queryParams.push(id_estacao);
    }
    if (nome_estacao) {
        sql += ' AND nome_estacao = ?';
        queryParams.push(nome_estacao);
    }
    if (CoordenadasN) {
        sql += ' AND CoordenadasN = ?';
        queryParams.push(CoordenadasN);
    }
    if (CoordenadasS) {
        sql += ' AND CoordenadasS = ?';
        queryParams.push(CoordenadasS);
    }
    if (numero_linha) {
        sql += ' AND numero_linha = ?';
        queryParams.push(numero_linha);
    }

    conn.query(sql, queryParams, (err, results) => {
        if (err) {
            console.error('Erro ao buscar estações: ', err);
            res.status(500).send('Erro ao buscar estações');
            return;
        }
        res.status(200).json(results);
    });
};

const deleteStation = (req, res) => {
    const id_estacao = req.query.id_estacao;
    const sql = 'DELETE FROM estacoes WHERE id_estacao = ?';
    conn.query(sql, [id_estacao], (err, results) => {
        if (err) {
            console.error('Erro ao remover estação: ', err);
            res.status(500).send('Erro ao remover estação');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Estação não encontrada');
            return;
        }
        res.status(200).send('Estação removida com sucesso');
    });
};

module.exports = {
    addStation,
    getStations,
    deleteStation
};