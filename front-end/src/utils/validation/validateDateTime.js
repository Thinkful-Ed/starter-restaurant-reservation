import { parseDateTime } from "../parse-dateTime";
const dayjs = require("dayjs");

const notTuesday = (date, time) => parseDateTime(date, time).day() !== 2;
const isFuture = (date, time) =>
  parseDateTime(date, time).isAfter(dayjs(), "minute");

export { notTuesday, isFuture };
