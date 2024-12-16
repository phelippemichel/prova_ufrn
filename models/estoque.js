const { DataTypes } = require('sequelize');
const {sequelize} = require('./database');
const {Produto} = require('./produto');

const Estoque = sequelize.define('Estoque', {
    produtoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produto,
            key: 'id',
        },
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'estoque',
    timestamps: false,
});


Estoque.belongsTo(Produto, { foreignKey: 'produtoId', as: 'produto' });

module.exports = {Estoque};
