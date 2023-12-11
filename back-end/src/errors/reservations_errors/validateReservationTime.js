/**
 * A function used to validate reservation time property for creating or editing a reservation.
 */
function validateReservationTime(time, today, sameDay) {
  //makes sure time is in the right format
  if (time.match(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/) === null) {
    const error = new Error(`A valid reservation_time is required.`);
    error.status = 400;
    throw error;
  }
  //extracts hour and minute from time object
  const timeSplit = time.split(":");
  const reservationHour = Number(timeSplit[0]);
  const reservationMinutes = Number(timeSplit[1]);

  //if the reservation is same day, makes sure the reservation time is at least one minute later than the current time
  if (sameDay) {
    const todayHour = today.getHours();
    const todayMinutes = today.getMinutes();
    //if its before the valid time, do this
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

  //for a future date, makes sure reservation is after 10:30AM opening
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

  //for a future date, makes sure the reservation is made at least 1 hour before 9:30PM closing
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
}

module.exports = validateReservationTime;
