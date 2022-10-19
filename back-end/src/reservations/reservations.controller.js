const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const data = await service.list();
  res.json(data);
}

function show(req, res) {
  const { reservation } = res.locals;
  res.status(201).json(reservation);
}

async function isValidId(req, res, next) {
  const { reservationId } = req.params;

  const reservation = await service.show(reservationId);

  if (reservation) {
    res.locals.reservation = reservation;
    next();
  }
  next({
    status: 404,
    message: `Reservation ID does not exist: ${reservationId}`,
  });
}
module.exports = {
  list: [asyncErrorBoundary(list)],
  show: [asyncErrorBoundary(isValidId), show],
};
