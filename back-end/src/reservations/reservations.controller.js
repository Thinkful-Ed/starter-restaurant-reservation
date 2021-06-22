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
  create: [isValidReservation, asyncErrorBoundary(create)]
};
