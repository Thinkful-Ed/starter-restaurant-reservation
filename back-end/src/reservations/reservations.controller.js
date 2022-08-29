/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const query = req.query.date;
  console.log(query);
  const data = query ? await service.listDate(query) : await service.list();

  res.json({
    data,
  });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

function isNumber(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    const isNumber = data[propertyName].replace(/-/g, "");
    if (Number(isNumber)) {
      return next();
    }
    next({ status: 400, message: `${propertyName}` });
  };
}

function isTime(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    const isTime = data[propertyName].replace(/:/g, "");
    if (Number(isTime)) {
      return next();
    }
    next({ status: 400, message: `${propertyName}` });
  };
}

function isPeopleNumber(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (Number.isInteger(data[propertyName])) {
      return next();
    }
    next({ status: 400, message: `${propertyName}` });
  };
}

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `${propertyName}` });
  };
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  post: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    isNumber("reservation_date"),
    isTime("reservation_time"),
    isPeopleNumber("people"),
    asyncErrorBoundary(create),
  ],
};
