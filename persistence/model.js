const { Url, initialize } = require('./sequelize');

async function findId(id) {
  try {
    await initialize();
    const record = await Url.findByPk(id);
    return record ? record.url : null;
  } catch (err) {
    console.error(err)
    return null
  }
}

async function queryUrl(url) {
  try {
    await initialize();
    const record = await Url.findOne({ where: { url } });
    return record ? record.id : null;
  } catch (err) {
    console.error(err)
    return null
  }
}

async function insert(id, url) {
  try {  
    await initialize();
    const record = await Url.create({ id, url });
    return record.id;
  } catch (err) {
    console.error(err)
    return null
  }
}

module.exports = {
  findId,
  queryUrl,
  insert,
};