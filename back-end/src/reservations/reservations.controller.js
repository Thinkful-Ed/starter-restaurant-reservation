const service = require("./reservations.service");

/**
 * List handler for reservation resources
 */
async function listReservationByDate(request, response) {
  const date = request.query.date;
  console.log("DATE", date);
  const reservations = await service.getReservationsByDate(date);
  console.log("RESERVATIONS", reservations);
  response.json({
    data: reservations,
  });
}

async function createReservation(request, response) {
  console.log("IN CREATE RESERVATIONS");
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
  console.log("MAKE NEW RESERVATION", makeNewReservation);
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

module.exports = {
  list: [listReservationByDate],
  post: [checkIfDataExists, checkDataParameters, createReservation],
};
