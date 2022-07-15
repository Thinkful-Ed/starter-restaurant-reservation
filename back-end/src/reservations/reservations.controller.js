const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function validateReservationBody(req, res, next){
  const {data: {first_name, last_name, mobile_number, reservation_date, reservation_time, people} = {}} = req.body;
  let message;

  if(!first_name || first_name === ""){
    message = "First name is a required field."
  }

  if(message){
    return next({
      status: 400,
      message: message,
    })
  } else{
    next();
  }
}

async function list(req, res) {
  data = await reservationsService.list()
  res.json({
    data: data,
  });
}

async function create(req, res, next){
  const {data: {first_name, last_name, mobile_number, reservation_date, reservation_time, people} = {}} = req.body;
  const newReservation = {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  }
  await reservationsService.create(newReservation)
// add to database???
// needs validation function
  res.status(201).json({data: newReservation})
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [validateReservationBody, asyncErrorBoundary(create)],
};
