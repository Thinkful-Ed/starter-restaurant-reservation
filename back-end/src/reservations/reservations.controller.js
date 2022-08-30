/**
 * List handler for reservation resources
 */
const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
];

const hasAllProperties = hasProperties("first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people")

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

  const dateRegex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
  const timeRegex = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/

  if (!(dateRegex.test(data.reservation_date))){
    return next({
      status: 400,
      message: `Property "reservation_date" must be a valid date.`
    })
  }

  if(!(timeRegex.test(data.reservation_time))){
    return next({
      status: 400,
      message: `Property "reservation_time" must be a valid time.`
    })
  }

  if (typeof data.people !== "number") {
    return next({
      status: 400,
      message: `Property "people" must be a number.`,
    });
  }

  next();
}


async function list(req, res) {
  const todaysDate = req.query.date
  const data = await service.list(todaysDate)
  res.json({data:data});
}

async function create(req, res, next) {
  service
    .create(req.body.data)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasAllProperties,
    hasOnlyValidProperties,
    asyncErrorBoundary(create)]
};
