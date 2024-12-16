const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.post('/produto', produtoController.adicionarProduto);
router.get('/produto', produtoController.listarProdutos);
router.put('/produto/:id', produtoController.atualizarProduto);
router.delete('/produto/:id', produtoController.removerProduto);

module.exports = router;
