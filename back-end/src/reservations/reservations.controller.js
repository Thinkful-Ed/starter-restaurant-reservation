/**
 * List handler for reservation resources
 */
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reservationsService = require("./reservations.service");

// Error Handlers
function bodyDataHas(propertyName) {
  return function (req, res, next) {
    if (req.body[propertyName]) {
      return next();
    }
    next({
      status: 400,
      message: `Must include a ${propertyName}`,
    });
  };
}

function partySizeValid() {
  return function (req, res, next) {
    if (req.body["people"] > 0) {
      return next();
    }
    next({
      status: 400,
      message: "Party size must be greater than 0",
    });
  };
}
//

async function list(req, res) {
  let date;
  if (req.query.date) {
    date = req.query.date;
  } else if (req.query.previousDate) {
    date = req.query.previousDate;
  } else if (req.query.nextDate) {
    date = req.query.nextDate;
  } else if (req.query.paramDate) {
    date = req.query.paramDate;
  }
  const data = await reservationsService.list(date);
  res.json({ data });
}

async function create(req, res) {
  const data = await reservationsService.create(req.body);
  res.status(201).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    partySizeValid(),
    bodyDataHas("people"),
    asyncErrorBoundary(create),
  ],
};
