function isValidDate(req, res, next) {
  const { data: { reservation_date } = {} } = req.body;

  const dateToCheck = new Date(reservation_date);

  if (isNaN(dateToCheck.getDate())) {
    next({ status: 400, message: `reservation_date is not a valid date` });
  } else next();
}

module.exports = isValidDate;
