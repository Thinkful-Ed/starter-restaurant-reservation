import { parseDateTime } from "../parse-dateTime";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const validations = {
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

const validateDateAndTime = (date, time) => {
  const dateTime = parseDateTime(date, time);
  const errors = [];

  for (const validationName in validations) {
    const validation = validations[validationName];
    if (!validation.check(dateTime)) errors.push(validation.message);
  }

  return errors.join(" | ");
};

export { validateDateAndTime };
