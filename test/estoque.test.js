const request = require('supertest');
const { app } = require('../app');
const { Estoque } = require('../models/estoque');
const { Produto } = require('../models/produto');
const { Categoria } = require('../models/categoria');

describe('Estoque API', () => {
    let categoria, produto, estoque;

    beforeAll(async () => {
        categoria = await Categoria.create({ nome: 'Eletrônicos' });
        produto = await Produto.create({ nome: 'Celular', preco: 1000, quantidade: 10, categoriaId: categoria.id });
        estoque = await Estoque.create({ produtoId: produto.id, quantidade: 50 });
    });

    afterAll(async () => {
        await Estoque.destroy({ where: {} });
        await Produto.destroy({ where: {} });
        await Categoria.destroy({ where: {} });
    });

    it('Deve criar um novo registro de estoque com sucesso', async () => {
        const res = await request(app)
            .post('/api/estoque')
            .send({ produtoId: produto.id, quantidade: 50 });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('produtoId', produto.id);
        expect(res.body).toHaveProperty('quantidade', 50);
    });

    it('Deve listar todos os registros de estoque', async () => {
        const res = await request(app).get('/api/estoque');

        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('produtoId');
        expect(res.body[0]).toHaveProperty('quantidade');
    });

    it('Deve atualizar um registro de estoque específico com sucesso', async () => {
        const res = await request(app)
            .put(`/api/estoque/${estoque.id}`)
            .send({ quantidade: 100 });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', estoque.id);
        expect(res.body).toHaveProperty('quantidade', 100);
    });

    it('Deve remover um registro de estoque específico com sucesso', async () => {
        const res = await request(app)
            .delete(`/api/estoque/${estoque.id}`);

        expect(res.status).toBe(204);

        const checkRes = await request(app).get('/api/estoque');
        const estoqueRemovido = checkRes.body.find(e => e.id === estoque.id);
        expect(estoqueRemovido).toBeUndefined();
    });
});
