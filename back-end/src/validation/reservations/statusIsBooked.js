// reservations can only be initialized with a status of booked.
// if the endpoint tries to intialize an alternative status, we throw an error.

const statusIsBooked = (req, res, next) => {
  if (req.body.data.hasOwnProperty("status")) {
    const { status } = req.body.data;
    return status === "booked"
      ? next()
      : next({
          status: 400,
          message: `Invalid status: '${status}'. Status must be either left out or left as 'booked'.`,
        });
  }
  next();
};

module.exports = statusIsBooked;
