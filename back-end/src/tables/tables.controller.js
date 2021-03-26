const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const data = await service.list(req.query.date);

  res.json({
    data,
  });
}

async function create(req, res) {
  const data = await service.create(req.body.data);

  res.status(201).json({
    data: data,
  });
}


module.exports = {
  create: [
      asyncErrorBoundary(create)
  ],
  list: [asyncErrorBoundary(list)],
};
