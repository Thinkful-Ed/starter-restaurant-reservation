const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reservationExists(req, res, next) {
  const foundReservation = await reservationsService.read(
    req.params.reservationId
  );
  if (foundReservation) {
    res.locals.reservation = foundReservation;
    return next();
  }
  next({ status: 404, message: `Reservation ${req.params.reservationId} cannot be found.` });
}

function validateReservationBody(req, res, next) {
  const {
    data: {
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
      status,
    } = {},
  } = req.body;
  let message = [];


  if (!first_name || first_name === "") {
    message.push("first_name is a required field.");
  }
  if (!last_name || last_name === "") {
    message.push("last_name is a required field.");
  }
  if (!mobile_number || mobile_number === "") {
    message.push("mobile_number is a required field.");
  }
  if (
    !reservation_date ||
    reservation_date === "" ||
    reservation_date === "not-a-date"
  ) {
    message.push("reservation_date is a required field.");
  }
  if (
    !reservation_time ||
    reservation_time === "" ||
    reservation_time === "not-a-time"
  ) {
    message.push("reservation_time is a required field.");
  }
  if (!people || people === "" || typeof people !== "number" || people < 1) {
    message.push("people is a required field.");
  }
  if(status === 'seated' || status === 'finished'){
    message.push(`Status ${status} must be 'booked'.`)
  }
  

  if (message.length > 0) {
    return next({
      status: 400,
      message: message[0],
    });
  } else {
    next();
  }
}

function reservationDayIsNotTuesday(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  let day = new Date(`${reservation_date} ${reservation_time}`);
  if (day.getDay() !== 2) {
    next();
  } else {
    return next({
      status: 400,
      message: "Restaurant is closed on Tuesdays, please select another day.",
    });
  }
}

function reservationTimeIsNotPast(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  let now = Date.now();
  let bookedTime = Date.parse(`${reservation_date} ${reservation_time} EST`);
  if (bookedTime > now) {
    return next();
  } else {
    return next({
      status: 400,
      message: "reservation_time must be made in the future.",
    });
  }
}

function reservationTimeIsDuringBusinessHours(req, res, next) {
  const { reservation_time } = req.body.data;
  if (reservation_time < "10:30:00" || reservation_time > "21:30:00") {
    next({
      status: 400,
      message: "Reservation time must be made between 10:30 am and 9:30 pm.",
    });
  } else {
    return next();
  }
}

function reservationIsNotSeated(req, res, next){
  if (res.locals.reservation.status === "booked"){
   return next();
  } else {
    next({
      status: 400,
      message: "Reservation is already seated.",
    });
  }
}

function validateStatus(req, res, next){
  let status = req.body.data.status;
  if(status !== "seated" && status !== "booked" && status !== "cancelled" && status !== "finished"){
    next({
      status: 400,
      message:`Status ${status} is incorrect.`,
    });
  }
  if(res.locals.reservation.status != 'booked'){
    next({
      status: 400,
      message:`Reservation status is ${res.locals.reservation.status}. A finished reservation cannot be updated`,
    });
  } else {
   return next();
  }
}

async function updateStatus(req, res, next){
  const resId = res.locals.reservation.reservation_id;
  const newStatus = req.body.data.status;
  const updatedTable = await reservationsService.update(resId, newStatus);
  res.status(200).json({ data: updatedTable });
}

async function list(req, res) {
  const { date } = req.query;
  let data;
  if (date) {
    data = await reservationsService.listByDate(date);
  } else {
    data = await reservationsService.list();
  }
  res.json({
    data: data,
  });
}

async function create(req, res, next) {
  const {
    data: {
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
      status
    } = {},
  } = req.body;
  const newReservation = {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    status
  };
  const createdReservation = await reservationsService.create(newReservation);
  res.status(201).json({ data: createdReservation });
}

async function read(req, res) {
  res.status(200).json({ data: res.locals.reservation });
}

async function update(req, res, next){
const updatedRes = await reservationsService.update(res.locals.reservation.reservation_id, "seated");
res.status(200).json({ data: updatedRes });
}

module.exports = {
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  list: asyncErrorBoundary(list),
  create: [
    validateReservationBody,
    reservationDayIsNotTuesday,
    reservationTimeIsNotPast,
    reservationTimeIsDuringBusinessHours,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    reservationIsNotSeated,
    asyncErrorBoundary(update)
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    validateStatus,
    asyncErrorBoundary(updateStatus)
  ]
};
