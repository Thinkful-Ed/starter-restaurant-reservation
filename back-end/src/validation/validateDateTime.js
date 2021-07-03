const dayjs = require("dayjs");
const parseDateTime = require("../utils/parse-dateTime");

const notTuesday = (req, res, next) => {
  const { reservation_date: date, reservation_time: time } = req.body.data;
  return parseDateTime(date, time).day() !== 2
    ? next()
    : next("Reservations cannot be made for a Tuesday.");
};
const isFuture = (req, res, next) => {
  const { reservation_date: date, reservation_time: time } = req.body.data;
  return parseDateTime(date, time).isAfter(dayjs(), "minute")
    ? next()
    : next("Reservations must be made for a future date and/or time.");
};

export { notTuesday, isFuture };
