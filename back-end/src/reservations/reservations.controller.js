const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const propertiesNotEmpty = require("../errors/propertiesNotEmpty");
const validDateAndNumber = require("../errors/validDateAndNumber");
const datePassed = require("../errors/datePassed");
const checkTuesday = require("../errors/checkTuesday");
const checkTimeFrame = require("../errors/checkTimeFrame");
const checkReservationStatus = require("../errors/checkReservationStatus");
const unknownStatus = require("../errors/unknownStatus");
const validStatus = require("../errors/validStatus");

/**
 * List handler for reservation resources
 */

async function currentStatus(req, res, next) {
  const {reservation_id} = req.params;
  const data = await service.read(reservation_id);
  if (data.status === "finished") {
    next({
      status: 400,
      message: `this reservation status is ${data.status}`,
    });
  } else {
    next();
  }
}

async function reservationExist(req, res, next) {
  const {reservation_id} = req.params;
  const data = await service.read(reservation_id);
  if (data) {
    res.locals.reservation = data;
    next();
  } else {
    return next({
      status: 404,
      message: `Reservation ${reservation_id} cannot be found.`,
    });
  }
}

async function list(req, res) {
  const methodName = "list";
  req.log.debug({__filename, methodName, body: req.body});
  const {date} = req.query;
  const {mobile_number} = req.query;
  if (date) {
    const data = await service.list(date);
    res.json({
      data: data,
    });
  } else if (mobile_number) {
    const data = await service.readMobileNumber(mobile_number);
    res.json({
      data: data,
    });
  } else {
    let day = new Date();
    let today = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(day.getDate()).padStart(2, "0")}`;
    const data = await service.list(today);
    res.json({
      data: data,
    });
  }
}

async function read(req, res, next) {
  const methodName = "read";
  req.log.debug({__filename, methodName, body: req.body});
  const {reservation_id} = req.params;
  const data = await service.read(reservation_id);
  res.json({
    data: data,
  });
}

async function create(req, res, next) {
  const methodName = "create";
  req.log.debug({__filename, methodName, body: req.body});
  const newReservation = req.body.data;
  const data = await service.create(newReservation);
  res.status(201).json({
    data: data,
  });
  req.log.trace({__filename, methodName, valid: true});
}

async function update(req, res, next) {
  const methodName = "update";
  req.log.debug({__filename, methodName, body: req.body});
  const {reservation_id} = req.params;
  const data = await service.read(reservation_id);
  const {status} = req.body.data;
  const updatedData = {...data, status: status};
  await service.update(updatedData);
  res.status(200).json({data: updatedData});
}

async function updateReservation(req, res, next) {
  const {reservation_id} = req.params;
  const reservationData = req.body.data;
  const data = await service.read(reservation_id);
  const updatedData = {...data, ...reservationData};
  await service.update(updatedData);
  res.status(200).json({data: updatedData});
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExist), asyncErrorBoundary(read)],
  create: [
    hasProperties(
      "first_name",
      "last_name",
      "mobile_number",
      "reservation_date",
      "reservation_time",
      "people"
    ),
    propertiesNotEmpty(
      "first_name",
      "last_name",
      "mobile_number",
      "reservation_date",
      "reservation_time"
    ),
    validDateAndNumber,
    datePassed,
    checkTuesday,
    checkTimeFrame,
    checkReservationStatus,
    asyncErrorBoundary(create),
  ],
  update: [reservationExist, unknownStatus, currentStatus, validStatus, update],
  updateReservation: [
    reservationExist,
    hasProperties(
      "first_name",
      "last_name",
      "mobile_number",
      "reservation_date",
      "reservation_time",
      "people"
    ),
    propertiesNotEmpty(
      "first_name",
      "last_name",
      "mobile_number",
      "reservation_date",
      "reservation_time"
    ),
    validDateAndNumber,
    updateReservation,
  ],
};
//don't need to specify every key value
//"first_name":reservationData.first_name, "last_name":reservationData.last_name,"mobile_number":reservationData.mobile_number,"reservation_date":reservationData.reservation_date,"reservation_time":reservationData.reservation_time,"people":reservationData.people
