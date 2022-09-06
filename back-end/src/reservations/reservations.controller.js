/**
 * List handler for reservation resources
 */
const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const properties = ["first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"]
  const today = new Date();
  const timeNow = today.toLocaleTimeString();
  today.toISOString().split('T')[0]
  const requestedDate = new Date(data.reservation_date.replace(/-/g, "/"));
  if(!data){
    const error = new Error(`Data is required.`);
    error.status = 400;
    next(error);
  }
  properties.forEach((property) => {
    if (!data[property]) {
      const error = new Error(`A '${property}' property is required.`);
      error.status = 400;
      next(error);
    }
  });
  console.log(data.reservation_date)

  const dateRegex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
  const timeRegex = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/

  if (!(dateRegex.test(data.reservation_date))){
    return next({
      status: 400,
      message: `Property "reservation_date" must be a valid date.`
    })
  }

  if(!(timeRegex.test(data.reservation_time))){
    return next({
      status: 400,
      message: `Property "reservation_time" must be a valid time.`
    })
  }

  if (typeof data.people !== "number") {
    return next({
      status: 400,
      message: `Property "people" must be a number.`,
    });
  }

  //Future date validation
  if (requestedDate < today){
    const error = new Error(`Reservation date must be in the future.`);
    error.status = 400;
    next(error);
  }

  if(requestedDate.getDay() == 2){
    const error = new Error(`The restaurant is closed on Tuesday.`);
    error.status = 400;
    next(error);
  }

  if(data.reservation_time + ":00" < "10:30:00"){
    const error = new Error(`The restaurant is closed before 10:30.`);
    error.status = 400;
    next(error);
  }

  if(data.reservation_time + ":00" > "21:30:00"){
    const error = new Error(`The restaurant is closes at 10:30.`);
    error.status = 400;
    next(error);
  }

  if (requestedDate == today && data.reservation_time + ":00" < timeNow){
    const error = new Error(`Reservation time must be in the future.`);
    error.status = 400;
    next(error);
  }

  next();
}

async function list(req, res) {
  const todaysDate = req.query.date;
  if(todaysDate){
    const data = await service.listToday(todaysDate)
    res.json({data: data})
  }else{
  const data = await service.list()
  res.json({data:data});
  }
}

async function reservationExists(req, res, next) {
  const {reservation_id} = req.params;
  const reservation = await service.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  return next({ status: 404, message: `Reservation ${reservation_id} cannot be found.`})
}

async function read(req, res, next) {
  const {reservation} = res.locals;
  res.json({data: reservation});
}

async function create(req, res, next) {
  service
    .create(req.body.data)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), read],
  create: [
    hasOnlyValidProperties,
    asyncErrorBoundary(create)]
};
