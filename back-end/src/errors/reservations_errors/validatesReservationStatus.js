function validateReservationStatus(status = "booked", isEdit = false) {
  if (status !== "booked" && status !== "seated" && status !== "finished") {
    const error = new Error(
      `The reservation_status cannot be ${status}. The status must be either "booked", "seated", or "finished.`
    );
    error.status = 400;
    throw error;
  }
  if (!isEdit && status !== "booked") {
    const error = new Error(
      `The reservation_status of a new reservation cannot be ${status}. It must be "booked".`
    );
    error.status = 400;
    throw error;
  }
}

module.exports = validateReservationStatus;
