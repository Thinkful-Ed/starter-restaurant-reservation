const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_FIELDS = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

async function hasValidFields(req, res, next) {
  const { data } = req.body;
  // returns 400 if data is missing
  if (!data) {
    return next({
      status: 400,
      message: "request recieved is empty.",
    });
  }
  // returns 400 if any field is empty or missing
  for (const field of VALID_FIELDS) {
    if (!data[field]) {
      return next({
        status: 400,
        message: `reservation must include a ${field}`,
      });
    }
  }
  next();
}

async function hasValidDateTime(req, res, next) {
  const { reservation_date, reservation_time, people } = req.body.data;
  // returns 400 if reservation_time is not a time that matches 00:00 format
  if (!reservation_time.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
    return next({
      status: 400,
      message: "reservation_time is not valid time.",
    });
  }
  // returns 400 if reservation_date is not a valid date
  if (isNaN(new Date(reservation_date))) {
    return next({
      status: 400,
      message: "reservation_date is not valid date.",
    });
  }

  next();
}

async function hasValidNumberOfPeople(req, res, next) {
  const { people } = req.body.data;
  // returns 400 if people is not a number or is less than or equal to zero
  if (typeof people !== "number" || people <= 0) {
    return next({
      status: 400,
      message: "number of people is not a valid number.",
    });
  }
  next();
}
// List handler for reservation resources
async function list(req, res) {
  const { date } = req.query;
  const reservationsByDate = await service.list(date);
  res.json({
    data: reservationsByDate,
  });
}

// Create handler for reservation resources
async function create(req, res) {
  const newReservation = await service.create(req.body.data);
  res.status(201).json({ data: newReservation });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(hasValidFields),
    asyncErrorBoundary(hasValidNumberOfPeople),
    asyncErrorBoundary(hasValidDateTime),
    asyncErrorBoundary(create),
  ],
};
