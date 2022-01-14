/**
 * List handler for reservation resources
 */
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service")

async function list(req, res) {
  res.json({
    data: await service.list(req.query.date),
  });
}

async function create(req, res) {
  const newReservation = await service.create(req.body.data);
  res.status(201).json({data: newReservation});
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(create)],
};
