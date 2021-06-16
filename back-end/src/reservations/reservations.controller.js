const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const data = await service.list(req.query);
  res.json({ data });
}
// reservation validater
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

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}
// Create Handler for reservastions
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.send(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(hasOnlyValidProperties),
    asyncErrorBoundary(create),
  ],
};
