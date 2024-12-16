const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');

router.post('/produto', estoqueController.adicionarProduto);
router.get('/produto', estoqueController.listarProdutos);
router.put('/produto/:id', estoqueController.atualizarProduto);
router.delete('/produto/:id', estoqueController.removerProduto);
router.post('/estoque', estoqueController.criarEstoque);
router.get('/estoque', estoqueController.listarEstoque);
router.put('/estoque/:id', estoqueController.atualizarEstoque);
router.delete('/estoque/:id', estoqueController.removerEstoque);

module.exports = router;
