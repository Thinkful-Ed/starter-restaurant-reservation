const service = require("./reservations.service");

/**
 * List handler for reservation resources
 */

function isInTheFuture(date) {
  // Get the current date and time
  const now = new Date();

  const reservationDate = new Date(date);

  // Get the number of milliseconds since the Unix epoch for the current date and the given date
  const nowTimestamp = now.getTime();
  const dateTimestamp = reservationDate.getTime();
  // Compare the timestamps
  return dateTimestamp > nowTimestamp;
}

function isBetween1030And2130(time) {
  const [hours, minutes] = time.split(":");
  const hoursInt = parseInt(hours);
  const minutesInt = parseInt(minutes);

  if (hoursInt > 10 || (hoursInt === 10 && minutesInt >= 30)) {
    if (hoursInt < 21 || (hoursInt === 21 && minutesInt <= 30)) {
      return true;
    }
  }
  return false;
}

function checkIfTimeIsValid(request, response, next) {
  const { reservation_time } = request.body.data;
  const reservationToString = reservation_time.toString();

  if (isBetween1030And2130(reservationToString)) {
    next();
  } else {
    next({
      status: 400,
      message: "Reservation needs to be between 10:30 and 21:30",
    });
  }
}

function isTuesday(date) {
  const reservationDate = new Date(date);

  return reservationDate.getUTCDay() === 2;
}

function checkIfDateIsValid(request, response, next) {
  const { reservation_date } = request.body.data;

  if (isInTheFuture(reservation_date) && !isTuesday(reservation_date)) {
    next();
  } else {
    next({
      status: 400,
      message:
        "Date needs to be in the future and/or restaurant is closed on Tuesdays",
    });
  }
}

async function listReservationByDate(request, response) {
  const date = request.query.date;
  const reservations = await service.getReservationsByDate(date);
  const sortedRservations = reservations.sort((a, b) => {
    const [ah, am, as] = a.reservation_time.split(":");
    const [bh, bm, bs] = b.reservation_time.split(":");
    if (ah !== bh) {
      return ah - bh;
    }
    if (am !== bm) {
      return am - bm;
    }
    return as - bs;
  });

  response.json({
    data: reservations,
  });
}

async function createReservation(request, response) {
  const {
    data: {
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
    },
  } = request.body;
  const newReservation = {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  };
  const makeNewReservation = await service.postReservation(newReservation);
  response.status(201).json({ data: makeNewReservation });
}

function checkIfDataExists(request, response, next) {
  const data = request.body.data;
  if (data) {
    next();
  } else {
    next({ status: 400, message: "Data is missing" });
  }
}

//helper function to check if reservation time is actually a time

function isTime(string) {
  // Define a regular expression that matches a time in the format "hh:mm"
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  // Test the string against the regular expression
  return timeRegex.test(string);
}

function checkDataParameters(request, response, next) {
  const {
    data: {
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
    },
  } = request.body;
  if (
    first_name &&
    last_name &&
    mobile_number &&
    reservation_date &&
    reservation_time &&
    people &&
    !isNaN(Date.parse(reservation_date)) &&
    isTime(reservation_time) &&
    typeof people === "number"
  ) {
    next();
  } else {
    next({
      status: 400,
      message:
        "The following fields are required: first_name, last_name, mobile_number, reservation_date, reservation_time, people",
    });
  }
}

async function checkIfReservationIdExists(request, response, next) {
  const { reservation_id } = request.params;
  const reservation = await service.getReservationById(reservation_id);

  if (reservation) {
    next();
  } else {
    next({
      status: 404,
      message: `reservation_id ${reservation_id} does not exist`,
    });
  }
}

async function getReservationById(request, response, next) {
  const { reservation_id } = request.params;

  const reservation = await service.getReservationById(reservation_id);

  response.status(200).json({ data: reservation });
}

async function checkReservationStatus(request, response, next) {
  const data = request.body.data;
  const reservation_id = data.reservation_id;
  const status = data.status;

  if (status === "seated" || status === "finished") {
    next({
      status: 400,
      message: `Reservation is already ${status}`,
    });
  } else {
    next();
  }
}

async function checkCurrentStatusFinished(request, response, next) {
  const { reservation_id } = request.params;

  // Retrieve the current status of the reservation from the database
  const reservation = await service.getReservationById(reservation_id);
  const currentStatus = reservation.status;

  if (currentStatus === "finished" || currentStatus === "unknown") {
    // Return a 400 status code and an error message indicating that the reservation is already finished
    next({
      status: 400,
      message: `Reservation is already ${currentStatus} and cannot be updated`,
    });
  } else {
    // Allow the update to proceed
    next();
  }
}

async function checkIfStatusIsUnknown(request, response, next) {
  const { reservation_id } = request.params;
  const reservation = await service.getReservationById(reservation_id);
  const currentStatus = reservation.status;
  const data = request.body.data;
  const status = data.status;

  if (status === "unknown" || currentStatus === "unknown") {
    next({
      status: 400,
      message: `Reservation is already ${status}`,
    });
  } else {
    next();
  }
}

async function updateReservationStatus(request, response, next) {
  const { reservation_id } = request.params;
  const { data: { status } = {} } = request.body;
  const updatedReservation = await service.updateReservationStatus(
    reservation_id,
    status
  );
  response.status(200).json({ data: updatedReservation });
}

module.exports = {
  list: [listReservationByDate],
  post: [
    checkIfDataExists,
    checkDataParameters,
    checkIfDateIsValid,
    checkIfTimeIsValid,
    checkReservationStatus,
    createReservation,
  ],
  get: [checkIfReservationIdExists, getReservationById],
  put: [
    checkIfReservationIdExists,
    checkIfStatusIsUnknown,
    checkCurrentStatusFinished,
    updateReservationStatus,
  ],
};
