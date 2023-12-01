const tablesService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function create(req, res) {
  const { data } = req.body;
  await tablesService.create(data);
  res.status(201).json({ data });
}


async function list(req, res, next) {
    const data = await tablesService.list();
    data.sort((A, B) => {
      const tableNameA = A.table_name;
      const tableNameB = B.table_name;
      return tableNameA.localeCompare(tableNameB);
    });
    res.json({
      data,
    });
  }

module.exports = {
    create: asyncErrorBoundary(create),
    list: asyncErrorBoundary(list),
}