const service = require("./tables.service");
const hasProperties = require("../errors/hasProperties");

function checkTableDataParameters(request, response, next) {
  const { table_name, capacity } = request.body.data;
  console.log("table_name.length", table_name.length);
  console.log("capacity", capacity);

  if (capacity < 1 || table_name.length < 2 || typeof capacity === "string") {
    next({
      status: 400,
      message: `capacity needs to be at least 1 and the length of table_name needs to be at least 2`,
    });
  }
  next();
}

async function post(request, response, next) {
  const tableInfo = request.body.data;
  const postedTable = await service.post(tableInfo);
  response.status(201).json({ data: postedTable });
}

async function getAllTables(request, response, next) {
  const data = await service.getAll();
  const copy = data.slice();
  const sortedTable = copy.sort(function (a, b) {
    if (a.table_name < b.table_name) {
      return -1;
    }
    if (a.table_name > b.table_name) {
      return 1;
    }
    return 0;
  });
  console.log(sortedTable, sortedTable.length);
  response.json({ data: sortedTable });
}

module.exports = {
  post: [
    hasProperties("table_name", "capacity"),
    checkTableDataParameters,
    post,
  ],
  get: [getAllTables],
};
