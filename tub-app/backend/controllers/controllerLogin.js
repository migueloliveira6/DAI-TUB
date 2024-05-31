const conn = require('../db');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = Joi.object({
    numeroT: Joi.number().integer(),
    numeroCC: Joi.string().pattern(/^\d{9}$/).required()
});


const registerUser = (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { numeroT, numeroCC } = req.body;

    // Hash da senha (numeroCC)
    bcrypt.hash(numeroCC, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error('Erro ao gerar hash:', err);
            res.status(500).send('Erro ao registrar o usuário');
            return;
        }

        const sql = 'INSERT INTO users (numeroT, numeroCC) VALUES (?, ?)';
        conn.query(sql, [numeroT, hashedPassword], (err, results) => {
            if (err) {
                console.error('Erro ao inserir usuário:', err);
                res.status(500).send('Erro ao registrar o usuário');
                return;
            }
            res.status(200).send('Usuário registrado com sucesso');
        });
    });
};

const loginUser = (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { numeroT, numeroCC } = req.body;

    const sql = 'SELECT * FROM users WHERE numeroT = ?';
    conn.query(sql, [numeroT], (err, results) => {
        if (err) {
            console.error('Erro ao verificar usuário:', err);
            res.status(500).send('Erro ao fazer login');
            return;
        }

        if (results.length > 0) {
            const storedHashedPassword = results[0].numeroCC;
            bcrypt.compare(numeroCC, storedHashedPassword, (err, result) => {
                if (err) {
                    console.error('Erro ao comparar senhas:', err);
                    res.status(500).send('Erro ao fazer login');
                    return;
                }
                if (result) {
                    res.status(200).send('Credenciais Validas');
                } else {
                    res.status(401).send('Credenciais inválidas');
                }
            });
        } else {
            res.status(401).send('Credenciais inválidas');
        }
    });
};


module.exports = {
    registerUser,
    loginUser,
};