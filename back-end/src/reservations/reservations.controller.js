/**
 * List handler for reservation resources
 */

//Imports for our controller
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

function validateDate(req, res, next) {
  const date = req.body.data.reservation_date;
  const time = req.body.data.reservation_time;
  const reservedDate = new Date(`${date} ${time}`);
  const current = new Date();
  //Check if reservation_time and reservation_date is valid
  if (!Date.parse(`${date} ${time}`)) {
    return next({
      status: 400,
      message: `reservation_date and reservation_time must be valid`,
    });
  }
  //Check if trying to set reservation on a Tuesday
  if (reservedDate.getDay() === 2) {
    return next({ status: 400, message: "Restaurant is closed on Tuesdays" });
  }
  //Check if setting reservation date before today's date
  if (Date.parse(`${date} ${time}`) < current) {
    return next({
      status: 400,
      message: "reservation_date and reservation_time must be in the future",
    });
  }
  if (
    reservedDate.getHours() < 10 ||
    (reservedDate.getHours() === 10 && reservedDate.getMinutes() < 30)
  ) {
    return next({
      status: 400,
      message: "Reservation cannot be before 10:30AM",
    });
  }
  if (
    reservedDate.getHours() > 22 ||
    (reservedDate.getHours() === 22 && reservedDate.getMinutes() >= 30)
  ) {
    return next({
      status: 400,
      message: "Reservation cannot be after 10:30PM",
    });
  }
  if (
    reservedDate.getHours() > 21 ||
    (reservedDate.getHours() === 21 && reservedDate.getMinutes() > 30)
  ) {
    return next({
      status: 400,
      message: "Reservation must be made an hour before closing",
    });
  }
  next();
}

function peopleIsNumber(req, res, next) {
  const people = req.body.data.people;
  if (typeof people === "number") {
    return next();
  }
  next({ status: 400, message: `people must be number` });
}

async function list(req, res) {
  const date = req.query.date;
  const data = await service.list(date);
  res.json({
    data,
  });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredProperties,
    validateDate,
    peopleIsNumber,
    asyncErrorBoundary(create),
  ],
};
