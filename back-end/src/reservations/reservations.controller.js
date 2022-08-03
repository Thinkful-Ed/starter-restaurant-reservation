const reservationService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
// const { next } = require("../../../front-end/src/utils/date-time");
// const _ = require("lodash");

/**
 * List handler for reservation resources
 */
async function list(req, res, next) {
  // console.log("req.query", req.query);
  const { date, mobile_number } = req.query;

  const data = await reservationService.listByQuery(date, mobile_number);
  // console.log("data", data)

  // if (!data) {
  //   return next({
  //     status: 400,
  //     message: `No reservations were found`,
  //   });
  // }

  res.json({ data });
}

// async function listReservationsByMobileNumber(req, res){
//   const {mobile_number} = req.query;
//   let data;
//   if(mobile_numer){
//     data = await reservationService.listByMobileQuery(mobile_number);
//   }
//   else{
//     data = await reservationService.list();
//   }
//   res.json({data})
// }

async function hasOnlyValidProperties(req, res, next) {
  // console.log("hello valid properties")
  const VALID_PROPERTIES = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
    "status",
  ];
  // console.log("valid properties", VALID_PROPERTIES)
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")},`,
    });
  }
  next();
}

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

async function create(req, res, next) {
  // console.log("create")
  const status = req.body.data.status;
  if (status === "finished" || status === "seated") {
    return next({
      status: 400,
      message: `The status of this reservation is set to ${status}.`,
    });
  }
  await reservationService
    .create(req.body.data)
    .then((data) => {
      // console.log("data in reservations create", data)
      return res.status(201).json({ data });
    })
    .catch(next);
}

async function reservationExists(req, res, next) {
  let reservation_id = req.params.reservation_id;
  let reservation = await reservationService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;

    return next();
  }
  return next({
    status: 404,
    message: `Reservation id ${reservation_id}, could not be found.`,
  });
}

async function read(req, res) {
  const { reservation } = res.locals;
  res.json({ data: reservation });
}

async function validateIfReservationIsFinished(req, res, next) {
  const reservation_id = req.params.reservation_id;
  //const reservation = await reservation
  if (reservation_id) {
    if (res.locals.reservation.status === "finished") {
      return next({
        status: 400,
        message: `Sorry the reservation status is finished!`,
      });
    }
    return next();
  }
}

async function update(req, res) {
  const updatedReservation = req.body.data;

  res.json({
    data: await reservationService.update(updatedReservation, res.locals.reservation.reservation_id)
  });
}

async function youCanChangeTheStatus(req, res, next) {
  let reservation_id = req.params.reservation_id;
  let status = req.body.data.status;

  if (
    status !== "finished" &&
    status !== "seated" &&
    status !== "booked" &&
    status !== "cancelled"
  ) {
    return next({
      status: 400,
      message: `Status of ${status} is unknown`,
    });
  }

  await reservationService.theStatus(reservation_id, status);
  let changeStatus = await reservationService.read(reservation_id);

  // console.log("****************************");
  // console.log("changeStatus", changeStatus);

  if (changeStatus) {
    return res.json({ data: changeStatus });
  }

  return next({
    status: 400,
    message: `Reservation status for ${reservation_id}, could not be updated to ${status}.`,
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(hasRequiredProperties),
    asyncErrorBoundary(hasOnlyValidProperties),
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  youCanChangeTheStatus: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(validateIfReservationIsFinished),
    asyncErrorBoundary(youCanChangeTheStatus),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(hasRequiredProperties),
    asyncErrorBoundary(update),
  ],
};
