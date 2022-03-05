/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const reservationValidator = require("../errors/reservationValidator");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const { date = null } = req.query;
  res.json({ data: await service.list(date) });
}

async function read(req, res, next) {
  const { reservation_id } = req.params;
  const data = await service.read(reservation_id);
  if (!data)
    next({
      status: 404,
      message: `Reservation id ${reservation_id} does not exit`,
    });
  res.json({ data });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  data.people = parseInt(data.people);
  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [reservationValidator, asyncErrorBoundary(create)],
  read: asyncErrorBoundary(read),
};
