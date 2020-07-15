const sqlite3 = require('sqlite3').verbose();
const schema = require('./schema');
const camelcase = require('camelcase-keys-recursive')
let db;

sqlite3.verbose();
db = new sqlite3.Database(
  process.env.NODE_ENV === 'test' ? `:memory:` : `${__dirname}/CodeTest.db`,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
);
if (process.env.NODE_ENV === 'development') {
  db.on('trace', sql => {
    console.log(`========  QUERY ==========`);
    console.log(sql);
    console.log(`==========================`);
  });
  db.on('profile', (sql, ms) => {
    console.log(sql);
    console.log(ms);
  });
}

db.exec(schema, err => {
  if (err) {
    console.error('error creating schema!', err);
  }
  console.log('tables created!');
});
function all(query, args = []) {
  return new Promise((resolve, reject) => {
    db.all(query, args, (err, rows) => {
      console.log(query);
      if (err) return reject(err);
      resolve(camelcase(rows));
    });
  });
}
function first(query, args = []) {
  return new Promise((resolve, reject) => {
    db.all(query, args, (err, rows) => {
      console.log(query);
      if (err) return reject(err);
      resolve(camelcase(rows[0]));
    });
  });
}
function run(query, args = []) {
  return new Promise((resolve, reject) => {
    db.run(query, args, err => {
      console.log(query);
      if (err) return reject(err);
      resolve();
    });
  });
}
function exec(query) {
  return new Promise((resolve, reject) => {
    db.exec(query, err => {
      console.log(query);
      if (err) return reject(err);
      resolve();
    });
  });
}
module.exports = {
  all,
  first,
  run,
  exec,
  db,
};


