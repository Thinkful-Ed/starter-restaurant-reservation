/**
 * Creates a middleware function that validates that req.body.data has the valid properties for updating/editing a reservation status.
 * Note: The function for validating a reservation status for creating a reservation is in validatesReservationStatus.js
 * @returns {function(*, *, *): void}
 *    a middleware function that validates that req.body.data has theproperties for updating a reservation status.
 */

function hasValidUpdateResStatusProperties(req, res, next) {
  return function (req, res, next) {
    try {
      const reservation = res.locals.reservation;
      const newStatus = req.body.data.status;
      //makes sure the new status is either "booked", "seated", "finished", or "cancelled"
      if (
        newStatus !== "booked" &&
        newStatus !== "seated" &&
        newStatus !== "finished" &&
        newStatus !== "cancelled"
      ) {
        const error = new Error(
          `The reservation_status cannot be ${newStatus}. The status must be either "booked", "seated", or "finished.`
        );
        error.status = 400;
        throw error;
      }

      //makes sure the existing reservation status isn't finished or cancelled
      if (
        reservation.status === "finished" ||
        reservation.status === "cancelled"
      ) {
        const error = new Error(
          `This reservation has already been ${reservation.status}. You cannot change the status of a reservation once it is ${reservation.status}. Please submit a new reservation if needed.`
        );
        error.status = 400;
        throw error;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = hasValidUpdateResStatusProperties;
