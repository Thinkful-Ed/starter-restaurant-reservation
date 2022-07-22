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
  const day = new Date(res.locals.data.reservation_date);
  if (day.getDay() === 1) {
    next({
      status: 400,
      message: "Restaurant is closed on Tuesdays, please choose another date.",
    });
  }

  if (Date.parse(day) < Date.parse(new Date())) {
    next({ status: 400, message: "Only future reservations are allowed." });
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

module.exports = {
  list,
  create: [bodyDataVerification, dateCheck, create],
};
