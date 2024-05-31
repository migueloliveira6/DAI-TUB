const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');

const userRoutes = require('./routes/loginRoutes');
const busRoutes = require('./routes/autocarroRoutes');
const stationRoutes = require('./routes/estacoesRoutes');
const lineRoutes = require('./routes/linhasRoutes');

const app = express();
const port = 3000;

// Configuração da conectividade com a base de dados MySQL
const conn = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'DAI'
});

// Middleware para parsing de JSON
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Usando as rotas
app.use('/api/users', userRoutes);
app.use('/api/autocarros', busRoutes);
app.use('/api/estacoes', stationRoutes);
app.use('/api/linhas', lineRoutes);

// Inicia o servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

// Fecha a conexão quando a aplicação é encerrada
process.on('SIGINT', () => {
    conn.end(err => {
        if (err) {
            console.error('Erro ao desconectar do MySQL: ', err);
            process.exit(1);
        }
        console.log('MySQL disconnected.');
        process.exit(0);
    });
});