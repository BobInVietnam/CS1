const { Url, initialize } = require('./sequelize');

async function findId(id) {
  await initialize();
  const record = await Url.findByPk(id);
  return record ? record.url : null;
}

async function queryUrl(url) {
  await initialize();
  const record = await Url.findOne({ where: { url } });
  return record ? record.id : null;
}

async function insert(id, url) {
  await initialize();
  const record = await Url.create({ id, url });
  return record.id;
}

module.exports = {
  findId,
  queryUrl,
  insert,
};