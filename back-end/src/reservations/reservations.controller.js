const service = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
/**
 * List handler for reservation resources
 */

async function list(req, res) {
  const { date } = req.query;
  console.log(date);
  res.json({
    data: await service.listByDate(date),
  });
}

async function create(req, res, next) {
  const newReservation = await service.create(req.body.data);
  res.status(201).json({ data: newReservation });
}

module.exports = {
  create: asyncErrorBoundary(create),
  list: asyncErrorBoundary(list),
};
