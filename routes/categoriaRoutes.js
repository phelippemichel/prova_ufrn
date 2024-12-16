const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.post('/categoria', categoriaController.adicionarCategoria);
router.get('/categoria', categoriaController.listarCategorias);
router.put('/categoria/:id', categoriaController.atualizarCategoria);
router.delete('/categoria/:id', categoriaController.removerCategoria);

module.exports = router;
