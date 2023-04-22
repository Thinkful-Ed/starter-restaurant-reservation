const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */
// async function list(req, res, next) {
//   const data = await reservationsService.list();
//   res.json({ data });
// }

async function list(req, res) {
  const date = req.query.date;
  if (date) {
    const data = await reservationsService.listDate(date);
    res.json({ data });
  } else {
    const data = await reservationsService.list();
    res.json({ data });
  }
}

async function create(req, res) {
  const { data: { 
    first_name, 
    last_name, 
    mobile_number, 
    reservation_date, 
    reservation_time, 
    people 
  } = {} } = req.body;
  const newReservation = {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people
  };
  const data = await reservationsService.create(newReservation)
  res.status(201).json({ data });
}

// VALIDATION

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `Reservation must include ${propertyName}` });
  };
}

function peopleQuantityIsValid(req, res, next) {
  const { data: { people } = {} } = req.body;
  if (people <= 0 || !Number.isInteger(people)) {
    return next({
      status: 400,
      message: `People must have a quantity that is an integer greater than 0`
    });
  }
  next()
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    peopleQuantityIsValid,
    asyncErrorBoundary(create)
  ],
};
