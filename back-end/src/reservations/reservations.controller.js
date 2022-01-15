/**
 * List handler for reservation resources
 */
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service")

async function list(req, res) {
  res.json({
    data: await service.list(req.query.date),
  });
}

async function create(req, res) {
  console.log(req.data);
  const newReservation = await service.create(req.body.data);
  console.log(newReservation);
  res.status(201).json({data: newReservation});
}

function validateReservation(req, res, next) {
  const { data } = req.body;
  if (!data) return next({status:400, message: "Data is missing"});
  const requiredFields = [
    "first_name", 
    "last_name", 
    "mobile_number", 
    "reservation_date",
    "reservation_time",
    "people",
  ]
  requiredFields.forEach(field => {
    if(!data[field]) {
      return next({
        status: 400,
        message: `Reservation must include a ${field}`
      })
    }
  })
  if (!Number.isInteger(parseInt(data.people))) {
    next({
      status: 400,
      message: "people must be a number",
    })
  }
  // if (data.reservation_date.length != 10 || data.reservation_date[4] != "-") {
  //   next({
  //     status: 400,
  //     message: "reservation_date must be a date"
  //   })
  // }
  const dateFormat = /\d\d\d\d-\d\d-\d\d/;
  const timeFormat = /\d\d:\d\d/;

  if(!data.reservation_date.match(dateFormat)) {
    next({
      status: 400,
      message: "reservation_date must be a date"
    })
  }

  if (!data.reservation_time.match(timeFormat)) {
    next({
      status: 400,
      message: "reservation_time must be a time"
    })
  }
  
  next();
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [validateReservation, asyncErrorBoundary(create)],
};
