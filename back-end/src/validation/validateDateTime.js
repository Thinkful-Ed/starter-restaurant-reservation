const dayjs = require("dayjs");
const isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);

const parseDateTime = require("../utils/parse-dateTime");
const errWrapper = (message) => ({ status: 400, message });

const validations = {
  isDate: {
    check: (dateTime) => dateTime.isValid(),
    message: "reservation_date must be a valid date.",
  },
  isTime: {
    check: (dateTime, data) => {
      const { reservation_time } = data;
      const twentyFour = /^([01]\d|2[0-3]):?[0-5]\d$/i;
      const twelve = /^(0\d|1[0-2]):?[0-5]\d\s?(AM|PM)?\s*$/i;
      return (
        reservation_time.match(twentyFour) || reservation_time.match(twelve)
      );
    },
    message: "reservation_time must be a valid time in 24 or 12 hour format.",
  },
  notTuesday: {
    check: (dateTime) => dateTime.day() !== 2,
    message:
      "Reservations cannot be made for a Tuesday, as the restaurant is closed on these days.",
  },
  isFuture: {
    check: (dateTime) => dateTime.isAfter(dayjs(), "minute"),
    message: "Reservations must be made for a future date and/or time.",
  },
  isInTimeFrame: {
    check: (dateTime) => {
      const date = dateTime.format("YYYY-MM-DD");
      const lowerBound = parseDateTime(date, "10:30");
      const upperBound = parseDateTime(date, "21:30");

      return dateTime.isBetween(lowerBound, upperBound, "m", "[]");
    },
    message: "Reservations must be made between 10:30AM and 9:30PM.",
  },
};

const dateTimeMiddleware = (req, res, next) => {
  const dateTime = parseDateTime(
    req.body.data.reservation_date,
    req.body.data.reservation_time
  );
  const errors = [];

  for (const validationName in validations) {
    const validation = validations[validationName];
    if (!validation.check(dateTime, req.body.data))
      errors.push(validation.message);
  }

  const errorsString = errors.join(" | ");
  return errors.length ? next(errWrapper(errorsString)) : next();
};

module.exports = { dateTimeMiddleware };
