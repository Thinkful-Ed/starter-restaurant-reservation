const tablesService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function tableExists(req, res, next) {
  const table = await tablesService.read(req.params.table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({ status: 404, message: "Table cannot be found." });
}

async function create(req, res) {
  const { data } = req.body;
  await tablesService.create(data);
  res.status(201).json({ data });
}



async function list(req, res, next) {
  const free = req.query.free;
  // console.log(free)
  // console.log("free === true", free === "true")
  if (free === "true") {
    const data = await tablesService.listAvailable();
    data.sort((A, B) => {
      const tableNameA = A.table_name;
      const tableNameB = B.table_name;
      return tableNameA.localeCompare(tableNameB);
    });
    res.json({
      data,
    });
  } else {
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
  }


  async function update(req, res, next) {
    const updatedTable = {
      ...req.body.data,
      table_id: res.locals.table.table_id,
    };
    const data = await tablesService.update(updatedTable);
    res.json({ data });
  }

module.exports = {
    create: asyncErrorBoundary(create),
    list: asyncErrorBoundary(list),
    update: [asyncErrorBoundary(tableExists), asyncErrorBoundary(update)]
}