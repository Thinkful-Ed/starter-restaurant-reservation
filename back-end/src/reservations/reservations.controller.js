/**
 * List handler for reservation resources
 */
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("../reservations/reservations.services");

//List reservations based on is showing
async function list(req, res,next){
  const {date} = req.query;
  console.log(date);
  //add date to list reservations on specific day
  if(date){
       const data = await service.reservationsByDate(date);
       res.json({data});
  }else{
   const data = await service.list();
   res.json({data});
  }
  
}
//Check whether the reservation exists
async function reservationExists(req, res,next){
  const {reservationId} = req.params;
  const reservation = await service.read(reservationId);
  if(reservation){
      res.locals.reservation = reservation;
      return next();
  }
  return next({status: 404, message: `Reservation does not exist`})

}
//Read reservation based on reservation id provided
async function read(req, res, next){
const {reservationId} = req.params;
const data = await service.read(reservationId);
res.json({data});
}

function create(req, res){

}

module.exports = {
  list,
  create: asyncErrorBoundary(create), 
  read: [asyncErrorBoundary(reservationExists), read],
    reservationExists:[asyncErrorBoundary(reservationExists)],
};
