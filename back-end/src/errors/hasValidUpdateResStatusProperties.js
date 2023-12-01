function hasValidUpdateResStatusProperties(req, res, next) {
  return function (req, res, next) {
    try {
      const reservation = res.locals.reservation;
      const newStatus = req.body.data.status;
      if (
        newStatus !== "booked" &&
        newStatus !== "seated" &&
        newStatus !== "finished"
      ) {
        const error = new Error(
          `The reservation_status cannot be ${newStatus}. The status must be either "booked", "seated", or "finished.`
        );
        error.status = 400;
        throw error;
      }

      //checks if the existing status is finished, if so no update because a table that is finished cannot be seated or booked again
      if (reservation.status === "finished") {
        const error = new Error(
          `This reservation has already been finished. You cannot change the status of a reservation once it is finished. Please submit a new reservation if needed.`
        );
        error.status = 400;
        throw error;
      }
      //send error if reservation status is finished
      //   const capacity = data["capacity"];
      //   if (typeof capacity !== "number") {
      //     const error = new Error(`The capacity must be a number.`);
      //     error.status = 400;
      //     throw error;
      //   }
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = hasValidUpdateResStatusProperties;
