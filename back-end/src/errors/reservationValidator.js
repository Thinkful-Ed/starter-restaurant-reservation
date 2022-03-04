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
  const { reservation_date, reservation_time, people } = data;
  const missing = [];
  properties.forEach((property) => {
    const value = data[property];
    if (!value || value.length === 0) {
      missing.push(property);
    }
  });

  if (missing.length > 0)
    next({ status: 400, message: `${missing.join(", ")}is required.` });

  if (typeof people !== "number")
    next({
      status: 400,
      message: "people property should be a number",
    });

  if (people <= 0)
    next({
      status: 400,
      message: "people field must be greater than 0",
    });

  if (!Date.parse(reservation_date))
    next({
      status: 400,
      message: "reservation_date property should be a date",
    });

  const numTime = parseInt(reservation_time.split(":").join(""));
  if (isNaN(numTime))
    next({
      status: 400,
      message: "reservation_time property should be a time",
    });

  // US-02
  const reserveDate = new Date(reservation_date);
  const today = new Date();
  const reserveDay = reserveDate.getUTCDay();

  if (reserveDay === 2)
    next({
      status: 400,
      message:
        "The restaurant is closed on Tuesdays. Please select another day.",
    });

  if (reserveDate <= today)
    next({
      status: 400,
      message:
        "Reservation must be set in the future. Please select another date.",
    });

  // US-03
  const hour = parseInt(reservation_time.split(":")[0]);
  const mins = parseInt(reservation_time.split(":")[1]);

  if (hour <= 10 && mins <= 30)
    next({
      status: 400,
      message: "The restaurant opens at 10:30 AM. Please select another time.",
    });

  if (hour >= 22 || (hour === 21 && mins >= 30))
    next({
      status: 400,
      message:
        "The restaurant closes at 10:30 PM. Please select a time before 9:30 PM.",
    });

  next();
}

module.exports = reservationValidator;
