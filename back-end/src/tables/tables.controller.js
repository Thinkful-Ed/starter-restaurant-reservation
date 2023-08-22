const { as } = require("../db/connection");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

// Validation Middleware

//returns 400 if data is missing
function hasData(req, res, next) {
  const { data } = req.body;
  if (data) {
    return next();
  }
  next({ status: 400, message: "data is missing" });
}

//returns 400 if table_name is missing
function hasTableName(req, res, next) {
  const { table_name } = req.body.data;
  if (table_name) {
    return next();
  }
  next({ status: 400, message: "table_name is missing" });
}

//returns 400 if table_name empty
function tableNameNotEmpty(req, res, next) {
  const { table_name } = req.body.data;
  if (table_name !== "") {
    return next();
  }
  next({ status: 400, message: "table_name cannot be empty" });
}

//returns 400 if table_name is less than 1 character
function tableNameLength(req, res, next) {
  const { table_name } = req.body.data;
  if (table_name.length >= 2) {
    return next();
  }
  next({ status: 400, message: "table_name must be at least 2 characters" });
}

//returns 400 if capacity is missing
function hasCapacity(req, res, next) {
  const { capacity } = req.body.data;
  if (capacity) {
    return next();
  }
  next({ status: 400, message: "capacity is missing" });
}

//returns 400 if capacity is zero
function capacityGreaterThanZero(req, res, next) {
  const { capacity } = req.body.data;
  if (capacity > 0) {
    return next();
  }
  next({ status: 400, message: "capacity must be greater than zero" });
}

//returns 400 if capacity is not a number
function capacityIsNumber(req, res, next) {
  const { capacity } = req.body.data;
  if (typeof capacity === "number") {
    return next();
  }
  next({ status: 400, message: "capacity must be a number" });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}
