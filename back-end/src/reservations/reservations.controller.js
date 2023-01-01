/**
 * List handler for reservation resources
 */
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("../reservations/reservations.services");
const moment = require("moment");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);
const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  //"status",
];

//List reservations based on date
async function list(req, res,next){
  const {date} = req.query;
  
  //add date to list reservations on specific day
  if(date){
       const data = await service.reservationsByDate(date);
       //const sorted = data.sort((a, b)=> a.reservation_time - b.reservation_time);
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
  return next({status: 404, message: `Reservation id ${reservationId} does not exist`})

}

//Check to see if the property provided exists in the data
function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  if (Object.keys(data).length === 0) {
    return next({
      status: 400,
      message: "data is missing",
    });
  }
  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalids fields: ${invalidFields.join(", ")}`,
    });
  }
  next();
}

  //Check if has valid first name
  function hasFirstName(req, res, next){
    const { data={}  } = req.body;
    const fname = data["first_name"];
    if (!fname || fname === "") {
      return next({
        status: 400,
        message: `Invalid first_name`,
      });
    }
    next();
  }
  //Check if has valid last name
  function hasLastName(req, res,next){
    const { data = {}  } = req.body;
    const lname = data["last_name"];
    if (!lname || lname === "") {
      return next({
        status: 400,
        message: `Invalid last_name`,
      });
    }
    next();
  }

  //Check if has valid mobile number
  function hasMobileNumber(req, res,next){
    const { data = {} } = req.body;
    const mobile = data["mobile_number"];
    if (!mobile || mobile === "") {
      return next({
        status: 400,
        message: `Invalid mobile_number`,
      });
    }
    next();
  }
//Check if has time
function hasTime(req, res,next){
  const { data = {} } = req.body;
  const reservation_time = data["reservation_time"];
  if (!reservation_time || reservation_time === "") {
    return next({
      status: 400,
      message: `Invalid reservation_time`,
    });
  }
  next();
}
//Check to see if people is valid
function hasValidPeople(req, res,next){
  const {data:{people} = {}} = req.body;
  const peopleAsNumber = people;
  if (peopleAsNumber % 1 !== 0) {
    return next({
    status: 400, 
    message: `people must be a number`
});
  }
  if (peopleAsNumber === 0 ) {
  return next({
  status: 400, 
  message: `people must not equal zero`
});
}
next();
};


//Read reservation based on reservation id provided
async function read(req, res, next){
const {reservationId} = req.params;
const data = await service.read(reservationId);
res.json({data});
}


//Combined check if date is valid
function hasValidDate(req, res, next) {
  const { data: { reservation_date, reservation_time } = {} } = req.body;
  const date = new Date(`${reservation_date}T${reservation_time}`);
  const today = new Date();
  if (today.getTime() > date.getTime()) {
    return next({
      status: 400,
      message: "reservation_date must be a future date",
    });
  }
  if (date.getDay() === 2) {
    return next({
      status: 400,
      message: "Restaurant is closed on Tuesday",
    });
  }
  if (moment(reservation_date, "YYYY-MM-DD", true).isValid()) {
    return next();
  }
  next({
    status: 400,
    message: "reservation_date is not valid",
  });
}

//Combined check if date is valid
function hasValidTime(req, res, next) {
  const { data: { reservation_time } = {} } = req.body;
  
  if (reservation_time < "10:30" || reservation_time > "21:30") {
    return next({
      status: 400,
      message: "reservation_time not during business hours",
    });
  }
  if (moment(reservation_time, "HH:mm", true).isValid()) {
    return next();
  }
  next({
    status: 400,
    message: "reservation_time is not valid",
  });
}
//Create reservations
async function create (req, res){
  const data = await service.create(req.body.data);
  res.status(201).json({data});
};

//Update existing reservation 
async function update(req, res) {
  const updatedReservation = { ...res.locals.reservation, ...req.body };
  const data = await service.update(updatedReservation);  
  res.status(201).json({ data });
  }

  //Update reservation status
async function updateStatus(req, res) {
  const {reservationId} = req.params;
  const {data: {status}} = req.body;
  const data = await service.statusUpdate(reservationId, status);  
  res.status(201).json({ data });
  }

module.exports = {
  list,
  create:[ 
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidPeople,
    hasValidDate,
    hasValidTime, 
    asyncErrorBoundary(create)],
  read:[
    asyncErrorBoundary(reservationExists), 
    read],
  reservationExists:[
    asyncErrorBoundary(reservationExists)],
  update:[
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidPeople,
    hasValidDate,
    hasValidTime,  
    asyncErrorBoundary(reservationExists), 
    asyncErrorBoundary(update)],
    statusUpdate:[
      asyncErrorBoundary(reservationExists), 
      asyncErrorBoundary(updateStatus)
    ]
};
