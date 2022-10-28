const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const tablesService = require("./tables.service");

async function list(req, res, next) {
  const data = await tablesService.list();
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
