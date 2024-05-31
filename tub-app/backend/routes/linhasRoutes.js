const express = require('express');
const router = express.Router();
const { addLinha, getAllLinhas, getLinhaByNumeroLinha, deleteLinha } = require('../controllers/controllerLinhas');

// Rota para adicionar uma linha
router.post('/add-linha', addLinha);

// Rota para buscar todas as linhas (com filtros opcionais)
router.get('/get-linhas', getAllLinhas);

// Rota para buscar uma linha pelo número da linha
// router.get('/linhas/:numero_linha', getLinhaByNumeroLinha);

// Rota para remover uma linha pelo número da linha
router.delete('/linhas/?numero_linha', deleteLinha);

module.exports = router;