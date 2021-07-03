const dayjs = require("dayjs");

//takes in a date (YYYY-MM-DD or MMDDYYYY) and a time (HH:MM, HHMM, hh:mmA, or hhmmA) and wraps them into a dayjs object.
const parseDateTime = (date, time) => {
  const dateFormat = date.includes("-") ? "YYYY-MM-DD" : "MMDDYYYY";
  const timeFormat =
    time.includes("M") && time.includes(":")
      ? "hh:mmA"
      : time.includes("M")
      ? "hhmmA"
      : time.includes(":")
      ? "HH:MM"
      : "HHMM";

  return dayjs(`${date} ${time}`, `${dateFormat} ${timeFormat}`);
};

module.exports = parseDateTime;
