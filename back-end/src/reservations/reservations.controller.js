const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/requiredProperties");

function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: "Body must have data property." });
}

const REQUIRED_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
]

const hasRequiredProperties = hasProperties(...REQUIRED_PROPERTIES);

function validDate(req, res, next) {
  const date = req.body.data.reservation_date;
  const valid = new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
  if (valid) {
    return next();
  }
  next({ status: 400, message: "reservation_date must be valid date." });
}

function validTime(req, res, next) {
  const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  const time = req.body.data.reservation_time;
  const valid = time.match(regex);
  if (valid) {
    return next();
  }
  next({ status: 400, message: "reservation_time must be valid time." });
}

function validPeople(req, res, next) {
  const people = req.body.data.people;
  if (people < 1 || typeof people !== "number") {
    return next({ status: 400, message: "Valid people property required" });
  }
    return next();
}

function isNotOnTuesday(req, res, next) {
  const { reservation_date } = req.body.data;
  const [year, month, day] = reservation_date.split("-");
  const date = new Date(`${month} ${day}, ${year}`);
  res.locals.date = date;
  if (date.getDay() === 2) {
    return next({ status: 400, message: "Location is closed on Tuesdays" });
  }
  next();
}

function isInTheFuture(req, res, next) {
  const date = res.locals.date;
  const today = new Date();
  if (date < today) {
    return next({ status: 400, message: "Must be a future date" });
  }
  next();
}

function isWithinValidHours(req, res, next) {
  const reservation = req.body.data;
  const [hour, minute] = reservation.reservation_time.split(":");
  if (hour < 10 || hour > 21) {
    return next({
      status: 400,
      message: "Reservation must be made within business hours",
    });
  }
  if ((hour < 11 && minute < 30) || (hour > 20 && minute > 30)) {
    return next({
      status: 400,
      message: "Reservation must be made within business hours",
    });
  }
  next();
}

async function validateReservationId(req, res, next) {
	const { reservation_Id } = req.params;
	const reservation = await reservationsService.read(reservation_Id);
	if (!reservation) {
		return next({
			status: 404,
			message: `Reservation ID: ${reservation_Id} - Not Found`,
		});
	} else {
		res.locals.reservation = reservation;
		return next();
	}
}

function checkIfBooked(req,res,next){
  const {status} = req.body.data
  if (status === "booked"){
    return next()
  }
  if (status === "seated" || status === "finished"){
  return next({status:400,message:`Status cannot be ${status}`})
  }
  return next()
}

function verifyStatus(req, res, next){
	const validStatusList = ["booked","seated","finished", "cancelled"]
	const {status} = req.body.data

	const bodyStatus = res.locals.reservation.status
	if (!validStatusList.includes(status)){
		return next({status:400,message:`Status:${status} is not valid`})
	}
	if (bodyStatus === "finished"){
		return next({status:400,message:`Cannot change status from finished.`})
	}
	return next()
}

//CRUD Functions

async function list(req, res, next) {
  const { date, currentDate, mobile_number } = req.query;
  if(date) {
    const data = await reservationsService.listByDate(date);
    res.json({ data });
  } else if (currentDate) {  
    const data = await reservationsService.listByDate(currentDate);
  } else if(mobile_number){
    const data = await reservationsService.search(mobile_number);
    res.json({ data });
  } else {
    const data = await reservationsService.list();
    res.json({ data });
  }
}

async function create(req, res, next) {
  let reservation = req.body.data;
  reservation = { ...reservation, status: "booked" };
  const { reservation_id } = await reservationsService.create(reservation);
  reservation.reservation_id = reservation_id;
  res.status(201).json({ data: reservation });
}

async function read(req, res, next) {
	const responseData = res.locals.reservation;
	res.status(200).json({ data: responseData });
}

async function updateStatus(req,res,next){
	const currentData = res.locals.reservation
	const updatedStatus = req.body.data
	const updatedReservation = {...currentData,...updatedStatus}
	const response = await reservationsService.updateStatus(updatedReservation,updatedReservation.reservation_id)
	res.status(200).json({data:response})
}

async function updateReservation(req, res, next) {
  const reservation = req.body.data;
  const newReservation = await reservationsService.updateReservation(
    reservation
  );
  res.status(200).json({ data: newReservation });
}
 
module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasData,
          hasRequiredProperties,
          validDate,
          validTime,
          validPeople,
          isNotOnTuesday,
          isInTheFuture,  
          isWithinValidHours,
          checkIfBooked,
        asyncErrorBoundary(create)],
  read: [validateReservationId, 
          asyncErrorBoundary(read)],
  updateStatus: [validateReservationId,
          verifyStatus,
          asyncErrorBoundary(updateStatus)],
  updateReservation: [validateReservationId,
          hasRequiredProperties,
          validDate,
          validTime,
          validPeople,
          isNotOnTuesday,
          isInTheFuture,
          isWithinValidHours,
          checkIfBooked,
          asyncErrorBoundary(updateReservation)],
};