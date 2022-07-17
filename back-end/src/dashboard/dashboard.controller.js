const service = require("./dashboard.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  let date = req.query.date;
  const data = await service.list(date);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
