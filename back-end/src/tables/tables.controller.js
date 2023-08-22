
const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");




async function list(req, res) {
  const data = await service.listAll();
  res.json({ data });
}


module.exports = {
  list: asyncErrorBoundary(list),
};