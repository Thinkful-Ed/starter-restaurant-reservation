const dayjs = require("dayjs");
const parseDateTime = require("../utils/parse-dateTime");
const errWraper = (message) => ({ status: 400, message });

const notTuesday = (req, res, next) => {
  const { reservation_date: date, reservation_time: time } = req.body.data;
  return parseDateTime(date, time).day() !== 2
    ? next()
    : next(errWraper("Reservations cannot be made for a Tuesday."));
};
const isFuture = (req, res, next) => {
  const { reservation_date: date, reservation_time: time } = req.body.data;
  return parseDateTime(date, time).isAfter(dayjs(), "minute")
    ? next()
    : next(
        errWraper("Reservations must be made for a future date and/or time.")
      );
};

module.exports = { notTuesday, isFuture };
