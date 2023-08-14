/**
 * List handler for reservation resources
 */

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

function validator(field) {
  return function (req, res, next) {
    const { data: { [field]: value } = {} } = req.body;
    if (!value) {
      return next({
        status: 400,
        message: `${field} is missing`,
      });
    }
    next();
  };
}

async function list(req, res) {
  const { date } = req.query;
  const data = await service.list(date);
  res.json({
    data,
  });
}

async function create(req, res) {
  const response = await service.create(req.body.data);
  res.status(201).json({
    data: response,
  });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    validator("first_name"),
    validator("last_name"),
    validator("mobile_number"),
    validator("reservation_date"),
    validator("reservation_time"),
    validator("people"),
    asyncErrorBoundary(create),
  ],
};
