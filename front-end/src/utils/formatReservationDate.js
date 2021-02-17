import { formatAsDate } from "./date-time";

/**
 * Formats the reservation_date property for each reservation in an array of reservations.
 * @param reservations
 * @returns {[reservation]}
 *  the specified reservations array with each reservation_date property formatted as YYYY-MM-DD.
 */
function formatReservationsDate(reservations = []) {
  return reservations.map((reservation) => {
    reservation.reservation_date = formatAsDate(reservation.reservation_date);
    return reservation;
  });
}

module.exports = formatReservationsDate;
