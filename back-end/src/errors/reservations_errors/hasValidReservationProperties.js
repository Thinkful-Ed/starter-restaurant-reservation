/**
 * Creates a middleware function that validates that req.body.data has the valid reservation properties for creating or editing a reservation.
 * @returns {function(*, *, *): void}
 *    a middleware function that validates that req.body.data has the valid reservation properties.
 */

const validateReservationDate = require("./validateReservationDate");
const validatesReservationPartySize = require("./validateReservationPartySize");
const validateReservationTime = require("./validateReservationTime");
const validateReservationStatus = require("./validatesReservationStatus");

function hasValidReservationProperties(isEdit = false) {
  return function (res, req, next) {
    const { data = {} } = res.body;

    try {
      const today = new Date();

      const status = data["status"];
      if (isEdit && status) {
        if (status !== "booked") {
          const error = new Error(
            `You cannot edit a reservation that is ${status}. You can only edit reservations that are "booked".`
          );
          error.status = 400;
          throw error;
        }
      }
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

      //RESERVATION STATUS - validates status only for new reservations
      //Note: The function for validating a reservation status for editing a reservation is in hasValidUpdateResStatusProperties.js
      if (!isEdit) {
        validateReservationStatus(data["status"]);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = hasValidReservationProperties;
