const service = require("./reservations.service");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  res.json({
    data: [],
  });
}

function createReservation(request, response) {
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
  const makeNewReservation = service.postReservation(newReservation);
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
    isTime(reservation_time)
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

// if (
//   !data.deliverTo ||
//   !data.mobileNumber ||
//   !data.dishes ||
//   data.dishes.length === 0 ||
//   !Array.isArray(data.dishes)
// ) {
//   response
//     .status(400)
//     .json({ error: `deliverTo, mobileNumber, dishes must be valid` });
// } else {
//   response.locals.data = data;
//   next();
// }

module.exports = {
  list: [checkDataParameters, list],
  post: [checkIfDataExists, checkDataParameters, createReservation],
};
