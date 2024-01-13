const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { isValid, parseISO, parse } = require("date-fns");

//Validation middleware

//Validates that new Reservations have the correct properties
function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `Must include a ${propertyName} property.` });
  };
}

//Validates that the inputted date is a real date
function dateIsValid(req, res, next) {
  const { data: { reservation_date } = {} } = req.body;

  if (reservation_date && isValid(parseISO(reservation_date))) {
    return next();
  }
  next({ status: 400, message: `reservation_date` });
}

//Validates that the inputted time is in the correct format
function timeIsValid(req, res, next) {
  const { data: { reservation_time } = {} } = req.body;

  //Regex to ensure the right format
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (reservation_time && regex.test(reservation_time)) {
    const time = parse(reservation_time, "HH:mm", new Date());

    if (isValid(time)) {
      return next();
    }
  }

  next({ status: 400, message: `reservation_time` });
}

//Validates that the provided party size, "people", is a legitimate number
function peopleNumberIsValid(req, res, next) {
  const { data: { people } = {} } = req.body;
  if (people <= 0 || !Number.isInteger(people)) {
    return next({
      status: 400,
      message: `people`,
    });
  }

  next();
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const date = req.query.date;

  const data = await service.list();

  const formatting = data.filter((element) => {
    const formattedDate = element.reservation_date.toISOString().split("T")[0];
    return formattedDate === date;
  });

  let sortedData = formatting.sort((a, b) => {
    if (a.reservation_time > b.reservation_time) {
      return 1;
    } else if (b.reservation_time > a.reservation_time) {
      return -1;
    } else {
      return 0;
    }
  });

  if (date) {
    res.json({ data: sortedData });
  } else {
    res.json({ data });
  }
}

//Executive function to create a new reservation
async function create(req, res) {
  const newReservation = await service.create(req.body.data);

  newReservation.reservation_id++;

  res.status(201).json({ data: newReservation });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_time"),
    bodyDataHas("reservation_date"),
    bodyDataHas("people"),
    peopleNumberIsValid,
    dateIsValid,
    timeIsValid,
    asyncErrorBoundary(create),
  ],
};
