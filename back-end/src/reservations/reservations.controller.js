/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../utils/hasProperties");
const hasRequiredProperties = hasProperties("first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people");
const validateTypes = require("../utils/validateReservationInput");
const validateInputTypes = validateTypes();


//DON'T FORGET TO REMOVE/EDIT ANY UNUSED next VARS
//TODO remove unused code
//TODO split larger functions into helper functions


async function list(req, res, _next) {
  let { date }  = req.query;
  const listing = await service.list(date)
  let filtered = listing.filter((eachRes) => 
    eachRes.status !== 'finished'
  )
  res.json({ data: filtered})
}

async function create(req, res, next) {
  const reqStatus = req.body.data.status;
  if(reqStatus == 'seated' || reqStatus == 'finished') {
    next({ status: 400, message: `Status is ${reqStatus}`})
  }
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

function validateStatusChange(req, res, next) {
  
    const resStatus = res.locals.foundReservation.status;
    const updateStatus = req.body.data.status;
  
    if(resStatus == 'finished'){
      next({ status: 400, message:`${res.locals.foundReservation.reservation_id} has status: ${resStatus}`})
    }
    if(updateStatus == 'unknown') {
      next({ status: 400, message: `Cannot enter a status of ${updateStatus}`})
    }
    next();
}

async function update(req, res, next) {

  const updatedRes = {
    ...res.locals.foundReservation,
    status: req.body.data.status,
  }
  const updated = await service.update(updatedRes);
  res.status(200).json({ data: updated })
}





module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasRequiredProperties, validateInputTypes, asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  update: [asyncErrorBoundary(reservationExists), validateStatusChange, asyncErrorBoundary(update)]
};
