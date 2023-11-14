const reservationService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

/**
 * List handler for reservation resources
 */

async function list(req, res) {
  const data = await reservationService.list();
  res.status(200).json({ data });
}

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

async function create(req, res, next) {
  const data = await reservationService.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list,
  create,
};
