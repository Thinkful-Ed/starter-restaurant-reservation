const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date } = req.query;
  if (date) {
    res.json({ data: await service.listByDate(date) });
  } else {
    res.json({ data: await service.list() });
  }
}

function isValid(req, res, next) {
  if (!req.body.data) return next({ status: 400, message: "No date selected" });
  const { reservation_date, reservation_time, people } = req.body.data;
  const requiredFields = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];

  for (const field of requiredFields) {
    if (!req.body.data[field]) {
      return next({ status: 400, message: `Invalid input for ${field}` });
    }
  }

  if (
    !reservation_date.match(/\d{4}-\d{2}-\d{2}/g) ||
    typeof people !== "number" ||
    !reservation_time.match(/[0-9]{2}:[0-9]{2}/g)
  )
    return next({
      status: 400,
      message: `Invalid input for reservation_date, reservation_time, or people`,
    });

  res.locals.validReservation = req.body.data;
  next();
}

async function create(req, res) {
  const data = await service.create(res.locals.validReservation);
  res.status(201).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [isValid, asyncErrorBoundary(create)],
};
