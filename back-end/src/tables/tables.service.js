// stub data
const tables = [];
let id = 0;

//stub service handlers
const list = () => Promise.resolve(tables);
const create = (table) => {
  tables.push({ ...table, occupied: false, table_id: id++ });
  return Promise.resolve(table);
};

module.exports = { list, create };
