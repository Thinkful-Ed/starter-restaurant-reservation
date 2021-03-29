const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function hasValidFields(req, res, next) {
  const { data = {} } = req.body;
  const validFields = new Set([
    "table_name",
    "capacity",
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

function hasTableId(req, res, next) {
  const table = req.params.reservation_id;
  console.log(table);
  if(table){
      next();
  } else {
      next({
          status: 400,
          message: `missing table_id`,
      });
  }
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

const has_table_name = bodyDataHas("table_name");
const has_capacity = bodyDataHas("capacity");

function isValidTableName(req, res, next){
  const { data = {} } = req.body;
  if (data['table_name'].length < 2){
      return next({ status: 400, message: `table_name length is too short.` });
  }
  next();
}

function isValidNumber(req, res, next){
  const { data = {} } = req.body;
  if ('capacity' in data){
      if (data['capacity'] === 0 || !Number.isInteger(data['capacity'])){
          return next({ status: 400, message: `capacity must be a number.` });
      }
  }
  next();
}

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

async function read(req, res) {
  const data = res.locals.reservation;
  console.log("DEBUG>>>>>>>>>>>>");
  console.log(data);

  res.status(200).json({
    data,
  })
}

module.exports = {
  create: [
      has_table_name,
      has_capacity,
      isValidTableName,
      hasValidFields,
      isValidNumber,
      asyncErrorBoundary(create)
  ],
  read: [hasTableId, asyncErrorBoundary(read)],
  list: [asyncErrorBoundary(list)],
};
