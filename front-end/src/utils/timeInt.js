export function getDateInt(date) {
  return +`${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(-2)}${(
    "0" + date.getDate()
  ).slice(-2)}`;
}

export function getTimeInt(date) {
  return +date.toTimeString().slice(0, 5).replace(":", "");
}
