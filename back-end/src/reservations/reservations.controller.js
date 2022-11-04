const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
//proper fields validation
const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
]
const hasRequiredProperties = hasProperties(VALID_PROPERTIES);

function hasOnlyValidProperties(req, res, next) {
  const {data = {} } = req.body;
  if (data.status == "finished" || data.status == "seated") {
    return next({
      status: 400,
      message: `status ${data.status} is not valid`
    })
  }
  if (data.people && typeof data.people !== "number") {
    return next({
      status: 400,
      message: `Number of people is not valid.`,
    });
  }
  next();
}
//Reservation exists
async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
const data = await service.read(reservation_id);
if (data) {
  res.locals.reservation = data;
  return next();
}
return next({
  status: 404,
  message: `reservation_id ${reservation_id} does not exist`,
});
}
// async function reservationExists(req, res, next) {
//   const {reservation_Id} = req.params;
//   const reservation = await service.read(reservation_Id);
//   if (reservation) {
//   res.locals.reservation = reservation;
//   return next();
// }
//   next({
//     status: 404,
//     message: `reservation_id ${reservation_Id} does not exist.`
//       })
// }


//date and time validation
function validDate(req, res, next) {
  const { data = {} } = req.body;
  if (!data["reservation_date"].match(/\d{4}-\d{2}-\d{2}/)) {
    return next({
      status: 400,
      message: `Selected reservation_date ${data["reservation_date"]} is not valid.`,
    });
  }
  else if (new Date(data["reservation_date"]).getDay() + 1 === 2) {
    next({
      status: 400,
      message: `Reservations are closed on Tuesdays.`,
    });
  }
  else if (Date.parse(data["reservation_date"]) < Date.now()) {
    next({
      status: 400,
      message: `You've selected a day in the past. Please reserve a future date.`,
    });
  }
  next();
}

function validTime(req, res, next) {
  const reservation = req.body.data;
  const [hour, minute] = reservation.reservation_time.split(":");
  const min = minute/60;
  const time = hour + min;
  const openHour = 100.5;
  const closeHour = 210.5;
  if (!Number(time)) {
    return next({
      status:400,
      message: "reservation_time"
    })
  }
  if (time < openHour|| time > closeHour) {
    return next({
      status: 400,
      message: `${hour}, ${minute}, ${time}: Reservation must be made within reasonable business hours: 10:30 AM - 9:30 PM.`
    })
  }
  next();
}

//validates status
function validateStatus(req, res, next) {
  const reservation = res.locals.reservation;
  const { data = {} } = req.body;
  const status = data.status;
  if (reservation.status === "finished") {
    return next({ status: 400, message: `Reservation is already finished` });
  }

  const validStatuses = ["finished", "booked", "seated", "cancelled"];
  if (validStatuses.includes(status)) {
    return next();
  }
  return next({ status: 400, message: `Invalid or unknown status: ${status}` });
}

function validateUpdateStatus(req, res, next) {
  const { data = {} } = req.body;
  const { status } = data;
  if (status == "booked" || status == undefined) {
    return next();
  }
  return next({ status: 400, message: `Invalid status: ${status}` });
}

// function validateStatus(req, res, next) {
//   const {origStatus} = res.locals.reservation; 
//   const {status} = req.body.data;
//   const validStatuses = ["booked", "seated", "finished", "cancelled"]
//   if (origStatus === "finished") {
//     return next ({
//       status: 400,
//       message: "reservation is already finished."
//     })
//   }
//   if (!validStatuses.includes(status)) {
//     return next({
//       status: 400,
//       message: "cannot alter reservation with status invalid/unknown."
//     })
//   }
//   next();
// }

//lists reservations by date
async function list(req, res) {
 let date = new Date().toJSON().slice(0,10);
  if (req.query.date) {
  date = req.query.date;
  data = await service.getReservationsByDate(date);
 }
 if (req.query.mobile_number) {
  mobile_number = req.query.mobile_number;
  data = await service.getReservationsByNumber(mobile_number)
 }
res.json({ data })
}

//to get reservation by ID
async function read(req, res, next) {
  const { reservation_id } = req.params;
  const data = await service.read(reservation_id);
  if (data) {
      res.json({ data });
  } else {
      return next({status: 404, message: `Reservation ${reservation_id} cannot be found.`});
  }
}


//to create a reservation
async function create(req, res) {
  const reservation = await service.create(req.body.data);
  res.status(201).json({data: reservation})
}

async function updateStatus(req, res) {

  const { status } = req.body.data;
  const reservation = res.locals.reservation;
  reservation.status = status;
  const data = await service.updateStatus(reservation);
  res.json({ data });
  // const {reservation_Id} = req.params;
  // const {status} = req.body.data;
  // const result = await service.update(reservation_Id, status);
  // res.json({data: result});
}

async function update(req, res) {
  const reservation = {...req.body.data};
  reservation.reservation_id = res.locals.reservation.reservation_id;
  const data = await service.update(reservation);
  res.json({data})
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: asyncErrorBoundary(read),
  create: [hasRequiredProperties, hasOnlyValidProperties, validDate, validTime, asyncErrorBoundary(create)],
  updateStatus: [asyncErrorBoundary(reservationExists), validateStatus, asyncErrorBoundary(updateStatus)],
  update: [hasRequiredProperties, hasOnlyValidProperties, validDate, validTime, validateUpdateStatus, asyncErrorBoundary(reservationExists), asyncErrorBoundary(update)]
};
