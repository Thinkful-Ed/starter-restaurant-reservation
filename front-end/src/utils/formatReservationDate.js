const dateFormat = /\d\d\d\d-\d\d-\d\d/;

function formatReservationDate(reservations = []) {
  return reservations.map((reservation) => {
    reservation.reservation_date = reservation.reservation_date.match(
      dateFormat
    )[0];
    return reservation;
  });
}

module.exports = formatReservationDate;
