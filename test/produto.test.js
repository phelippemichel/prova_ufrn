const request = require('supertest');
const { app } = require('../app');
const { sequelize } = require('../models/database');
const { Produto } = require('../models/produto');
const { Categoria } = require('../models/categoria');

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await Categoria.create({ nome: 'Categoria Teste' });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Produto API', () => {
  let categoriaId;

  beforeAll(async () => {
    const categoria = await Categoria.findOne({ where: { nome: 'Categoria Teste' } });
    categoriaId = categoria.id;
  });

  test('Criar Produto', async () => {
    const response = await request(app)
      .post('/api/produto')
      .send({
        nome: 'Produto Teste',
        preco: 10.0,
        quantidade: 100,
        categoriaId: categoriaId
      });

    expect(response.status).toBe(201);
    expect(response.body.nome).toBe('Produto Teste');
    expect(response.body.preco).toBe(10.0);
    expect(response.body.quantidade).toBe(100);
    expect(response.body.categoriaId).toBe(categoriaId);
  });

  test('Listar Produtos', async () => {
    const response = await request(app).get('/api/produto');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('Atualizar Produto', async () => {
    const produto = await Produto.findOne({ where: { nome: 'Produto Teste' } });
    const response = await request(app)
      .put(`/api/produto/${produto.id}`)
      .send({
        nome: 'Produto Teste Atualizado',
        preco: 15.0,
        quantidade: 150,
        categoriaId: categoriaId
      });

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe('Produto Teste Atualizado');
    expect(response.body.preco).toBe(15.0);
    expect(response.body.quantidade).toBe(150);
  });

  test('Remover Produto', async () => {
    const produto = await Produto.findOne({ where: { nome: 'Produto Teste Atualizado' } });
    const response = await request(app).delete(`/api/produto/${produto.id}`);
    expect(response.status).toBe(204);

    const deletedProduto = await Produto.findByPk(produto.id);
    expect(deletedProduto).toBeNull();
  });
});
