import { formatAsTime } from "./date-time";

/**
 * Formats the reservation_time property for each reservation in an array of reservations.
 * @param reservations
 * @returns {[reservation]}
 *  the specified reservations array with each reservation_time property formatted as HH:MM.
 */
function formatReservationTime(reservations = []) {
  return reservations.map((reservation) => {
    reservation.reservation_time = formatAsTime(reservation.reservation_time);
    return reservation;
  });
}

module.exports = formatReservationTime;
