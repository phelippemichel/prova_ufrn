const { Categoria } = require('../models/categoria');

const adicionarCategoria = async (req, res) => {
    try {
        const { nome } = req.body;
        
        const categoriaExistente = await Categoria.findOne({ where: { nome } });
        if (categoriaExistente) {
            return res.status(400).json({ error: 'Categoria já existe' });
        }
   
        const categoria = await Categoria.create({ nome });
        res.status(201).json(categoria);
    } catch (error) {
        console.error('Erro ao adicionar categoria:', error);
        res.status(400).json({ error: 'Erro ao adicionar categoria', details: error.message });
    }
};

const listarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.status(200).json(categorias);
    } catch (error) {
        console.error('Erro ao listar categorias:', error);
        res.status(500).json({ error: 'Erro ao listar categorias', details: error.message });
    }
};

const atualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome } = req.body;

        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }


        categoria.nome = nome;
        await categoria.save();
        res.status(200).json(categoria);
    } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
        res.status(400).json({ error: 'Erro ao atualizar categoria', details: error.message });
    }
};

const removerCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }

        await categoria.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao remover categoria:', error);
        res.status(500).json({ error: 'Erro ao remover categoria', details: error.message });
    }
};

module.exports = {
    adicionarCategoria,
    listarCategorias,
    atualizarCategoria,
    removerCategoria
};
