const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const tablesService = require("./tables.service");

const hasRequiredProperties = hasProperties("table_name", "capacity");

const VALID_PROPERTIES = [
  "table_name",
  "capacity",
];

async function list(req, res) {
    const data = await tablesService.list();
    res.json({ data });
}

async function tableExists(req, res, next) {
    const table = await tablesService.read(req.params.table_id);
    if (table) {
      res.locals.table = table;
      return next();
    }
    next({
      status: 404,
      message: `Table ${req.params.table_id} cannot be found.`
    })
  }
  
  async function read(req, res) {
    const { table: data } = res.locals;
    res.json({ data });
  }

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
};
