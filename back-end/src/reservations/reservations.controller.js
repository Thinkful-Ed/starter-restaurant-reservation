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
  if (reservation_date && !containsAnyLetter(reservation_date)) {
    const date = new Date(reservation_date);
    if (date.getDay() === 1) {
      next({ status: 400, message: "Sorry! We're closed on this day!" });
    }
    if (new Date() > date) {
      next({
        status: 400,
        message:
          "Sorry! We don't have a time machine! Try booking a reservation in the future!",
      });
    }
    return next();
  }
  return next({ status: 400, message: "a reservation_date is required" });
};

const hasReservationTime = (req, res, next) => {
  const { data: { reservation_time } = {} } = req.body;
  if (reservation_time && !containsAnyLetter(reservation_time)) {
    if (
      reservation_time.replace(":", "") >= 1030 &&
      reservation_time.replace(":", "") <= 2130
    ) {
      return next();
    } else
      next({
        status: 400,
        message: "Sorry, reservations can not be made at these hours!",
      });
  }
  return next({ status: 400, message: "a reservation_time is required" });
};

const hasPeople = (req, res, next) => {
  const { data: { people } = {} } = req.body;
  if (people && people > 0 && typeof people === "number") {
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

async function reservationExists(req, res, next) {
  const reservation = await service.read(req.params.reservation_Id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  return next({
    status: 404,
    message: `Reservation ${req.params.reservation_Id} does not exist`,
  });
}

async function read(req, res, next) {
  const { reservation } = res.locals;
  res.json({ data: reservation });
}

async function update(req, res) {
  const {
    first_name,
    last_name,
    mobile_number,
    people,
    reservation_date,
    reservation_time,
  } = req.body.data;

  const data = await service.update(
    {
      first_name,
      last_name,
      mobile_number,
      people,
      reservation_date,
      reservation_time,
    },
    res.locals.reservation.reservation_id
  );
  res.json({ data });
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
  read: [asyncErrorBoundary(reservationExists), read],
  update: [
    asyncErrorBoundary(reservationExists),
    hasFirstName,
    hasLastName,
    hasMobileNumber,
    hasReservationDate,
    hasReservationTime,
    hasPeople,
    asyncErrorBoundary(update),
  ],
};
