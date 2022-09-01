function isValidTime(req, res, next) {
  const { data: { reservation_time } = {} } = req.body;
  let [hours, minutes] = reservation_time.split(":");

  if (
    !hours ||
    !minutes ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    next({ status: 400, message: `reservation_time is not a valid time` });
  } else next();
}

module.exports = isValidTime;
