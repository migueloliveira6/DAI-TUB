const mysql2 = require('mysql2');

// Configuração da conectividade com a base de dados MySQL
const conn = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'DAI'
});

conn.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL: ', err);
        return;
    }
    console.log('MySQL connected.');
});

module.exports = conn;