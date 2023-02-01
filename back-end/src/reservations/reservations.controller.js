/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../utils/hasProperties");
const hasRequiredProperties = hasProperties("first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people");
const validateTypes = require("../utils/validateTypes");
const validateInputTypes = validateTypes();


//DON'T FORGET TO REMOVE/EDIT ANY UNUSED next VARS


async function list(req, res, _next) {
  let { date }  = req.query;
  const listing = await service.list(date)
  res.json({ data: listing})
}

async function create(req, res, _next) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function reservationExists(req, res, next){
  const { reservation_id } = req.params;
  const foundReservation = await service.read(reservation_id);
  if(!foundReservation){
    return next({ status:404, message:`Reservation with id ${reservation_id} not found`})
  }
  res.locals.foundReservation = foundReservation;
  next();
}

async function read(req, res, next) {
  const { reservation_id } = req.params;
  const foundReservation = await service.read(reservation_id);
  res.json({ data: foundReservation });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasRequiredProperties, validateInputTypes, asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],

};
