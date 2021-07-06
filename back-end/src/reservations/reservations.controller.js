const service = require("./reservations.service");
const hasData = require("../validation/hasData");
const hasFields = require("../validation/hasFields")([
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
]);
const { dateTimeMiddleware } = require("../validation/validateDateTime");
const peopleIsNum = require("../validation/peopleIsNum");

// Extra validation middleware
async function reservationExists(req, res, next) {
  const reservation = await service.read(req.params.reservationId);

  if (!reservation)
    return next({
      status: 404,
      message: `Reservation with reservation_id ${req.params.reservationId} not found.`,
    });

  res.locals.reservation = reservation;
  next();
}

// Main route handlers
async function list(req, res) {
  const { date = "" } = req.query;
  res.json({
    data: date.length ? await service.listByDate(date) : await service.list(),
  });
}

async function create(req, res) {
  res.status(201).json({
    data: await service.create(req.body.data),
  });
}

function read(req, res) {
  res.json({ data: res.locals.reservation });
}

module.exports = {
  list,
  read: [reservationExists, read],
  create: [hasData, hasFields, peopleIsNum, dateTimeMiddleware, create],
};
