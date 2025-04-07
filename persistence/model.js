const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/app.db');

db.run(`
  CREATE TABLE IF NOT EXISTS data(
  id TEXT,
  url TEXT
  ) STRICT
`);

function findId(id) {
  return new Promise((resolve, reject) => {
    return db.get(`SELECT * FROM data WHERE id = ?`, [id], function (err, res) {
      if (err) {
        return reject(err.message);
      }
      if (res != undefined) {
        return resolve(res.url);
      } else {
        return resolve(null); 
      }
    });
  });
}

function queryUrl(url) {
  return new Promise((resolve, reject) => {
    return db.get(`SELECT * FROM data WHERE url = ?`, [url], function (err, res) {
      if (err) {
        return reject(err.message)
      }
      if (res != undefined) {
        return resolve(res.id);
      } else {
        return resolve(null); 
      }
    });
  });
}

function insert(id, url) {
  return new Promise((resolve, reject) => {
    return db.run(`INSERT INTO data VALUES (?, ?)`, [id, url], function (err) {
      if (err) {
        return reject(err.message);
      }
      return resolve(id);
    });
  });
}

module.exports = {
  findId,
  queryUrl,
  insert
}