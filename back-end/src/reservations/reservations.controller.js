/**
 * List handler for reservation resources
 */
const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { DatabaseError } = require("pg");

//--------------------------VALIDATION MIDDLEWARE STARTS-------------------------------------
// Checks to see if there is an existing reservation in database.
// If reservation exists initialize as res.locals.reservation
const reservationExists = async (req, res, next) => {
  const { reservation_id } = req.params;
  const reservation = await reservationsService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservation_id ? reservation_id : ""} not found.`,
  });
};

// validation code below
const VALID_REQUIRED_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

// reg exp used with test method to check that the string returned from the database is in the correct format
const regExDate = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
const regExTime = /[0-9]{2}:[0-9]{2}/;

// validation middleware checks to see if req.body meets the following requirements
const hasValidProperties = (req, res, next) => {
  const { data = {} } = req.body;

  // checks to see if the values in ValidProperties are included in the data. if any of the values isn't included returns a status and error message.
  VALID_REQUIRED_PROPERTIES.forEach((property) => {
    if (!data[property]) {
      return next({
        status: 400,
        message: `You must include a ${property} property.`,
      });
    }

    // checks to make sure that the value for people is a number. If the value isn't a number status and error message is returned.
    if (property === "people" && !Number.isInteger(data.people)) {
      return next({
        status: 400,
        message: `Your party size ${property} must be at least 1.`,
      });
    }

    // If reservation date returned from the database does not match the reg exp return the error and status message.
    if (
      property === "reservation_date" &&
      !regExDate.test(data.reservation_date)
    ) {
      return next({
        status: 400,
        message: `Date ${property} must match the YYYY-MM-DD format`,
      });
    }

    // If reservation time returned from the database does not match the reg exp return the error and status message.
    if (
      property === "reservation_time" &&
      !regExTime.test(data.reservation_time)
    ) {
      return next({
        status: 400,
        message: `Time ${property} must match the HH:MM format.`,
      });
    }
  });

  next();
};

const futureDateValidation = (req, res, next) => {
  const {
    data: { reservation_date, reservation_time },
  } = req.body;
  let now = Date.now();
  let bookedTime = Date.parse(`${reservation_date} ${reservation_time} EST`);
  if (bookedTime > now) {
    return next();
  } else {
    return next({
      status: 400,
      message: "Reservations must be made in the future.",
    });
  }
};

const validTableStatuses = ["seated", "booked", "cancelled", "finished"];

// This validation middleware makes sure that the posted data meets certain requirements.
const dateValidation = (req, res, next) => {
  const { data = {} } = req.body;

  // creates a new date using the reservation date and time
  const date = new Date(`${data.reservation_date} ${data.reservation_time}`);

  if (date.getDay() === 2) {
    return next({
      status: 400,
      message: `Our restaurant is closed on Tuesdays.`,
    });
  }

  if (data.reservation_time <= "10:30" || data.reservation_time >= "21:30") {
    return next({
      status: 400,
      message: `Restaurant is only open between 10:30 am and 9:30 pm.`,
    });
  }
  next();
};

const tableStatusValidation = (req, res, next) => {
  const { status } = req.body.data;

  if (validTableStatuses.includes(status)) {
    res.locals.status = status;
    next();
  } else {
    next({
      status: 400,
      message: `${status} is not a valid table status. Status can only be "booked", "seated", "cancelled", or "finished".`,
    });
  }
};

const updateReservationStatus = async (req, res, next) => {
  const updatedStatus = {
    ...res.locals.reservation,
    status: res.locals.status,
  };

  const updatedReservation = await reservationsService.update(updatedStatus);

  res.json({ data: updatedReservation });
};

const isTableBooked = (req, res, next) => {
  const { data } = req.body;

  if (data.status === "seated" || data.status === "finished") {
    return next({
      status: 400,
      message: `A new reservation cannot be created with a status of seated or finished`,
    });
  }
  next();
};

const isTableFinished = (req, res, next) => {
  const { reservation_id } = req.params;

  const status = res.locals.reservation.status;

  if (status === "finished") {
    return next({
      status: 400,
      message: `Reservation ${reservation_id} is finished.`,
    });
  }
  next();
};
// -------------------------VALIDATION MIDDLEWARE ENDS---------------------------------------

// if date query the database lists reservations that aren't finished or cancelled in the database
// if mobile_number present in the query database lists the reservation with the matching mobile number
// Else all the reservations in the database returned
const list = async (req, res, next) => {
  const { date, mobile_number } = req.query;

  let recallReservations;

  if (date) {
    recallReservations = await reservationsService.filterReservationByDate(
      date
    );
  } else if (mobile_number) {
    recallReservations = await reservationsService.DisplayReservationByNumber(
      mobile_number
    );
  } else {
    recallReservations = [];
  }

  res.json({ data: recallReservations });
};

// creates a new reservation in the database
const create = async (req, res, next) => {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
};

// returns the data passed to it from the reservationExists function
const read = (req, res, next) => {
  res.json({ data: res.locals.reservation });
};

// updates a reservation in the database with a matching id.
const update = async (req, res, next) => {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };

  const reservationUpdated = await reservationsService.update(
    updatedReservation
  );

  res.json({ data: reservationUpdated });
};

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasValidProperties,
    dateValidation,
    futureDateValidation,
    isTableBooked,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), read],
  update: [
    asyncErrorBoundary(reservationExists),
    hasValidProperties,
    dateValidation,
    futureDateValidation,
    asyncErrorBoundary(update),
  ],
  updateReservationStatus: [
    asyncErrorBoundary(reservationExists),
    tableStatusValidation,
    isTableFinished,
    asyncErrorBoundary(updateReservationStatus),
  ],
};