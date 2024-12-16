const request = require('supertest');
const { app } = require('../app');
const { sequelize } = require('../models/database');
const { Categoria } = require('../models/categoria');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('Categoria API', () => {
    let categoriaId;

    test('Criar Categoria', async () => {
        const response = await request(app)
            .post('/api/categoria')
            .send({ nome: 'Eletrônicos' });

        expect(response.status).toBe(201);
        expect(response.body.nome).toBe('Eletrônicos');
        categoriaId = response.body.id;
    });

    test('Listar Categorias', async () => {
        const response = await request(app).get('/api/categoria');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Atualizar Categoria', async () => {
        const response = await request(app)
            .put(`/api/categoria/${categoriaId}`)
            .send({ nome: 'Eletrônicos Atualizados' });

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe('Eletrônicos Atualizados');
    });

    test('Remover Categoria', async () => {
        const response = await request(app).delete(`/api/categoria/${categoriaId}`);

        expect(response.status).toBe(204);
    });
});
