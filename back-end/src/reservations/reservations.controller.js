const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")


//validation for empty fields

function isValidReservation(req, res, next) {
  const requiredFields = [
    "first_name", 
    "last_name", 
    "mobile_number", 
    "reservation_date", 
    "reservation_time",
    "people"
  ]
  if (!req.body.data) {
     return next({
      status: 400,
      message: `Can not submit empty form.`,
    });
  }
  for (const field of requiredFields) {
    if (!req.body.data[field]) {
       return next({
        status: 400,
        message: `Order must include a ${field}`,
      });
    }
  }
  next();
}

function isPartyValid(req, res, next) {
  const { people } = req.body.data;
  if (!(typeof(people) === "number") || people <= 0) {
    return next({
      status: 400,
      message: `Number of people must be a number greater than zero.`
    });
  }
  next();
}

function dateValidation(req, res, next) {
  const { reservation_date } = req.body.data; 
  if (reservation_date.match(/^\d{4}-\d{2}-\d{2}$/) === null) {
    return next({
      status: 400,
      message: `The reservation_date must be in YYYY-MM-DD format.`
    })
  }
  next();
}

function timeValidation(req, res, next) {
    const { reservation_time } = req.body.data; 
    if (reservation_time.match(/^\d{1,2}:\d{2}([ap]m)?$/) === null) {
      return next({
        status: 400,
        message: `The reservation_time must be in HH:MM format.`
      })
    }
    next();
}

async function create(req, res) {
  let reservation = req.body.data;
  let result = await reservationsService.create(reservation);
  res.status(201).json({data: result[0]});
}
/**
 * List handler for reservation resources
 */
// List handler for reservation resources
async function list(req, res) {
  const { date } = req.query;
  const reservationsByDate = await reservationsService.list(date);
  res.json({
    data: reservationsByDate,
  });
}
module.exports = {
  list: asyncErrorBoundary(list), 
  create: [isValidReservation, isPartyValid, dateValidation, timeValidation, asyncErrorBoundary(create)]
};
