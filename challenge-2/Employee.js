const {run, all, first} = require('./sqlite');

async function save(employee) {
  console.log(employee)
  await run(`
    INSERT INTO employees
    (first_name, last_name, phone, email, role)
    VALUES (
      ?,
      ?,
      ?,
      ?,
      ?
    )
  `, [
    employee.firstName,
    employee.lastName,
    employee.phone,
    employee.email,
    employee.role
  ]);
  return first(`
    SELECT id, first_name, last_name, phone, email, role
    FROM employees
    WHERE email = ?
  `, [employee.email])
}

function where(params) {
  if (typeof(params) !== 'object') {
    return ''
  }
  const whereClauses = Object.keys(params).map((key) => {
    return `${key.replace('$', '')} = ${key}`
  })
  if (whereClauses.length) {
    return `WHERE ${whereClauses.join(',')}`
  }
  return '';
}

function find(params) {
  return first(`
    SELECT id, first_name, last_name, phone, email, phone, role
    FROM employees
    ${where(params)}
  `, params);
}
function findAll(params) {
  return all(`
    SELECT id, first_name, last_name, phone, email, phone, role
    FROM employees
    ${where(params)}
  `, params);
}

module.exports = {
  save,
  find,
  findAll
}