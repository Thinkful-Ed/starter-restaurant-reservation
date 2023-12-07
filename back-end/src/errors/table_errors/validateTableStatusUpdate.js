/**
 * Creates a middleware function that validates that req.body.data has properties for updating/editing a table.
 * @returns {function(*, *, *): void}
 *    a middleware function that validates that req.body.data has the valid properties for updating/editing a table.
 */

const reservationService = require("../../reservations/reservations.service");

//makes sure that data exists
async function validateTableStatusUpdate(req, res, next) {
  if (!req.body.data) {
    next({
      status: 400,
      message: `Data is missing.`,
    });
  }
  const reservation_id = req.body.data.reservation_id;
  //makes sure that the reservation_id is given
  if (!reservation_id) {
    next({
      status: 400,
      message: `The property reservation_id is missing.`,
    });
  }

  const table = res.locals.table;
  const reservation = await reservationService.read(reservation_id);

  //makes sure that the reservation exists in the database
  if (reservation) {
    if (table.capacity < reservation.people) {
      next({
        status: 400,
        message: `Table ${table.table_id} does not have sufficient capacity since it fits ${table.capacity} but Reservation ${reservation.reservation_id} which has a party size of ${reservation.people} .`,
      });
    }
    //makes sure that the table isn't already occupied
    if (table.status === "Occupied") {
      next({
        status: 400,
        message: `Table ${table.table_id} is already occupied by Reservation ${table.reservation_id}.`,
      });
    }
    //makes sure the reservation party hasn't already been seated
    if (reservation.status === "seated") {
      next({
        status: 400,
        message: `Reservation ${reservation.reservation_id} is already seated at another table.`,
      });
    }
    next();
  } else {
    next({
      //throws an error if the reservation doesn't exist
      status: 404,
      message: `Reservation Id ${reservation_id} does not exist`,
    });
  }
}

module.exports = validateTableStatusUpdate;
