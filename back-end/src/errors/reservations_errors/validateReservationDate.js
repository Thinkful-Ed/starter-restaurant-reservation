/**
 * A function used to validate reservation date property for creating or editing a reservation.
 */

function validateReservationDate(reservationDate, today) {
  //makes sure reservation date is formatted correctly "2023-12-04"
  if (reservationDate.match(/^\d{4}-\d{2}-\d{2}$/) === null) {
    const error = new Error(`A valid reservation_date is required.`);
    error.status = 400;
    throw error;
  }

  //makes sure reservation date is not a Tuesday
  const resDateAsDateObject = new Date(reservationDate);
  if (resDateAsDateObject.getDay() === 1) {
    const error = new Error(
      `The reservation_date can't be a tuesday since the restaurant is closed on Tuesdays.`
    );
    error.status = 400;
    throw error;
  }

  //checks if the reservationTime is past reservationDate
  if (reservationDate === today.toISOString().split("T")[0]) {
    //if the reservationTime is today returns true to be used in validateReservationTime function
    return true;
  } else {
    if (resDateAsDateObject < today) {
      const error = new Error(`The reservation_date must be a future date.`);
      error.status = 400;
      throw error;
    }
  }
}

module.exports = validateReservationDate;
