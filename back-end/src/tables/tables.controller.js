const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const tablesService = require("./tables.service");

const hasRequiredProperties = hasProperties("table_name", "capacity");

const VALID_PROPERTIES = ["table_name", "capacity"];

function hasData(req, res, next) {
  const data = req.body.data;
  if (!data) {
    return next({
      status: 400,
      message: `Request body must have data.`,
    });
  }
  next();
}

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

function isValidNumber(req, res, next) {
  const { data = {} } = req.body;
  const { capacity } = data;
  if (!Number.isInteger(capacity)) {
    return next({
      status: 400,
      message: `Invalid field: capacity. Must be a valid number.`,
    });
  }
  next();
}

function validTableName(req, res, next) {
  const { table_name } = req.body.data;
  const table = String(table_name);
  if (table.length < 2) {
    return next({
      status: 400,
      message: `table_name must be longer than one character.`,
    });
  }
  return next();
}

async function list(req, res) {
  const data = await tablesService.list();
  res.json({ data });
}

async function tableExists(req, res, next) {
  const table = await tablesService.read(req.params.table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `Table ${req.params.table_id} cannot be found.`,
  });
}

async function create(req, res) {
  const data = await tablesService.create(req.body.data);
  res.status(201).json({ data });
}

async function read(req, res) {
  const { table: data } = res.locals;
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasData,
    isValidNumber,
    hasRequiredProperties,
    hasOnlyValidProperties,
    validTableName,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
};
