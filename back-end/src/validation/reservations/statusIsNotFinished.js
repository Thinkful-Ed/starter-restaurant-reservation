const statusIsNotFinished = (req, res, next) =>
  res.locals.reservation.status === "finished"
    ? next({
        status: 400,
        message: "Cannot update the status of a finished reservation.",
      })
    : next();

module.exports = statusIsNotFinished;
