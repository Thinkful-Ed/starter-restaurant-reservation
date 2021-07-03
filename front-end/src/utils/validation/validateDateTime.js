const dayjs = require("dayjs");
import { parseDateTime } from "../parse-dateTime";

const notTuesday = (date, time) => parseDateTime(date, time).day() !== 2;
const isFuture = (date, time) =>
  parseDateTime(date, time).isAfter(dayjs(), "minute");

export { notTuesday, isFuture };
