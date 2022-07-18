const service = require("./dashboard.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const data = await service.list(req.query.date);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
