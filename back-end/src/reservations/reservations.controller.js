const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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

async function listReservationsByQuery(request, response, next) {
  const { date, mobile_number } = request.query;
  if (date) {
    const reservations = await listReservationByDate(date);
    response.json({ data: reservations });
  }
  if (mobile_number) {
    let reservations = await service.getAllReservationsByMobileNumber(
      mobile_number
    );
    if (reservations === undefined) {
      reservations = [];
    }

    response.json({ data: reservations });
  }
}

async function listReservationByDate(date) {
  const reservations = await service.getReservationsByDate(date);

  reservations.sort((a, b) => {
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

  const filteredReservations = [];
  reservations.forEach((reservation) => {
    if (reservation.status !== "finished") {
      filteredReservations.push(reservation);
    }
  });

  return filteredReservations;
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

function checkReservationStatus(request, response, next) {
  const data = request.body.data;
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

  const reservation = await service.getReservationById(reservation_id);
  const currentStatus = reservation.status;

  if (currentStatus === "finished" || currentStatus === "cancelled") {
    next({
      status: 400,
      message: `Reservation is ${currentStatus} and cannot be updated`,
    });
  } else {
    next();
  }
}

async function checkStatusUnknown(request, response, next) {
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

async function updateReservation(request, response, next) {
  const { reservation_id } = request.params;
  const data = request.body.data;
  const updatedReservation = await service.updateReservation(
    reservation_id,
    data
  );
  response.status(200).json({ data: updatedReservation[0] });
}

module.exports = {
  list: [asyncErrorBoundary(listReservationsByQuery)],
  post: [
    checkIfDataExists,
    checkDataParameters,
    checkIfDateIsValid,
    checkIfTimeIsValid,
    checkReservationStatus,
    asyncErrorBoundary(createReservation),
  ],
  get: [
    asyncErrorBoundary(checkIfReservationIdExists),
    asyncErrorBoundary(getReservationById),
  ],
  put: [
    asyncErrorBoundary(checkIfReservationIdExists),
    asyncErrorBoundary(checkStatusUnknown),
    asyncErrorBoundary(checkCurrentStatusFinished),
    asyncErrorBoundary(updateReservationStatus),
  ],
  updateReservation: [
    asyncErrorBoundary(checkIfReservationIdExists),
    checkDataParameters,
    asyncErrorBoundary(checkCurrentStatusFinished),
    asyncErrorBoundary(updateReservation),
  ],
};
