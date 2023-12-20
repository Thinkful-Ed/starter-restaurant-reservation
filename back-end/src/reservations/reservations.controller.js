const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
/**
 * List handler for reservation resources
 */
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
  "created_at",
  "updated_at",
  "status",
  "reservation_id"
];

// checks to make sure only valid properties are used, otherwise returns error
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

function validDate(req, res, next) {
  const { data = {} } = req.body;
  if (!data["reservation_date"].match(/\d{4}-\d{2}-\d{2}/)) {
    return next({
      status: 400,
      message: `reservation_date is invalid.`,
    });
  }
  next();
}

function validTime(req, res, next) {
  const { data = {} } = req.body;
  if (!data["reservation_time"].match(/[0-9]{2}:[0-9]{2}/)) {
    return next({
      status: 400,
      message: `reservation_time is invalid`,
    });
  }
  next();
}

function validPeople(req, res, next) {
  const { data = {} } = req.body;
  if (typeof data["people"] !== "number") {
    return next({
      status: 400,
      message: `people is invalid`,
    });
  }
  next();
}

function validPhone(req, res, next) {
  const { data = {} } = req.body;
  const mobileNumber = data["mobile_number"];
  if (!/^[0-9 -]+$/.test(mobileNumber)) {
    return next({
      status: 400,
      message: "Phone number should contain only numbers",
    });
  }
  next();
}

function read(req, res) {
  const { reservation: data } = res.locals;
  res.json({ data });
}

async function list(req, res) {
  const data = await service.list(req.query.date);
    res.json({ data });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    validDate,
    validTime,
    validPeople,
    validPhone,
    asyncErrorBoundary(create),
  ],
  list: [asyncErrorBoundary(list)]
};
