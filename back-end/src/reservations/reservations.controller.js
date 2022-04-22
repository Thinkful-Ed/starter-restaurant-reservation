const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

async function list(req, res) {
  const { date } = req.query;
  const data = await service.list(date);
  res.json({ data });
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);
  if (!reservation) {
    return next({
      status: 404,
      message: `Reservation with id does not exist: ${reservation_id}`,
    });
  }
  res.locals.reservation = reservation;
  next();
}

function read(req, res) {
  const data = res.locals.reservation;
  res.json({ data });
}

function validateData(req, res, next) {
  const { data } = req.body;
  if (!data) {
    return next({
      status: 400,
      message: "Body is missing the data property.",
    });
  }
  res.locals.data = data;

  next();
}

function validateDate(req, res, next) {
  const { reservation_date, reservation_time } = res.locals.data;
  const reservationDate = new Date(`${reservation_date}T${reservation_time}`);
  const dayOfWeek = reservationDate.getDay();

  if (!isfutureDate(reservation_date)) {
    return next({
      status: 400,
      message: "reservation date must be in the future",
    });
  }
  if (dayOfWeek === 2) {
    return next({
      status: 400,
      message: "reservation date cannot be Tuesday because we are closed",
    });
  }
  if (!/^\d{4}\-\d{2}\-\d{2}$/.test(reservation_date)) {
    return next({
      status: 400,
      message: "reservation_date needs to look like 'YYYY-MM-DD'",
    });
  }

  next();
}

function isfutureDate(reservation_date) {
  const today = new Date();
  const reservation = new Date(reservation_date);
  if (reservation.getFullYear() > today.getFullYear()) {
    return true;
  } else if (reservation.getFullYear() == today.getFullYear()) {
    if (reservation.getMonth() > today.getMonth()) {
      return true;
    } else if (reservation.getMonth() == today.getMonth()) {
      if (reservation.getDate() + 1 >= today.getDate()) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
}

function validateProperties(req, res, next) {
  const { data } = res.locals;
  VALID.forEach((property) => {
    if (!data[property] || data[property] === "") {
      return next({
        status: 400,
        message: `The '${property}' property is missing or empty`,
      });
    }
  });

  next();
}

function validateTime(req, res, next) {
  const { reservation_time, reservation_date } = res.locals.data;
  const today = new Date();
  const currentTime = [today.getHours(), today.getMinutes()];
  if (isToday(reservation_date, today)) {
    console.log("the reservation is for today");
    if (!checkHours(reservation_time, currentTime)) {
      return next({
        status: 400,
        message: "reservation_time needs to be in the future",
      });
    }
  }
  if (!checkHours(reservation_time)) {
    return next({
      status: 400,
      message: "reservation_time must be between 10:30 and 21:30",
    });
  }
  if (!/^\d{2}\:\d{2}/.test(reservation_time)) {
    return next({
      status: 400,
      message: "reservation_time needs to look like 'HH:MM'",
    });
  }
  next();
}

function checkHours(reservation_time, currentTime) {
  const reservationTime = reservation_time.split(":");
  if (!currentTime) {
    if (reservationTime[0] <= 10) {
      if (reservationTime[0] < 10) {
        return false;
      }
      if (reservationTime[1] < 30) {
        return false;
      }
    }
    if (reservationTime[0] >= 21) {
      if (reservationTime[0] > 21) {
        return false;
      }
      if (reservationTime[1] > 30) {
        return false;
      }
    }
  } else {
    if (reservationTime[0] <= currentTime[0]) {
      if (reservationTime[0] < currentTime[0]) {
        return false;
      }
      if (reservationTime[1] < currentTime[1]) {
        return false;
      }
    }
  }

  return true;
}

function isToday(reservation_date, today) {
  const currentDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  if (reservation_date === currentDate) {
    return true;
  } else return false;
}

function validatePeople(req, res, next) {
  const { people } = res.locals.data;
  if (typeof people !== "number") {
    next({
      status: 400,
      message: "people has to be a number",
    });
  }
  if (people === 0) {
    next({
      status: 400,
      message: "people cannot equal 0",
    });
  }
  next();
}

async function create(req, res) {
  const data = await service.create(res.locals.data);
  res.status(201).json({ data });
}

function validateStatus(req, res, next) {
  const { status } = res.locals.data;
  if (status && status !== "booked") {
    return next({
      status: 400,
      message: "status cannot be seated or finished.",
    });
  }
  next();
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), read],
  create: [
    validateData,
    validateProperties,
    validateDate,
    validateTime,
    validatePeople,
    validateStatus,
    asyncErrorBoundary(create),
  ],
};
