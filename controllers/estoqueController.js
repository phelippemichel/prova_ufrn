const { Produto } = require('../models/produto');
const { Categoria } = require('../models/categoria');
const { Estoque } = require('../models/estoque');

const adicionarProduto = async (req, res) => {
    try {
        const { nome, quantidade, preco, categoriaId } = req.body;
        const categoria = await Categoria.findByPk(categoriaId);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        const produto = await Produto.create({ nome, quantidade, preco, categoriaId });
        await Estoque.create({ produtoId: produto.id, quantidade }); 
        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao adicionar produto', details: error.message });
    }
};

const listarProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll({
            include: [
                {
                    model: Categoria,
                    as: 'categoria',
                    attributes: ['nome'],
                },
            ],
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar produtos', details: error.message });
    }
};

const atualizarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, quantidade, preco, categoriaId } = req.body;
        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        const categoria = await Categoria.findByPk(categoriaId);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        await produto.update({ nome, quantidade, preco, categoriaId });
        res.status(200).json(produto);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar produto', details: error.message });
    }
};

const removerProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        await produto.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover produto', details: error.message });
    }
};

const criarEstoque = async (req, res) => {
    try {
        const { produtoId, quantidade } = req.body;

        if (!produtoId || quantidade == null) {
            console.log("Dados faltando ou inválidos:", { produtoId, quantidade });
            return res.status(400).json({ error: "ProdutoId e quantidade são obrigatórios" });
        }

        const produto = await Produto.findByPk(produtoId);
        if (!produto) {
            console.log("Produto não encontrado:", produtoId);
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        const estoque = await Estoque.create({ produtoId, quantidade });
        res.status(201).json(estoque);
    } catch (error) {
        console.log("Erro ao criar registro de estoque:", error);
        res.status(400).json({ error: 'Erro ao criar registro de estoque', details: error.message });
    }
};

const listarEstoque = async (req, res) => {
    try {
        const estoque = await Estoque.findAll({
            include: [
                {
                    model: Produto,
                    as: 'produto',
                    attributes: ['nome'],
                },
            ],
        });
        res.status(200).json(estoque);
    } catch (error) {
        console.log("Erro ao listar estoque:", error);
        res.status(500).json({ error: 'Erro ao listar estoque', details: error.message });
    }
};

const atualizarEstoque = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantidade } = req.body;

        const estoque = await Estoque.findByPk(id);
        if (!estoque) {
            return res.status(404).json({ error: 'Registro de estoque não encontrado' });
        }

        await estoque.update({ quantidade });
        res.status(200).json(estoque);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar registro de estoque', details: error.message });
    }
};

const removerEstoque = async (req, res) => {
    try {
        const { id } = req.params;

        const estoque = await Estoque.findByPk(id);
        if (!estoque) {
            return res.status(404).json({ error: 'Registro de estoque não encontrado' });
        }

        await estoque.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover registro de estoque', details: error.message });
    }
};

module.exports = {
    adicionarProduto,
    listarProdutos,
    atualizarProduto,
    removerProduto,
    criarEstoque,
    listarEstoque,
    atualizarEstoque,
    removerEstoque,
};
