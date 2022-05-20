const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const { date, mobile_number } = req.query;
  if (date) {
    res.json({
      data: await service.listReservations(date),
    });
  }
  else if (mobile_number) {
    res.json({
      data: await service.listResByMobileNumber(mobile_number),
    });
  } else {
    const currentDate = new Date();
    const currentDateString = `${currentDate.getFullYear().toString(10)}-${(
      currentDate.getMonth() + 1
    )
      .toString(10)
      .padStart(2, "0")}-${currentDate
      .getDate()
      .toString(10)
      .padStart(2, "0")}`;
    res.json({
      data: await service.listReservations(currentDateString),
    });
  }
}

function hasContent(req, res, next) {
  const { data } = req.body;
  const contents = Object.values(data);
  const hasContent = contents.every((content) => content);
  if (hasContent) {
    next();
  } else {
    const emptyProp = [];
    for (const prop in data) {
      if (!data[prop] || data[prop] <= 0) {
        emptyProp.push(prop);
      }
    }
    next({ status: 400, message: `Missing ${emptyProp}` });
  }
}

function checkData(req, res, next) {
  if (req.body.data) {
    next();
  } else {
    next({ status: 400, message: "Need data key" });
  }
}

function hasRequiredProps(req, res, next) {
  const { data } = req.body;
  const requiredProps = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];
  const props = Object.keys(data);
  const hasProps = requiredProps.every((prop) => {
    return props.includes(prop);
  });
  if (hasProps) {
    next();
  } else {
    const missingProps = requiredProps.filter((prop) => !props.includes(prop));
    if (missingProps.length > 0)
      next({
        status: 400,
        message: `You are missing the ${missingProps} property`,
      });
  }
}

function notPast(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const [year, month, day] = reservation_date.split("-");
  const [hour, min] = reservation_time.split(":");
  const postDate = new Date(year, month - 1, day);
  postDate.setHours(hour, min);
  const todayDate = new Date();
  if (todayDate.getTime() < postDate.getTime()) {
    next();
  } else {
    next({
      status: 400,
      message: "Must set reservation on a future date and time",
    });
  }
}

function notTuesday(req, res, next) {
  const { reservation_date } = req.body.data;
  const [year, month, day] = reservation_date.split("-");
  const postDate = new Date(year, month - 1, day);
  const dayOfWeek = postDate.getDay();
  if (dayOfWeek !== 2) {
    next();
  } else {
    next({ status: 400, message: "The restaurant is closed on tuesdays" });
  }
}

function isOpen(req, res, next) {
  const { reservation_time } = req.body.data;
  const [hour, min] = reservation_time.split(":");
  if (
    (hour < 21 && hour > 10) ||
    (hour == 10 && min >= 30) ||
    (hour == 21 && min <= 30)
  ) {
    next();
  } else {
    next({
      status: 400,
      message: "The reservation does not fall in the premited times",
    });
  }
}

function checkDateFormat(req, res, next) {
  const { reservation_date } = req.body.data;
  if (reservation_date.match(/\d\d\d\d-\d\d-\d\d/)) {
    next();
  } else {
    next({
      status: 400,
      message: "The reservation_date must follow yyyy-mm-dd",
    });
  }
}

function checkTimeFormat(req, res, next) {
  const { reservation_time } = req.body.data;
  if (reservation_time.match(/\d\d:\d\d/)) {
    next();
  } else {
    next({
      status: 400,
      message: "The reservation_time format must follow hh:mm",
    });
  }
}

function checkPeople(req, res, next) {
  const { people } = req.body.data;
  if (typeof people === "number") {
    next();
  } else {
    next({ status: 400, message: "people must be a number" });
  }
}

async function create(req, res) {
  res.status(201).json({ data: await service.create(req.body.data) });
}

async function update(req, res) {
  res.json({ data: await service.update(req.body.data) });
}

async function checkReservation(req, res, next) {
  const targetReservation = await service.readReservation(
    req.params.reservationId
  );
  if (targetReservation) {
    res.locals.reservation = targetReservation;
    next();
  } else {
    next({
      status: 404,
      message: `Reservation ${req.params.reservationId} does not exist`,
    });
  }
}

async function updateStatus(req, res) {
  const {
    data: { status },
  } = req.body;
  res.json({
    data: await service.updateStatus(req.params.reservationId, status),
  });
}

async function read(req, res) {
  res.json({ data: res.locals.reservation });
}

function checkStatus(req, res, next) {
  const {
    data: { status },
  } = req.body;
  const badStatus = ["seated", "finished"];
  if (!badStatus.includes(status)) {
    next();
  } else {
    next({ status: 400, message: `Status cannot be ${req.body.data.status}` });
  }
}

function checkStatusChange(req, res, next) {
  const {
    data: { status },
  } = req.body;
  const correctStatus = ["booked", "seated", "finished", "cancelled"];
  if (correctStatus.includes(status)) {
    next();
  } else {
    next({ status: 400, message: `Status cannot be ${status}` });
  }
}

function checkIfFinished(req, res, next) {
  const { reservation } = res.locals;
  if (reservation.status !== "finished") {
    next();
  } else {
    next({
      status: 400,
      message: `Cannot change status if reservation is already finished`,
    });
  }
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    checkData,
    hasRequiredProps,
    hasContent,
    checkStatus,
    checkDateFormat,
    checkTimeFormat,
    checkPeople,
    notTuesday,
    notPast,
    isOpen,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(checkReservation),
    checkData,
    hasRequiredProps,
    hasContent,
    checkStatus,
    checkDateFormat,
    checkTimeFormat,
    checkPeople,
    asyncErrorBoundary(update),
  ],
  read: [asyncErrorBoundary(checkReservation), read],
  updateStatus: [
    asyncErrorBoundary(checkReservation),
    checkIfFinished,
    checkStatusChange,
    asyncErrorBoundary(updateStatus),
  ],
};
