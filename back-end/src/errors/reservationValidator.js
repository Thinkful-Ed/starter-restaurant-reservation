const properties = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function reservationValidator(req, res, next) {
  const { data = null } = req.body;
  if (!data) return next({ status: 400, message: "data is required." });
  const missing = [];
  properties.forEach((property) => {
    const value = data[property];
    if (!value || value.length === 0) {
      missing.push(property);
    }
  });

  if (missing.length > 0)
    next({ status: 400, message: `${missing.join(", ")}is required.` });

  if (typeof data.people !== "number")
    next({
      status: 400,
      message: "people property should be a number",
    });

  if (data.people <= 0)
    next({
      status: 400,
      message: "people field must be greater than 0",
    });

  if (!Date.parse(data.reservation_date))
    next({
      status: 400,
      message: "reservation_date property should be a date",
    });

  const numTime = parseInt(data.reservation_time.split(":").join(""));
  if (isNaN(numTime))
    next({
      status: 400,
      message: "reservation_time property should be a time",
    });

  next();
}

module.exports = reservationValidator;
