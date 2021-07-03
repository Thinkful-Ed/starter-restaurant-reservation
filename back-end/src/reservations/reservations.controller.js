const service = require("./reservations.service");
const hasData = require("../validation/hasData");
const hasFields = require("../validation/hasFields")([
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
]);
const { notTuesday, isFuture } = require("../validation/validateDateTime");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date = "" } = req.query;
  res.json({
    data: date.length ? await service.listByDate(date) : await service.list(),
  });
}

async function create(req, res) {
  res.json({
    data: await service.create(req.body.data),
  });
}

module.exports = {
  list,
  create: [hasData, hasFields, notTuesday, isFuture, create],
};
