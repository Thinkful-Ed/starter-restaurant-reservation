const { request } = require("express");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");


/**
 * List handler for reservation resources
 */
async function list(req, res) {
  req.log.debug({__filename, methodName:"list"});
  const { date } = req.query;
  const data = await service.list(date);
  req.log.trace({__filename, methodName:"list", date, data});
  res.json({data,});
}

function bodyHasData(req, res, next){
  if ( !req.body.data ){
    return next({
      status : 400,
      message : "Must have a body",
    });
  }
  req.log.trace({__filename, methodName:"bodyHasData", data:req.body.data});
  next();
}

function hasValidFirstName(req, res, next){
  req.log.debug({__filename, methodName:"hasValidFirstName"});
  const { first_name = "" } = req.body.data;
  if ( !first_name.trim().length ){
    req.log.trace({__filename, methodName:"hasValidFirstName", first_name,});
    return next({
      status : 400,
      message : "Server: Must have a valid first_name",
    });
  }
  next();
}
function hasValidLastName(req, res, next){
  const { last_name = "" } = req.body.data;
  if ( !last_name.trim().length ){
    return next({
      status : 400,
      message : "Server: Must have a valid last_name",
    });
  }
  next();
}

function hasValidMobile(req, res, next){
  req.log.debug({__filename, methodName:"hasValidMobile" });
  const { mobile_number } = req.body.data;
  if ( !mobile_number ){
    req.log.trace({__filename, methodName:"hasValidMobile", mobile_number});
    return next({
      status : 400,
      message : "Server: Must have a valid mobile_number",
    });
  }
  next();
}

function hasValidPeopleNumber(req, res, next){
  const { people } = req.body.data;
  if ( !people || typeof people !== "number" || isNaN(people) || people < 1 ){
    return next({
      status : 400,
      message : "Server: Number of people must be number greater than 1"
    });
  }
  next();
}

function hasValidDateFormat(req, res, next){
  req.log.debug({fileName : "reservations.controller", methodeName : "hasValidDateFormat"});
  const dateFormat = /\d{4}-\d{2}-\d{2}/g;
  const reservation_date = req.body.data ? req.body.data.reservation_date : req.query.date;//to be able to use for both update and list
  req.log.trace({fileName : "reservations.controller", methodeName : "hasValidDateFormat" , reservation_date,});
  if (!reservation_date || reservation_date.trim().length !==10 || !reservation_date.match(dateFormat) ){
    return next({
      status : 400,
      message : "Server: reservation_date format must be YYYY-MM-DD"
    });
  }
  next();
}

function hasValidTimeFormat(req, res, next){
  const timeFormat = /[0-9]{2}:[0-9]{2}/g;
  const { reservation_time="" } = req.body.data;
  if ( !reservation_time.match(timeFormat) ){
    return next({
      status : 400,
      message : "Server: reservation_time format must be HH:MM:SS"
    });
  }
  next();
}

function isNotTuesday(req, res, next){
  const date = new Date(req.body.data.reservation_date+" 00:00");
  const day = date.getDay();
  if ( day === 2 ){
    return next({
      status : 400,
      message : "Server: Restaurant is closed on Tuesdays."
    });
  }
  next();
}

function isFuture(req, res, next){
  const now = new Date();
  const date = new Date(req.body.data.reservation_date+" "+req.body.data.reservation_time);
  if ( now > date){
    return next({
      status : 400,
      message : "Server : Only future reservations are allowed."
    });
  }
  next();
}

function isEligibleTime(req, res, next){
  const now     = new Date();
  const opening = new Date(req.body.data.reservation_date+" 10:30");
  const closing = new Date(req.body.data.reservation_date+" 21:30");
  const request = new Date(req.body.data.reservation_date+" "+req.body.data.reservation_time);
  let message = "";
  if ( request < opening ){
    message = "Server: Please make a reservation after 10:30 AM";
  }else if ( request > closing ){
    message = "Server: Please make a reservation before 09:30 PM";
  }else if ( request < now ){
    message = "Server: The Reservation time you entered is passed.";
  }

  if (message.length){
    return next({
      status : 400,
      message,
    });
  }

  next();
}

async function create(req, res){
  const data = await service.create(req.body.data);  
  res.status(201).json({ data, });
}

async function reservationExists(req, res, next){
  //to be able to validate both for reservations read and tables update
  //tables update puts reservation_id into tables   
  const { reservation_id } = req.body.data ? req.body.data : req.params;
  if (!reservation_id){
    return next({
      status : 400,
      message : "reservation_id is missing"
    });
  }
  const found = await service.read(reservation_id);
  if (found){
    res.locals.reservation = found;
    return next();
  }
  next({
    status : 404,
    message : `Reservation id : ${reservation_id} not found in path ${req.originalUrl}`,
  });
}

function read(req, res){
  res.json({ data : res.locals.reservation});
}

module.exports = {
  create:[
    bodyHasData, 
    hasValidFirstName, 
    hasValidLastName, 
    hasValidPeopleNumber,
    hasValidMobile, 
    hasValidDateFormat, 
    hasValidTimeFormat,
    isNotTuesday,
    isFuture,
    isEligibleTime,
    asyncErrorBoundary(create),
  ],
  read:[asyncErrorBoundary(reservationExists), read],
  list:[hasValidDateFormat, asyncErrorBoundary(list)],
  reservationExists,
};
