function asDateString(date) {
  return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
    .toString(10)
    .padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
}

export function formatAsDate(dateString) {
  return dateString.match(/\d\d\d\d-\d\d-\d\d/)[0];
}

export function today() {
  return asDateString(new Date());
}

export function previous(currentDate) {
  const date = new Date(...currentDate.split("-"));
  date.setMonth(date.getMonth() - 1);
  date.setDate(date.getDate() - 1);
  return asDateString(date);
}

export function next(currentDate) {
  const date = new Date(...currentDate.split("-"));
  date.setMonth(date.getMonth() - 1);
  date.setDate(date.getDate() + 1);
  return asDateString(date);
}
