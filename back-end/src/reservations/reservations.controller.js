/**
 * List handler for reservation resources
 */
const reservationsService = require('./reservations.service.js');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

function hasProperties(...properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    try {
      properties.forEach((property) => {
        if (!data[property]) {
          const error = new Error(`A '${property}' property is required.`);
          error['status'] = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

const hasRequiredProperties = hasProperties(
  'first_name',
  'last_name',
  'mobile_number',
  'reservation_date',
  'reservation_time',
  'people'
);

const VALID_PROPERTIES = [
  'first_name',
  'last_name',
  'mobile_number',
  'reservation_date',
  'reservation_time',
  'people',
  'status',
  'reservation_id',
  'created_at',
  'updated_at',
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(', ')}`,
    });
  }
  next();
}

function hasValidDate(req, res, next) {
  const { data = {} } = req.body;
  const date = data['reservation_date'];
  const time = data['reservation_time'];
  const formattedDate = new Date(`${date}T${time}`);
  const day = new Date(date).getUTCDay();

  if (isNaN(Date.parse(data['reservation_date']))) {
    return next({
      status: 400,
      message: `Invalid reservation_date`,
    });
  }
  if (day === 2) {
    return next({
      status: 400,
      message: `Restaurant is closed on Tuesdays`,
    });
  }
  if (formattedDate <= new Date()) {
    return next({
      status: 400,
      message: `Reservation must be in the future`,
    });
  }
  next();
}

function hasValidTime(req, res, next) {
  const { data = {} } = req.body;
  const time = data['reservation_time'];

  if (!/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(time)) {
    next({
      status: 400,
      message: `Invalid reservation_time`,
    });
  }

  const hours = Number(time.split(':')[0]);
  const minutes = Number(time.split(':')[1]);
  if (hours < 10 || (hours === 10 && minutes < 30)) {
    next({
      status: 400,
      message: `Reservation must be after 10:30AM`,
    });
  }
  if (hours > 21 || (hours === 21 && minutes > 30)) {
    next({
      status: 400,
      message: `Reservation must be before 9:30PM`,
    });
  }
  next();
}

function hasValidNumber(req, res, next) {
  const { data = {} } = req.body;

  if (data['people'] === 0 || !Number.isInteger(data['people'])) {
    return next({
      status: 400,
      message: `Invalid number of people`,
    });
  }
  next();
}

function hasValidStatus(req, res, next) {
  const { status } = req.body.data;
  const currentStatus = res.locals.reservation.status;

  if (currentStatus === 'finished' || currentStatus === 'cancelled') {
    return next({
      status: 400,
      message: `Reservation status is finished`,
    });
  }
  if (
    status === 'booked' ||
    status === 'seated' ||
    status === 'finished' ||
    status === 'cancelled'
  ) {
    res.locals.status = status;
    return next();
  }
  next({
    status: 400,
    message: `Invalid status: ${status}`,
  });
}

function isBooked(req, res, next) {
  const { status } = req.body.data;

  if (status && status !== 'booked') {
    return next({
      status: 400,
      message: `Invalid status: ${status}`,
    });
  }
  next();
}

async function reservationExists(req, res, next) {
  const reservation_id =
    req.params.reservation_id || (req.body.data || {}).reservation_id;

  const reservation = await reservationsService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservation_id} cannot be found.`,
  });
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const date = req.query.date;
  const mobile_number = req.query.mobile_number;
  const data = await (date
    ? reservationsService.list(date)
    : reservationsService.search(mobile_number));
  res.json({ data });
}

async function read(req, res) {
  const data = res.locals.reservation;
  res.json({ data });
}

async function create(req, res) {
  if (req.body.data == null) return res.status(400);

  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res) {
  const updatedRes = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await reservationsService.update(updatedRes);
  res.status(200).json({ data });
}

async function updateStatus(req, res) {
  const { status } = res.locals;
  const { reservation_id } = res.locals.reservation;
  const data = await reservationsService.updateStatus(reservation_id, status);
  res.status(200).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [reservationExists, asyncErrorBoundary(read)],
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidDate,
    hasValidTime,
    hasValidNumber,
    isBooked,
    asyncErrorBoundary(create),
  ],
  update: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidDate,
    hasValidTime,
    hasValidNumber,
    reservationExists,
    hasValidStatus,
    asyncErrorBoundary(update),
  ],
  updateStatus: [
    reservationExists,
    hasValidStatus,
    asyncErrorBoundary(updateStatus),
  ],
  reservationExists,
};
