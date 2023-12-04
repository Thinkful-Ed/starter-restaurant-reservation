/**
 * Creates a middleware function that validates that req.body.data has the valid reservation properties.
 * @returns {function(*, *, *): void}
 *    a middleware function that validates that req.body.data has the valid reservation properties.
 */

const validateReservationDate = require("./reservations/validateReservationDate");
const validatesReservationPartySize = require("./reservations/validateReservationPartySize");
const validateReservationTime = require("./reservations/validateReservationTime");

function hasValidReservationProperties(isEdit) {
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

      //RESERVATION STATUS
      validateReservationStatus(data["status"], isEdit);

      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = hasValidReservationProperties;
