const service = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');


async function list(req, res) {
  res.json({
    data: data,
  });
}

async function create (req, res, next) {
  const newReservation = { ...req.body.data }
  const data = await service.create(newReservation)
  res.status(201).json({ data: data })
}

async function read (req, res) {
  const { reservation: data } = res.locals
  res.json({ data })
}

async function update (req, res) {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id
  }
  const data = await service.update(updatedReservation)
  res.status(200).json({ data })
}

module.exports = {
  list: [],
  read: [],
  create: [],
  update: [],
  updateStatus: [],
};
