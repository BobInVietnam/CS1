const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/app.db',
});

const Url = sequelize.define('Url', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'data',
  timestamps: false,
});

async function initialize() {
  await sequelize.sync();
}

module.exports = {
  sequelize,
  Url,
  initialize,
};