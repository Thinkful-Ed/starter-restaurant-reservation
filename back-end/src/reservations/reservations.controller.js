/**
 * List handler for reservation resources
 */
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service")

async function checkQuery(req, res, next) {
  const {mobile_number} = req.query;
  if (mobile_number) {
    const data = await service.search(mobile_number);
    if (!data) {
      next({
        status: 404,
        message: `No reservations found`
      })
    }
    return res.status(200).json({data})
  }
  next();
}

async function list(req, res, next) {
  res.json({
    data: await service.list(req.query.date),
  });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({data});
}

async function reservationExists(req, res, next) {
  const {reservation_id} = req.params;
  const data = await service.read(reservation_id)
  if (!data) {
    next({
      status: 404,
      message: `${reservation_id} not found`,
    })
  }
  res.locals.reservation = data;
  next();
}

function read(req, res) {
  const data = res.locals.reservation;
  res.status(200).json({data})
}

async function updateStatus(req, res) {
  const {reservation_id} = req.params;
  const data = await service.updateStatus(reservation_id, req.body.data.status);
  res.status(200).json({data})
}

async function validateExistingReservation(req, res, next) {
  let errors = [];
  const {data} = req.body;
  const {reservation_id} = req.params;
  const exists = await service.read(reservation_id);
  if (!exists) next({status: 404, message: `${reservation_id} does not exist`});
  const acceptableStatuses = ["booked", "seated", "finished"];
  if (!acceptableStatuses.includes(data.status)) errors.push(`${data.status} not allowed`)
  if (exists.status == "finished") errors.push("A finished reservation cannot be updated")
  
  if (errors.length) {
    next({
      status: 400,
      message: errors.join(", ")
    })
  }

  next();
}



function validateNewReservation(req, res, next) {
  let errors = [];
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
      // return next({
      //   status: 400,
      //   message: `Reservation must include a ${field}`
      // })
      errors.push(`Reservation must include a ${field}`);
    }
  })
  
  if (!Number.isInteger(data.people)) {
    // next({
    //   status: 400,
    //   message: "people must be a number",
    // })
    errors.push("people must be a number");
  }

  if (data.status && data.status !== "booked") errors.push(`${data.status} must be "booked"`)

  
  const dateFormat = /\d\d\d\d-\d\d-\d\d/;
  const timeFormat = /\d\d:\d\d/;

  if(data.reservation_date && !data.reservation_date.match(dateFormat)) {
    // next({
    //   status: 400,
    //   message: "reservation_date must be a date"
    // })
    errors.push("reservation_date must be a date")
  }

  if (data.reservation_time && !data.reservation_time.match(timeFormat)) {
    // next({
    //   status: 400,
    //   message: "reservation_time must be a time"
    // })
    errors.push("reservation_time must be a time")
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
    if (time.getHours() > 21) return true;
    if (time.getHours() == 21) {
      return time.getMinutes() > 30;
    }
    return false;
  }

  let checkData = `${data.reservation_date} ${data.reservation_time}`

  if (checkTuesday(checkData)) {
    // next({
    //   status: 400,
    //   message: "The restaurant is closed on Tuesdays"
    // })
    errors.push("The restaurant is closed on Tuesdays")
  }

  if (isDatePast(checkData)) {
    // next({
    //   status:400,
    //   message: "Date must be in the future"
    // })
    errors.push("Date must be in the future")
  }

  if (isClosed(checkData)) {
    // next({
    //   status: 400,
    //   message: "Restaurant is closed at that time"
    // })
    errors.push("The restaurant is closed at that time")
  }

  if (errors.length) {
    next({
      status: 400,
      message: errors.join(", "),
    })
  }
  
  next();
}

module.exports = {
  list: [asyncErrorBoundary(checkQuery), asyncErrorBoundary(list)],
  create: [validateNewReservation, asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(reservationExists), read],
  updateStatus: [asyncErrorBoundary(validateExistingReservation), asyncErrorBoundary(updateStatus)],
};
