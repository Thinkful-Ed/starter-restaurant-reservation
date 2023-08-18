const tablesService = require("./tables.service");
const asyncErrorBoundry = require("../errors/asyncErrorBoundary");
const reservationService = require("../reservations/reservations.service");
const {
  has_capacity,
  has_table_name,
} = require("../reservations/reservations.controller");

function validateLength(req, res, next) {
  const { data = {} } = req.body;
  if (data['table_name'].length < 2) {
    return next({ status: 400, message: "table_name must have 2 characters" });
  } else {
    next();
  }
}

function validateNumber(req, res, next) {
  const { data = {} } = req.body;
  if (data["capacity"] === 0 || !Number.isInteger(data["capacity"])) {
    return next({ status: 400, message: `Invalid number of capacity` });
  }
  next();
}

async function list(req, res, next) {
  res.json({ data: await tablesService.list(req.query) });
}

async function read(req, res, next) {
  const table = await tablesService.read(req.params.table_id);
  if (table) {
    res.json({ data: table });
  } else {
    next({
      status: 400,
      message: `Table with id ${req.params.table_id} not found.`,
    });
  }
}

async function create(req, res, next) {
  res.status(201).json({ data: await tablesService.create });
}

module.exports = {
  list: [asyncErrorBoundry(list)],
  read: [asyncErrorBoundry(read)],
  create: [
    validateLength,
    validateNumber,
    has_capacity,
    has_table_name,
    asyncErrorBoundry(create),
  ],
};
