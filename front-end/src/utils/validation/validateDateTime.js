const dayjs = require("dayjs");

const notTuesday = (dateTime) => dateTime.day() !== 2;
const isFuture = (dateTime) => dateTime.isAfter(dayjs(), "minute");

export { notTuesday, isFuture };
