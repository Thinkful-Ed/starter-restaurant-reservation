const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const tablesService = require("./tables.service");

async function list(req, res, next) {
  const data = await tablesService.list();
  res.json({ data });
}

const REQUIRED_PROPERTIES = ["table_name", "capacity"];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidStatuses = Object.keys(data).filter(
    (field) => !REQUIRED_PROPERTIES.includes(field)
  );

  if (invalidStatuses.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidStatuses.join(", ")}`,
    });
  }
  next();
}

function hasProperties(properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    try {
      properties.forEach((property) => {
        if (!data[property]) {
          const error = new Error(`A '${property}' property is required.`);
          error.status = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

const hasRequiredProperties = hasProperties(REQUIRED_PROPERTIES);

function hasValidValues(req, res, next) {
  const { table_name, capacity } = req.body.data;

  if (capacity <= 0) {
    return next({
      status: 400,
      message: "table capacity must be greater than 1",
    });
  }
  if (table_name.length === 1) {
    return next({
      status: 400,
      message: "table_name must be greater than 1 character",
    });
  }
  if (typeof capacity !== "number") {
    return next({
      status: 400,
      message: "capacity value must be a number",
    });
  }

  next();
}

/**
 * List handler for reservation resources
 */

async function create(req, res) {
  const data = await tablesService.create(req.body.data);
  console.log(req.body);
  console.log(data);
  res.status(201).json({ data: data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidValues,
    asyncErrorBoundary(create),
  ],
};
