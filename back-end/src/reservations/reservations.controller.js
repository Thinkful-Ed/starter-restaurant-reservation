const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const propertiesNotEmpty = require("../errors/propertiesNotEmpty");
const validDateAndNumber = require("../errors/validDateAndNumber");
const datePassed = require("../errors/datePassed")
const checkTuesday = require("../errors/checkTuesday")
const checkTimeFrame = require("../errors/checkTimeFrame")
const checkReservationStatus = require("../errors/checkReservationStatus");
const unknownStatus = require("../errors/unknownStatus")
const validStatus = require("../errors/validStatus")

/**
 * List handler for reservation resources
 */

async function currentStatus(req,res,next){
  const {reservation_id} = req.params;
  const data = await service.read(reservation_id);
  if(data.status === 'finished'){
    next({
      status:400,
      message:`this reservation status is ${data.status}`
    })
  }else{
    next();
  }
}

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
  const {mobile_number} = req.query;
  if(date){

    const data = await service.list(date);
    res.json({
      data: data,
    });
  };
  if(mobile_number){
    const data = await service.readMobileNumber(mobile_number);
    res.json({
      data:data
    })
  }
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

async function update(req,res,next){
  const {reservation_id} = req.params;
  const data = await service.read(reservation_id);
  const {status} = req.body.data;
  const updatedData = {...data,status:status};
  res.status(200).json({data:updatedData})
}

module.exports = {
  list:asyncErrorBoundary(list),
  read:[asyncErrorBoundary(reservationExist),asyncErrorBoundary(read)],
  create:[hasProperties('first_name','last_name','mobile_number','reservation_date','reservation_time','people'),propertiesNotEmpty('first_name','last_name','mobile_number','reservation_date','reservation_time'),validDateAndNumber,datePassed,checkTuesday, checkTimeFrame,checkReservationStatus,asyncErrorBoundary(create)],
  update:[reservationExist,unknownStatus,currentStatus,validStatus, update]
};

