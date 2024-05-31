const express = require('express');
const { addStation, getStations, deleteStation } = require('../controllers/controllerEstacoes');
const router = express.Router();

router.post('/post-estacao', addStation);
router.get('/get-estacoes', getStations);
router.delete('/delete-estacoes', deleteStation);

module.exports = router;