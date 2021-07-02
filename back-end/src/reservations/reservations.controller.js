const { request } = require("express");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");


/**
 * List handler for reservation resources
 */
async function list(req, res) {
  req.log.debug({__filename, methodName:"list"});
  const { date } = req.query || "";
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
      message : "Must have a valid first_name",
    });
  }
  next();
}
function hasValidLastName(req, res, next){
  const { last_name = "" } = req.body.data;
  if ( !last_name.trim().length ){
    return next({
      status : 400,
      message : "Must have a valid last_name",
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
      message : "Must have a valid mobile_number",
    });
  }
  next();
}

// function hasValidMobile(req, res, next){
//   req.log.debug({__filename, methodName:"hasValidMobile" });
//   const { mobile_number="" } = req.body.data;
//   if ( mobile_number.trim().length !== 10 || isNaN(mobile_number)){
//     req.log.trace({__filename, methodName:"hasValidMobile", mobile_number});
//     return next({
//       status : 400,
//       message : "Must have a valid mobile_number",
//     });
//   }
//   next();
// }

function hasValidPeopleNumber(req, res, next){
  const { people } = req.body.data;
  if ( !people || typeof people !== "number" || isNaN(people) || people < 1 ){
    return next({
      status : 400,
      message : "Number of people must be number greater than 1"
    });
  }
  next();
}

function hasValidDateFormat(req, res, next){
  const dateFormat = /\d{4}-\d{2}-\d{2}/g;
  const { reservation_date="" } = req.body.data;
  if ( !reservation_date.match(dateFormat) ){
    return next({
      status : 400,
      message : "reservation_date format must be YYYY-MM-DD"
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
      message : "reservation_time format must be HH:MM:SS"
    });
  }
  next();
}

async function create(req, res){
  const data = await service.create(req.body.data);  
  res.status(201).json({ data, });
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
    asyncErrorBoundary(create),
  ],
  list,
};
