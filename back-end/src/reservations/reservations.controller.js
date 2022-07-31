const service = require("./reservations.service");

const dateFormat = /\d\d\d\d-\d\d-\d\d/;
const timeFormat = /\d\d:\d\d/;

function bodyDataVerification(req, res, next) {
  const toCheck = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];

  let notValid = [];
  const { data = {} } = req.body;
  res.locals.data = data;

  // checks to see is the people parameter is an integer
  if (typeof data.people !== "number") {
    next({ status: 400, message: `people must be an integer` });
  }

  // checks to see is the reservation date is the correct format
  if (!dateFormat.test(data.reservation_date)) {
    next({
      status: 400,
      message: "reservation_date is not in the correct format",
    });
  }

  // checks to see is the reservation time is the correct format
  if (!timeFormat.test(data.reservation_time)) {
    next({
      status: 400,
      message: "reservation_time is not in the correct format",
    });
  }

  // checks to make sure all parameters are not empty
  toCheck.forEach((param) => {
    if (!data[param]) {
      notValid.push(param);
    }
  });

  if (notValid.length > 0) {
    next({
      status: 400,
      message: `Please fill in the following: ${notValid.join(", ")}`,
    });
  }
  next();
}

function dateCheck(req, res, next) {
  const dayIncoming = new Date(res.locals.data.reservation_date);
  if (dayIncoming.getDay() === 1) {
    next({
      status: 400,
      message: "Restaurant is closed on Tuesdays, please choose another date.",
    });
  }

  if (
    res.locals.data.reservation_date.replaceAll("-", "") <
    new Date().toISOString().slice(0, 10).replaceAll("-", "")
  ) {
    next({ status: 400, message: "Only future reservations are allowed." });
  }

  next();
}

function timeCheck(req, res, next) {
  // set variable to incoming time request
  const incoming = parseInt(
    res.locals.data.reservation_time.replace(/[^0-9]+/, ""),
  );

  // set new variable to the current time
  const day = new Date();
  const minute = day.getMinutes();
  const hour = day.getHours();
  const compareCurrent = parseInt(
    `${hour.toString().length === 2 ? hour : "0" + hour}${
      minute.toString().length === 2 ? minute : "0" + minute
    }`,
  );

  if (
    Date.parse(res.locals.data.reservation_date) < Date.parse(new Date()) &&
    incoming < compareCurrent
  ) {
    next({
      status: 400,
      message: "Reservations cannot be made before the current time.",
    });
  }

  if (incoming < 1030) {
    next({
      status: 400,
      message:
        "Reservations must be made for after restaurant opening (10:30 AM).",
    });
  }

  if (incoming > 2130) {
    next({
      status: 400,
      message:
        "Reservations must be made for one hour prior to restaurant opening (9:30 PM).",
    });
  }

  next();
}

async function list(req, res) {
  res.json({ data: await service.list(req.query.date) });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function read(req, res) {
  res.json({ data: await service.read(req.params.reservation_id) });
}

module.exports = {
  list,
  create: [bodyDataVerification, dateCheck, timeCheck, create],
  read,
};
