const conn = require('../db');
const Joi = require('joi');

const busSchema = Joi.object({
    matricula: Joi.string().required(),
    marca: Joi.string().required(),
    modelo: Joi.string().required(),
    ano_de_fabrico: Joi.number().integer().min(1930).max(2025).required(),
    lugares: Joi.number().integer().required(),
    numero_linha: Joi.number().integer().required(),
});

const addAutocarro = (req, res) => {
    const { error } = busSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  
    const { matricula, marca, modelo, ano_de_fabrico, lugares, numero_linha } = req.body;
    const sql = 'INSERT INTO autocarro (matricula, marca, modelo, ano_de_fabrico, lugares, numero_linha) VALUES (?, ?, ?, ?, ?, ?)';
    
    conn.query(sql, [matricula, marca, modelo, ano_de_fabrico, lugares, numero_linha], (err, results) => {
      if (err) {
        console.error('Erro ao inserir autocarro:', err);
        return res.status(500).send('Erro ao adicionar o autocarro');
      }
      res.status(200).send('Autocarro adicionado com sucesso');
    });
  };

const getAutocarros = (req, res) => {
    const { matricula, marca, modelo, ano_de_fabrico, lugares, numero_linha } = req.query;

    let sql = 'SELECT * FROM Autocarro WHERE 1=1';
    const queryParams = [];

    if (matricula) {
        sql += ' AND matricula = ?';
        queryParams.push(matricula);
    }
    if (marca) {
        sql += ' AND marca = ?';
        queryParams.push(marca);
    }
    if (modelo) {
        sql += ' AND modelo = ?';
        queryParams.push(modelo);
    }
    if (ano_de_fabrico) {
        sql += ' AND YEAR(ano_de_fabrico) = ?';
        queryParams.push(ano_de_fabrico);
    }
    if (lugares) {
        sql += ' AND lugares = ?';
        queryParams.push(lugares);
    }
    if (numero_linha) {
        sql += ' AND numero_linha = ?';
        queryParams.push(numero_linha);
    }

    conn.query(sql, queryParams, (err, results) => {
        if (err) {
            console.error('Erro ao buscar autocarros: ', err);
            res.status(500).send('Erro ao buscar autocarros');
            return;
        }
        res.status(200).json(results);
    });
};

const deleteAutocarro = (req, res) => {
    const  matricula  = req.query.matricula;
    const sql = 'DELETE FROM Autocarro WHERE matricula = ?';
    conn.query(sql, [matricula], (err, results) => {
        if (err) {
            console.error('Erro ao remover autocarro: ', err);
            res.status(500).send('Erro ao remover autocarro');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Autocarro não encontrado');
            return;
        }
        res.status(200).send('Autocarro removido com sucesso');
    });
};

module.exports = {
    addAutocarro,
    getAutocarros,
    deleteAutocarro
};