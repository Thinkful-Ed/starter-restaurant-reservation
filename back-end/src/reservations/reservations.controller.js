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

// function isDate(dateString) {
//   // Use Date.parse to parse the date string and check if it is a valid date
//   return !isNaN(Date.parse(dateString));
// }

// // Example usage:
// console.log(isDate('2022-12-21'));  // true
// console.log(isDate('hello world'));  // false

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
    !isNaN(Date.parse(reservation_date))
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
