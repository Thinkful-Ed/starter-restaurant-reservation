/**
 * List handler for reservation resources
 */

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

function validator(req, res, next) {
  return function (req, res, next) {
    const { data = ({ [field]: value } = {}) } = req.body;
    if (!value) {
      return next({
        status: 400,
        message: `${field} is missing`,
      });
    }
    next();
  };
}

async function listToday(req, res) {
  const { date } = req.query;
  const response = await service.listToday(date);
  res.json({
    data: [response],
  });
}

async function create(req, res) {
  const response = await service.create(req.body.data);
  res.status(201).json({
    data: response,
  });
}

module.exports = {
  listToday: [asyncErrorBoundary(listToday)],
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
