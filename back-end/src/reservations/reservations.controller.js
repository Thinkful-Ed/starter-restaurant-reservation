const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function containsAnyLetter(str) {
  return /[a-zA-Z]/.test(str);
}

async function list(req, res) {
  const data = await service.list(req.query.date);
  res.json({ data });
}

function hasData(req, res, next) {
  if (!req.body.data) {
    next({ status: 400, message: "Reservation lacks required data." });
  } else next();
}

const hasFirstName = (req, res, next) => {
  const { data: { first_name } = {} } = req.body;
  if (first_name) {
    return next();
  }
  return next({ status: 400, message: "a first_name is required" });
};

const hasLastName = (req, res, next) => {
  const { data: { last_name } = {} } = req.body;
  if (last_name) {
    return next();
  }
  return next({ status: 400, message: "a last_name is required" });
};

const hasMobileNumber = (req, res, next) => {
  const { data: { mobile_number } = {} } = req.body;
  if (mobile_number) {
    return next();
  }
  return next({ status: 400, message: "a mobile_number is required" });
};

const hasReservationDate = (req, res, next) => {
  const { data: { reservation_date } = {} } = req.body;
  console.log(reservation_date);
  if (reservation_date && !containsAnyLetter(reservation_date)) {
    return next();
  }
  return next({ status: 400, message: "a reservation_date is required" });
};

const hasReservationTime = (req, res, next) => {
  const { data: { reservation_time } = {} } = req.body;
  if (reservation_time && !containsAnyLetter(reservation_time)) {
    return next();
  }
  return next({ status: 400, message: "a reservation_time is required" });
};

const hasPeople = (req, res, next) => {
  const { data: { people } = {} } = req.body;
  if (people && people !== 0 && typeof people === "number") {
    return next();
  }
  return next({ status: 400, message: "people are required" });
};

async function create(req, res, next) {
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = req.body.data;

  const result = await service.create({
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  });
  res.status(201);
  res.json({ data: result });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasData,
    hasFirstName,
    hasLastName,
    hasMobileNumber,
    hasReservationDate,
    hasReservationTime,
    hasPeople,
    asyncErrorBoundary(create),
  ],
};