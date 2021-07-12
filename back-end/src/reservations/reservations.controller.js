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
const {
  dateTimeMiddleware,
} = require("../validation/reservations/validateDateTime");
const peopleIsNum = require("../validation/reservations/peopleIsNum");
const hasStatus = require("../validation/hasFields")(["status"]);
const validStatus = require("../validation/reservations/validStatus");
const statusIsBooked = require("../validation/reservations/statusIsBooked");
const statusIsNotFinished = require("../validation/reservations/statusIsNotFinished");

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
  const { date = "", mobile_number = "" } = req.query;

  const data = date
    ? await service.listByDate(date)
    : mobile_number
    ? await service.search(mobile_number)
    : await service.list();

  res.json({ data });
}

async function create(req, res) {
  res.status(201).json({
    data: await service.create(req.body.data),
  });
}

function read(req, res) {
  res.json({ data: res.locals.reservation });
}

const updateStatus = async (req, res) => {
  const payload = {
    status: req.body.data.status,
  };

  res.json({
    data: await service.update(Number(req.params.reservationId), payload),
  });
};

module.exports = {
  list,
  read: [reservationExists, read],
  create: [
    hasData,
    hasFields,
    statusIsBooked,
    peopleIsNum,
    dateTimeMiddleware,
    create,
  ],
  updateStatus: [
    hasData,
    hasStatus,
    validStatus,
    reservationExists,
    statusIsNotFinished,
    updateStatus,
  ],
};
