/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { response } = require("express");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people")

//DON'T FORGET TO REMOVE/EDIT ANY UNUSED next VARS


async function list(req, res, _next) {
  let { date }  = req.query;
  !date ? date = new Date() : null;
  res.json({
    data: await service.list(date)
  });
}


// THIS DOESN'T WORK
// function checkForm(req, res, next) {
//   const form = req.body.data;
//     // regular expression to match required date format
//     re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

//     if(form.reservation_date.value != '' && !form.reservation_date.match(re)) {
//       return next({status:400})
//     }

//     // regular expression to match required time format
//     re = /^\d{1,2}:\d{2}([ap]m)?$/;

//     if(form.reservation_time.value != '' && !form.reservation_time.match(re)) {
//       return next({status:400})
//     }
//     next()
//   }

function validate(req, res, next){
  const { data } = req.body;
  // regular expression to match required date format
  const reDate = /^(\d{4})-(\d{1,2})-(\d{1,2})/;
  // regular expression to match required time format
  const reTime = /^\d{1,2}:\d{2}([ap]m)?$/;
  
  if(typeof(data.people) !== 'number'){
    next({ status:400, message: 'people must be a number.'})
  };

  if(!data.reservation_date.match(reDate)) {
    next({ status:400, message: 'Please enter a valid reservation_date.'})
  };

  if(!data.reservation_time.match(reTime)) {
    next({ status:400, message: 'Please enter a valid reservation_time.'})
  };

  next();
}


async function create(req, res, next) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}




module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasRequiredProperties, validate, asyncErrorBoundary(create)],

};
