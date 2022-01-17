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
  const data = await service.create(req.body.data);
  res.status(201).json({data});
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
  
  if (!Number.isInteger(data.people)) {
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

  function checkTuesday(date) {
    let d = new Date(date);
    if (d.getDay() === 2) return true;
    return false;
  }

  function isDatePast(date) {
    let today = new Date();
    let checkedDate = new Date(date);
    return today > checkedDate;
  }

  function isClosed(time) {
    time = new Date(time);
    if (time.getHours() < 10) return true;
    if (time.getHours() == 10) {
      return time.getMinutes() < 30;
    }
    if (time.getHours() > 9) return true;
    if (time.getHours() == 9) {
      return time.getMinutes() > 30;
    }
    return false;
  }

  let checkData = `${data.reservation_date} ${data.reservation_time}`

  if (checkTuesday(checkData)) {
    next({
      status: 400,
      message: "reservation_date cannot be a Tuesday, restaurant is closed"
    })
  }

  if (isDatePast(checkData)) {
    next({
      status:400,
      message: "Date must be in the future"
    })
  }

  if (isClosed(checkData)) {
    next({
      status: 400,
      message: "Restaurant is closed at that time"
    })
  }
  
  next();
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [validateReservation, asyncErrorBoundary(create)],
};
