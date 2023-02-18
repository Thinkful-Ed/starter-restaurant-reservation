const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../utils/hasProperties");
const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
);
const validateTypes = require("../utils/validateReservationInput");
const validateInputTypes = validateTypes();

async function searchPhoneNumber(req, res, next) {
  const { mobile_number } = req.query;

  if (mobile_number) {
    const listing = await service.search(mobile_number);

    res.status(200).json({ data: listing });
  } else {
    next();
  };
}

function getTodaysDate() {
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = todayDate.getMonth() + 1;
  const day = todayDate.getDate();
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

async function list(req, res, _next) {
  const { date } = req.query;

  !date ? (date = getTodaysDate()) : null;

  const listing = await service.list(date);
  const filtered = listing.filter((eachRes) => eachRes.status !== 'finished' && eachRes.status !== 'cancelled');

  res.json({ data: filtered });
}

async function create(req, res, next) {
  const reqStatus = req.body.data.status;

  if (reqStatus === 'seated' || reqStatus === 'finished') {
    next({ status: 400, message: `Status is ${reqStatus}` });
  }

  const data = await service.create(req.body.data);

  res.status(201).json({ data });
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;

  const foundReservation = await service.read(reservation_id);

  !foundReservation ? next({ status: 404, message: `Reservation with id ${reservation_id} not found` }) : res.locals.foundReservation = foundReservation;

  next();
}

async function read(req, res, _next) {
  const { reservation_id } = req.params;
  const foundReservation = await service.read(reservation_id);
  res.json({ data: foundReservation });
}

function validateStatusChange(req, res, next) {
  const { status, reservation_id } = res.locals.foundReservation;
  const updateStatus = req.body.data.status;

  switch (true) {
    case status === 'finished':
      next({ status: 400, message: `${reservation_id} has status: ${status}`});
      break;
    case updateStatus == 'unknown':
      next({ status: 400, message: `cannot enter a status of ${updateStatus}`});
      break;
    default:
      break;
  }
  next();
}

async function updateStatus(req, res, _next) {
  const updatedReservation = {
    ...res.locals.foundReservation,
    status: req.body.data.status,
  };

  const updated = await service.update(updatedReservation);

  res.status(200).json({ data: updated });
}

function validateReservationForUpdate(req, _res, next) {
  const {
    first_name,
    last_name,
    people,
    reservation_date,
    reservation_time,
    mobile_number,
  } = req.body.data;
  let errorField = "";

  switch (true) {
    case !first_name || first_name.length < 1:
      errorField = 'first_name';
      break;
    case !last_name || last_name.length < 1:
      errorField = 'last_name';
      break;
    case !mobile_number || mobile_number.length < 1:
      errorField = 'mobile_number';
      break;
    case !reservation_time:
      errorField = `reservation_time`;
      break;
    case !reservation_date:
      errorField = 'reservation_date';
      break;
    case people === 0:
      errorField = 'people';
      break;
    default:
      break;
  }

  if (errorField) {
    next({ status: 400, message: `${errorField} is invalid.` });
  }

  next();
}

async function update(req, res, _next) {
  const { foundReservation } = res.locals;

  const updatedReservation = {
    ...req.body.data,
    reservation_id: foundReservation.reservation_id,
  };

  const updated = await service.update(updatedReservation);

  res.status(200).json({ data: updated });
}

module.exports = {
  list: [
    asyncErrorBoundary(searchPhoneNumber), 
    asyncErrorBoundary(list),
  ],
  create: [
    hasRequiredProperties,
    validateInputTypes,
    asyncErrorBoundary(create),
  ],
  read: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(read)],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    validateStatusChange,
    asyncErrorBoundary(updateStatus),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    validateReservationForUpdate,
    validateInputTypes,
    asyncErrorBoundary(update),
  ],
};
