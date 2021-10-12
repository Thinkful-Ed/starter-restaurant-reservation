const tablesService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//table name must be 2 characters long

//required fields table name capacity

async function list(req, res) {
  res.json({ data: await tablesService.list() });
}

async function create(req, res, next) {
  if (request.body.data.reservation_id) {
    await service.updateReservation(request.body.data.reservation_id, "seated");
  } else {
    request.body.data.status = "free";
  }
  res.status(201).json({ data: await tablesService.create(request.body.data) });
}

module.exports = {
  create: [asyncErrorBoundary(create)],
  list: [asyncErrorBoundary(list)],
};
