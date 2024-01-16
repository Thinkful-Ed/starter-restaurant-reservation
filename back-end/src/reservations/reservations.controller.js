const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const reservationsService = require("./reservations.service");

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter((field) => !VALID_PROPERTIES.includes(field));

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

async function listByDate(req, res) {
  const { date } = req.query;
  const data = await reservationsService.listByDate(date);
  res.json({ data });
}

async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  reservation.reservation_id++;
  res.status(201).json({ data });
}

module.exports = {
  listByDate: [asyncErrorBoundary(listByDate)],
  create: [hasOnlyValidProperties, hasRequiredProperties, asyncErrorBoundary(create)],
};
