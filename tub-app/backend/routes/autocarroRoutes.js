const express = require('express');
const { addAutocarro, getAutocarros, deleteAutocarro } = require('../controllers/controllerAutocarro');
const router = express.Router();

router.post('/post-autocarro', addAutocarro);
router.get('/get-autocarros', getAutocarros);
router.delete('/delete-autocarro', deleteAutocarro);

module.exports = router;