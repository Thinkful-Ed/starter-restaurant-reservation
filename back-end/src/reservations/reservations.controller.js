const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const moment = require("moment");
//const e = require("express");

//Middleware

const requiredProperties = [
  "first_name", 
  "last_name", 
  "mobile_number", 
  "reservation_date", 
  "reservation_time", 
  "people"
];

function hasProperties(req, res, next){
  const { data = {} } = req.body;

  for (let property of requiredProperties){
    if (!data.hasOwnProperty(property)){
      next({
        status: 400,
        message: `${property} is required`
      });
    }
  }
  next();
}

async function reservationExists(req, res, next) {
  const reservation = await service.read(req.params.reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `reservation_id ${req.params.reservation_id} does not exist`,
  })
}

function validNames(req, res, next){
    const { first_name, last_name } = req.body.data;
    if (!first_name.trim()){
      return next({
        status: 400, 
        message: "first_name is invalid"
      });
    };
    if (!last_name.trim()){
      return next({
        status: 400, 
        message: "last_name is invalid"
      });
    };
    next();
  };

function validMobileNumber(req, res, next){
    const { mobile_number } = req.body.data;
    if (!mobile_number.trim()){
      return next({
        status: 400, 
        message: "mobile_number must not be empty"
      });
    };
    next();
  };

function validPartySize(req, res, next){
    let { people } = req.body.data
    if (typeof people != "number"){
        return next({
          status: 400, 
          message: "people must be a number"
        });
    }
    if (people <= 0){
      return next({
        status: 400, 
        message: "people must be greater than 0."
      });
    }
    next();
  };

function validDateTime(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const today = moment().format("YYYY-MM-DD");
  const timePattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  const datePattern = /\d{4}-\d{2}-\d{2}/;
  const resDate = moment(reservation_date, "YYYY-MM-DD").format("dddd");
  const currentTime = moment().format("HH:mm");

    if (!datePattern.test(reservation_date)){
      next({status: 400, message: "reservation_date is not a valid date"});
    };

    if (!timePattern.test(reservation_time)){
      next({status: 400, message: "reservation_time is not a valid time"});
    };

  if(!reservation_date || !reservation_time){
    return next({
      status: 400,
      message: "Please enter a reservation_date and reservation_time."
    });
  }

  if (resDate === "Tuesday") {
    return next({
      status: 400,
      message: 'Restaurant is closed on Tuesdays. Please choose a different day.',
    });
  }

  if ( reservation_date < today){
    return next({
      status: 400,
      message: 'Please choose a future date.',
    });
  }

  if (reservation_time < '10:30' || reservation_time > '21:30') {
    return next({
      status: 400,
      message: 'Restaurant is closed, please select a different time.',
    });
  }
  if (req.body.data.reservation_date === today  && reservation_time < currentTime){
    next({status: 400, message: "Please select a future time for today"});
};
  next();
}

function finishedRes(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "finished") {
    return next({
      status: 400,
      message: "Reservation already finished, cannot modify",
    });
  }
  next();
}

function bookedStatus(req, res, next) {
  const { status } = res.locals.reservation
    ? res.locals.reservation
    : req.body.data;
  if (status === "seated" || status === "finished" || status === "cancelled") {
    return next({
      status: 400,
      message: `New reservation cannot be ${status} already`,
    });
  }
  next();
}

function validStatus(req, res, next) {
  const { status } = res.locals.reservation;
  const { data = {} } = req.body;

  if (data.status === "cancelled"){
    next();
  }else if (status == "finished"){
    next({status: 400, message: "cannot update a finished table"})
  }else if (data.status == "booked" || data.status == "seated" || data.status == "finished"){
    next();
  }else next({status: 400, message: "unknown status"});
};



//CRUD functions

async function list(req, res) {
  const date = req.query.date ? req.query.date : moment().format("YYYY-MM-DD");
  if(req.query.mobile_number){
    const data = await service.search(req.query.mobile_number)
    res.json({ data })
  }else{
  const data = await service.list(date);
  //console.log("list: ", data);
  res.json({ data });
}
}

async function read(req, res, next){
let reservation_id;
if(req.params.reservation_id){
  reservation_id = req.params.reservation_id;
  const foundRes = await service.read(reservation_id);
  if(foundRes){
    res.json({data: foundRes })
  } else next({
    status: 404,
    message: "999"
  })
} else if (req.body.data.reservation_id){
  reservation_id = req.body.data.reservation_id;
  const foundRes = await service.read(reservation_id);
  if(foundRes){
    res.locals.reservation = foundRes;
    next();
  } else next({
    status: 404,
    message: "999"
  });
 }
}

// async function read(req, res) {
//   const reservation = res.locals.reservation;
//   console.log({ data: reservation });
//   res.json({ data: reservation });
// }

async function updateStatus(req, res, next) {
  const { reservation_id } = req.params;
  const { status } = req.body.data;
  const reservation = await service.updateStatus(reservation_id, status);
  res.status(200).json({ data: reservation });
}

async function updateRes(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = req.body.data;
  const data = await service.updateRes(reservation_id, reservation);
  res.json({ data });
}

async function create(req, res){
  const reservation = req.body.data;
  const { reservation_id } = await service.create(reservation);
  reservation.reservation_id = reservation_id
  res.status(201).json({ data: reservation });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  create: [
    hasProperties,
    validNames,
    validMobileNumber,
    validPartySize,
    validDateTime,
    bookedStatus,
    asyncErrorBoundary(create),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    validStatus,
    finishedRes,
    asyncErrorBoundary(updateStatus),
  ],
  updateRes: [
    hasProperties,
    asyncErrorBoundary(reservationExists),
    validNames,
    validMobileNumber,
    validPartySize,
    validDateTime,
    validStatus,
    asyncErrorBoundary(updateRes),
  ]
};
