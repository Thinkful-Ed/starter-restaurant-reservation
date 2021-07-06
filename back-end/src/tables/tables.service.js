// stub data
const tables = [];

//stub service handlers
const list = () => Promise.resolve(tables);
const create = (table) => {
  tables.push({ ...table, occupied: false });
  return Promise.resolve(table);
};

module.exports = { list, create };
