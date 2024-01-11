const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const VALID_PROPERTIES = [
  "reservation_id",
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
  "created_at",
  "updated_at",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  next();
}

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

function dateIsValid(req, res, next) {
  const { reservation_date } = req.body.data;
  const isDate = Date.parse(reservation_date);

  if (!Number.isNaN(isDate)) {
    return next();
  }
  next({
    status: 400,
    message: `reservation_date is not a valid date.`,
  });
}

function reservationTimeIsValid(req, res, next) {
  const { reservation_time } = req.body.data;
  const isTime = reservation_time.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
  if (isTime) {
    return next();
  } else {
    next({
      status: 400,
      message: `reservation_time is not a valid time.`,
    });
  }
}

async function reservationExists(req, res, next) {
  const { reservationId } = req.params;
  const reservation = await service.read(reservationId);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Resevation id ${reservationId} cannot be found.`,
  });
}

function peopleIsNum(req, res, next) {
  let { people } = req.body.data;
  if (typeof people !== "number" || people < 0) {
    next({
      status: 400,
      message: `people must be a number and greater than zero.`,
    });
  } else {
    return next();
  }
}

function notInPast(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  let now = Date.now();
  let bookedTime = Date.parse(`${reservation_date} ${reservation_time} EST`);
  if (bookedTime > now) {
    return next();
  } else {
    return next({
      status: 400,
      message: "reservation_time must be made in the future.",
    });
  }
}

function notTuesday(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const day = new Date(`${reservation_date} ${reservation_time}`);
  if (day.getDay() !== 2) {
    next();
  } else {
    return next({
      status: 400,
      message: "Restaurant is closed on Tuesdays, please select another day.",
    });
  }
}

function timeDuringOpenHours(req, res, next) {
  const { reservation_time } = req.body.data;
  if (reservation_time < "10:30:00" || reservation_time > "21:30:00") {
    next({
      status: 400,
      message: "Reservation time must be made between 10:30 am and 9:30 pm.",
    });
  } else {
    return next();
  }
}

function statusIsBooked(req, res, next) {
  const { status } = req.body.data;
  if (status === "booked" || !status) {
    return next();
  }
  next({
    status: 400,
    message: `Reservation status is ${status}`,
  });
}

function statusIsNotFinished(req, res, next) {
  const { status } = res.locals.reservation;
  if (status != "finished") {
    return next();
  }
  next({
    status: 400,
    message: `Status cannot be updated if it is finished.`,
  });
}

function validStatus(req, res, next) {
  const { status } = req.body.data;
  if (
    status === "booked" ||
    status === "seated" ||
    status === "finished" ||
    status === "cancelled"
  ) {
    return next();
  }
  next({
    status: 400,
    message: `${status} is not a valid status.`,
  });
}

async function list(req, res) {
  const { date, mobile_number } = req.query
  let data
  if(mobile_number) {
    data = await service.listByPhone(mobile_number)
  }
  else if (date) {
    data = await service.listByDate(date)
  } else {
    data = await service.list()
  }
  res.json({
    data: data
  })
}

async function create(req, res, next) {
  const newReservation = { ...req.body.data };
  const data = await service.create(newReservation);
  res.status(201).json({ data: data });
}

async function read(req, res) {
  const { reservation: data } = res.locals;
  res.json({ data });
}

async function update(req, res) {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await service.update(updatedReservation);
  res.status(200).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(reservationExists), read],
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    dateIsValid,
    reservationTimeIsValid,
    peopleIsNum,
    notInPast,
    notTuesday,
    timeDuringOpenHours,
    statusIsBooked,
    asyncErrorBoundary(create),
  ],
  update: [
    reservationExists,
    hasOnlyValidProperties,
    hasRequiredProperties,
    dateIsValid,
    peopleIsNum,
    notInPast,
    notTuesday,
    timeDuringOpenHours,
    statusIsBooked,
    asyncErrorBoundary(update),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    statusIsNotFinished,
    validStatus,
    asyncErrorBoundary(update),
  ],
};
