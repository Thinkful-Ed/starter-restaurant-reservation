/**
 * List handler for reservation resources
 */
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service")

async function list(req, res) {
  res.json({
    data: [],
  });
}

async function create(req, res) {
  const newReservation = await service.create(req.body);
  res.status(201).json(newReservation);
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(create)],
};
