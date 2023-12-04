function validateReservationDate(reservationDate, today) {
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
}

module.exports = validateReservationDate;
