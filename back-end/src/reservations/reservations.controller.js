/**
 * List handler for reservation resources
 */
const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


function hasData(req, res, next) {

  console.log("Data: ",req.body.data);

  if (req.body.data) {
    return next()
  }
  next({ status: 400, message: "body must have data property" })
}

function hasFirstAndLastName(req, res, next) {
  const regName =/^[a-zA-Z'-. ]+$/;
  const { first_name, last_name } =req.body.data;
  console.log("First Name:", first_name, " Last Name: ",last_name);
  if(!regName.test(first_name)){
    next({ status: 400, message: "Must include valid first name."})
  }

  if(!regName.test(last_name)){
    next({ status: 400, message: "Must include valid last name." })
  }

  return next();
}

function hasMobileNumber(req, res, next) {
  const { mobile_number } = req.body.data;
  const regMobileNum = /^\d{3}-\d{3}-\d{4}$/
  console.log("mobile_number: ", mobile_number);
  if(!regMobileNum.test(mobile_number)){
    next({ status: 400, message: "Must include valid mobile number (ex. ddd-ddd-dddd)." })
  }
  return next();
}

function hasReservationDate(req, res, next) {
  const { reservation_date } = req.body.data;
  const regDate = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
  console.log("Reservation_date: ", reservation_date);
  if(!regDate.test(reservation_date)){
    next({ status: 400, message: "Must include valid reservation date (ex. dd/mm/yyyy)." })
  }
  return next();
}


function hasReservationTime(req, res, next) {
  const { reservation_time } = req.body.data;
  const regTime = /^(\d{1,2}):(\d{2})(:00)?([ap]m)?$/;
  console.log("Reservation_time", reservation_time);
  if(!regTime.test(reservation_time)){
    next({ status: 400, message: "Must include valid reservation time (ex. hh:mm:[ap]m)." })
  }
   return next();
}

  function hasPeople(req, res, next) {
    const { people } = req.body.data;
    console.log("People: ",people);
    if( people < 1){
      next({ status: 400, message: "Must have 1 or more people." })
    }
   return next();
  }



async function create(req, res) {
  const newReservation = await reservationsService.create(req.body.data);
  console.log("New Reservation: ",newReservation);
  res.status(201).json({
    data: newReservation
  });
}

async function list(req, res, next) {
  console.log("req.query: ", req.query);
  const date = req.query.dateOfReservations;
  console.log("Date: ", date);
  const data = await reservationsService.list(date);
  console.log("data: ",data);
  res.json({
       data
  });
}

module.exports = {
  list: asyncErrorBoundary(list),

  create: [hasData,hasFirstAndLastName, hasMobileNumber, hasReservationDate, hasReservationTime, hasPeople, asyncErrorBoundary(create)],
};
