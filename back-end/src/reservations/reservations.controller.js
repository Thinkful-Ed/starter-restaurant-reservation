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
//Check to see if the property provided exists in the data
function bodyHas(propertyName){
  return function(req,res,next){
      const {data = {}} = req.body;
      if(data[propertyName]){
          return next();
      }
      next({
          status: 400, 
          message: `Reservation must include a valid ${propertyName}`
      });
  };
  };
  
//Read reservation based on reservation id provided
async function read(req, res, next){
const {reservationId} = req.params;
const data = await service.read(reservationId);
res.json({data});
}

//Create reservations
async function create (req, res){
  const {data: {first_name, last_name, reservation_date, reservation_time, mobile_number, people}={}} = req.body;
  const newReservation = {
      first_name, 
      last_name, 
      reservation_date, 
      reservation_time, 
      mobile_number, 
      people
  };
  await service.create(newReservation);
  res.status(201).json({data: newReservation});
};

//Update existing reservation and requery reservation to return updated data
async function update(req, res) {
  const updatedReservation = { ...res.locals.reservation, ...req.body.data };
  await service.update(updatedReservation);
  const reservationToReturn = await service.read(
  res.locals.reservation.reservation_id
  );
 
  
  res.json({ data: reservationToReturn });
  }
module.exports = {
  list,
  create:[
  asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(reservationExists), read],
  reservationExists:[asyncErrorBoundary(reservationExists)],
  update:[
  asyncErrorBoundary(reservationExists), 
  asyncErrorBoundary(update)],
};
