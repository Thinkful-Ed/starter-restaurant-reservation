const dayjs = require("dayjs");
const parseDateTime = require("../utils/parse-dateTime");
const errWrapper = (message) => ({ status: 400, message });

const isDate = (req, res, next) => {
  const { reservation_date: date } = req.body.data;
  return dayjs(date).isValid()
    ? next()
    : next(errWrapper("reservation_date must be a valid date."));
};
const isTime = (req, res, next) => {
  const { reservation_time: time } = req.body.data;
  const twentyFour = /^([01]\d|2[0-3]):?[0-5]\d$/i;
  var twelve = /^(0\d|1[0-2]):?[0-5]\d\s?(AM|PM)?\s*$/i;
  return time.match(twentyFour) || time.match(twelve)
    ? next()
    : next(
        errWrapper(
          "reservation_time must be a valid time in 24 or 12 hour format."
        )
      );
};
const notTuesday = (req, res, next) => {
  const { reservation_date: date, reservation_time: time } = req.body.data;
  return parseDateTime(date, time).day() !== 2
    ? next()
    : next(errWrapper("Reservations cannot be made for a Tuesday."));
};
const isFuture = (req, res, next) => {
  const { reservation_date: date, reservation_time: time } = req.body.data;
  return parseDateTime(date, time).isAfter(dayjs(), "minute")
    ? next()
    : next(
        errWrapper("Reservations must be made for a future date and/or time.")
      );
};

const dateTimeMiddleware = [isDate, isTime, notTuesday, isFuture];
module.exports = { isDate, isTime, notTuesday, isFuture, dateTimeMiddleware };
