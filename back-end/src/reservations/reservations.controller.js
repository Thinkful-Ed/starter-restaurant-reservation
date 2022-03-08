/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const reservationValidator = require("../errors/reservationValidator");
const seatResValidator = require("../errors/seatResValidator");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const { date = null, mobile_number = null } = req.query;
  let data;
  if (mobile_number) {
    data = await service.listQueryNumbers(mobile_number);
  } else if (date) {
    data = await service.list(date);
  }
  res.json({ data });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  data.people = parseInt(data.people);
  res.status(201).json({ data });
}

async function read(req, res, next) {
  const { reservation_id } = req.params;
  const data = await service.read(reservation_id);
  if (!data)
    next({
      status: 404,
      message: `Reservation id ${reservation_id} does not exist`,
    });
  res.json({ data });
}

async function update(req, res) {
  const { reservation_id } = req.params;
  const data = await service.update(req.body.data, reservation_id);
  data.people = parseInt(data.people);
  res.json({ data });
}

async function updateStatus(req, res) {
  const { reservation_id } = req.params;
  const data = await service.updateStatus(req.body.data, reservation_id);
  data.people = parseInt(data.people);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [reservationValidator, asyncErrorBoundary(create)],
  read: asyncErrorBoundary(read),
  update: [asyncErrorBoundary(seatResValidator), reservationValidator, asyncErrorBoundary(update)],
  updateStatus: [asyncErrorBoundary(seatResValidator), asyncErrorBoundary(updateStatus)],
};
