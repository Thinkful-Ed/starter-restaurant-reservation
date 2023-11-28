const reservationService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasValidProperties = require("../errors/hasValidProperties");

/**
 * List handler for reservation resources
 */

async function list(req, res) {
  const date = req.query.date;
  const data = await reservationService.list(date);
  res.status(200).json({ data });
}

async function read(req, res, next) {
  const reservation_id = req.params.reservation_id;
  const data = await reservationService.read(reservation_id);
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

const checksValidProperties = hasValidProperties();

async function create(req, res, next) {
  const data = await reservationService.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list,
  read,
  create: [hasRequiredProperties, checksValidProperties, create],
};
