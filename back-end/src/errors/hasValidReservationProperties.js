/**
 * Creates a middleware function that validates that req.body.data has the valid reservation properties.
 * @returns {function(*, *, *): void}
 *    a middleware function that validates that req.body.data has the valid reservation properties.
 */

const validateReservationDate = (reservationDate, today, sameDay) => {
  //checks if reservation date is a date
  if (reservationDate.match(/^\d{4}-\d{2}-\d{2}$/) === null) {
    const error = new Error(`A valid reservation_date is required.`);
    error.status = 400;
    throw error;
  }

  //checks if reservation date is not a tuesday

  const resDateAsDateObject = new Date(reservationDate);
  if (resDateAsDateObject.getDay() === 1) {
    const error = new Error(
      `The reservation_date can't be a tuesday since the restaurant is closed on Tuesdays.`
    );
    error.status = 400;
    throw error;
  }

  //if the date is today, makes sure the reservation time is at least 1 hour later than current time

  if (reservationDate === today.toISOString().split("T")[0]) {
    //see if the reservationTime is past reservationDate
    return true;
  } else {
    if (resDateAsDateObject < today) {
      const error = new Error(`The reservation_date must be a future date.`);
      error.status = 400;
      throw error;
    }
  }
};

const validateReservationTime = (time, today, sameDay) => {
  //checks time is in the right format
  if (time.match(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/) === null) {
    const error = new Error(`A valid reservation_time is required.`);
    error.status = 400;
    throw error;
  }
  //extracts hour and minute from time object
  const timeSplit = time.split(":");
  const reservationHour = Number(timeSplit[0]);
  const reservationMinutes = Number(timeSplit[1]);

  //checks if the reservation is same day, if so checks if time is valid
  if (sameDay) {
    const todayHour = today.getHours();
    const todayMinutes = today.getMinutes();
    //if its past the time do this
    if (
      todayHour > reservationHour ||
      (todayHour === reservationHour && todayMinutes + 1 > reservationMinutes)
    ) {
      const error = new Error(
        `The reservation_time must be made at a future time today.`
      );
      error.status = 400;
      throw error;
    }
    //if it not pass the time, keep going
  }

  //checks if reservation is after 10:30AM opening
  if (
    reservationHour < 10 ||
    (reservationHour === 10 && reservationMinutes < 30)
  ) {
    const error = new Error(
      `The reservation_time must be after opening at 10:30AM.`
    );
    error.status = 400;
    throw error;
  }

  //checks if reservation is made at least 1 hour before 9:30PM closing
  if (
    reservationHour > 21 ||
    (reservationHour === 21 && reservationMinutes >= 31)
  ) {
    const error = new Error(
      `The reservation_time must be at least 1 hour before closing at 9:30PM.`
    );
    error.status = 400;
    throw error;
  }
};

const validatesReservationPartySize = (people) => {
  //checks that people is a number
  if (typeof people !== "number" || people <= 0) {
    const error = new Error(
      `A valid number for people is required. ${
        typeof people !== "number"
      } ${people}`
    );
    error.status = 400;
    throw error;
  }
};

function hasValidReservationProperties() {
  return function (res, req, next) {
    const { data = {} } = res.body;

    try {
      const today = new Date();

      //RESERVATION DATE
      //checks if reservation dates are valid and also returns if the date is the same day as today
      const isSameDay = validateReservationDate(
        data["reservation_date"],
        today
      );

      //RESERVATION TIME
      validateReservationTime(data["reservation_time"], today, isSameDay);

      //PARTY SIZE
      validatesReservationPartySize(data["people"]);

      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = hasValidReservationProperties;
