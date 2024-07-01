/**
 * List handler for reservation resources
 */
const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reservationExists(req, res, next) {
  const foundReservation = await reservationsService.read(req.params.reservation_id);
    if (foundReservation) {
    res.locals.reservation = foundReservation;
    return next();
  }
  next({
    status: 404,
    message: `reservation id not found: ${req.params.reservation_id}`,
  });
};

function hasReservationId(req,res,next) {
  const reservation_Id = req.params.reservation_id || req.body?.data?.reservation_id;
  if(reservation_Id){
    res.locals.reservation_id = reservation_Id
    return next()

  }else{
    next({
      status: 404,
      message: `reservation id not found: ${req.params.reservation_id}`,
    });

}
}

function read(req, res, next) {
  res.status(200).json({ data: res.locals.reservation });
};


function hasData(req, res, next) {
  console.log("hasData: ",req.body.data);
  if (req.body.data) {
    return next()
  }
  next({ status: 400, message: "body must have data property" })
}

function firstAndLastNameAreValid(req, res, next) {
  const regName =/^[a-zA-Z0-9'-. ]+$/;
  const { first_name, last_name } =req.body.data;
  console.log("firstAndLastNameAreValid - First Name:", first_name, " Last Name: ",last_name);
  if(!first_name ||!regName.test(first_name)){
    next({ status: 400, message: "Must include valid first_name."})
  }

  if(!last_name || !regName.test(last_name)){
    next({ status: 400, message: "Must include valid last_name." })
  }

  return next();
}

function mobileNumberIsValid(req, res, next) {
  const { mobile_number } = req.body.data;
  const regMobileNum = /^\d{3}-\d{3}-\d{4}$/
  console.log("mobileNumberIsValid: ", mobile_number);
  if(!regMobileNum.test(mobile_number)){
    next({ status: 400, message: "Must include valid mobile_number (ex. ddd-ddd-dddd)." })
  }
  return next();
}

function reservationDateIsValid(req, res, next) {
  const { reservation_date,reservation_time } = req.body.data;
  const regDate = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
  console.log("ReservationDateIsValid: ", reservation_date);
  if(!regDate.test(reservation_date)){
    next({ status: 400, message: "Must include valid reservation_date (ex. dd/mm/yyyy)." })
  }
   // No reservations on Tuesdays
   const day = new Date(reservation_date).getUTCDay();
   if (day === 2) {
    next({status: 400, message: "Restaurant is closed on Tuesdays." });
   }
 
   // No reservations in the past
   const formattedDate = new Date(`${reservation_date}T${reservation_time}`);
   if (formattedDate <= new Date()) {
     next({status: 400, message: "Reservation must be in the future." } );
   }
  return next();
}

async function update(req, res, next) {
  const { reservation_id } = req.params;
  // const { reservation_id } = req.body.da?ta;
  
  const data = await reservationsService.update(table_id, reservation_id);
  res.json({ data });
}

function reservationTimeIsValid(req, res, next) {
  const { reservation_time } = req.body.data;
  // const regTime = /^(\d{1,2}):(\d{2})(:00)?([ap]m)?$/;
  // const regTime = /^\d{2}:\d{2}$/;
  const regTime = /[0-9]{2}:[0-9]{2}/;
  console.log("ReservationTimeIsValid:", reservation_time);
  if(!regTime.test(reservation_time)){
    next({ status: 400, message: "Must include valid reservation_time (ex. hh:mm:[ap]m)." })
  }

// No reservations before 10:30AM or after 9:30PM
const hours = Number(reservation_time.split(":")[0]);
const minutes = Number(reservation_time.split(":")[1]);
if (hours < 10 || (hours === 10 && minutes < 30)) {
  next({status: 400, message: "Reservation must be after 10:30AM." });
}
if (hours > 21 || (hours === 21 && minutes > 30)) {
  next({status: 400, message: "Reservation must be before 9:30PM." });
}

   return next();
}


function peopleIsValid(req, res, next) {
  const { people } = req.body.data;
  console.log("peopleIsValid:", people);
  // Check if people is not a number
  if (!Number.isInteger(people)) {
    return next({ status: 400, message: "people must be an integer" });
  }

  // Check if people is less than 1
  if (people < 1) {
    return next({ status: 400, message: "Must have 1 or more people ." });
  }
  
  // If validation passes
  return next();
}


async function create(req, res) {
  const newReservation = await reservationsService.create(req.body.data);
  console.log("create - New Reservation: ",newReservation);
  res.status(201).json({
    data: newReservation
  });
}

async function list(req, res, next) {
  // console.log("req.query: ", req.query);
  const date = req.query.date
  // console.log("Date: ", date);
  const data = await reservationsService.list(date);
  // console.log("data: ",data);
  res.json({
       data
  });
}

module.exports = {
  update: [hasReservationId, asyncErrorBoundary(reservationExists), asyncErrorBoundary(update)],
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), read],
  create: [ hasData,firstAndLastNameAreValid,mobileNumberIsValid,reservationDateIsValid,reservationTimeIsValid, peopleIsValid, asyncErrorBoundary(create)],
};

