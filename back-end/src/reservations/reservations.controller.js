const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function hasValidFields(req, res, next) {
  const { data = {} } = req.body;
  const validFields = new Set([
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ]);

  const invalidFields = Object.keys(data).filter(
    field => !validFields.has(field)
  );

  if (invalidFields.length)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  next();
}

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `Must include a ${propertyName}` });
  };
}

const has_first_name = bodyDataHas("first_name");
const has_last_name = bodyDataHas("last_name");
const has_mobile_number = bodyDataHas("mobile_number");
const has_reservation_date = bodyDataHas("reservation_date");
const has_reservation_time = bodyDataHas("reservation_time");
const has_people = bodyDataHas("people");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const data = await service.list(req.query.date);

  res.json({
    data,
  });
}

async function create(req, res) {
  const data = await service.create(req.body.data);

  res.status(201).json({
    data: data,
  });
}

module.exports = {
  create: [
      hasValidFields,
      has_first_name,
      has_last_name,
      has_mobile_number,
      has_reservation_date,
      has_reservation_time,
      has_people,
      asyncErrorBoundary(create)
  ],
  list: asyncErrorBoundary(list),
};
