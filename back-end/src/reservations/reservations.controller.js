const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const propertiesNotEmpty = require("../errors/propertiesNotEmpty");
const validDateAndNumber = require("../errors/validDateAndNumber");
const datePassed = require("../errors/datePassed")
const checkTuesday = require("../errors/checkTuesday")
const checkTimeFrame = require("../errors/checkTimeFrame")
/**
 * List handler for reservation resources
 */

async function reservationExist(req,res,next){
  const {reservation_id} = req.params;
  const data = await service.read(reservation_id);
  if(data){
    res.locals.reservation = data;
    next()
  }else{
    return next({status:404, message:`Reservation ${reservation_id} cannot be found.`})
  }
}

async function list(req, res) {
  const {date} = req.query;
  const data = await service.list(date);
  res.json({
    data: data,
  });
}

async function read(req,res,next){
  const {reservation_id} = req.params;
  const data = await service.read(reservation_id)
  res.json({
    data:data
  })
}

async function create(req,res,next){
  const newReservation = req.body.data;
  res.status(201).json({
    data:newReservation
  })
}


module.exports = {
  list:asyncErrorBoundary(list),
  read:[asyncErrorBoundary(reservationExist),asyncErrorBoundary(read)],
  create:[hasProperties('first_name','last_name','mobile_number','reservation_date','reservation_time','people'), propertiesNotEmpty('first_name','last_name','mobile_number','reservation_date','reservation_time'), validDateAndNumber,datePassed, checkTuesday,checkTimeFrame,asyncErrorBoundary(create)],
};

