const service = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
  const data = await service.list()
  res.json({
    data,
  });
}

//validates that all the fields has a value, stores the value in res.locals for further use
function validateHasTextFunction(field) {
  function validateHasText(req, res, next) {
    if(req.body.data[field]) {
      res.locals[field] = req.body.data[field]
      next()
    } else {
      next({
        status: 400,
        message: `Table must include a ${field}`
      })
    }
  }

  return validateHasText
}

function validateTableNameLength(req, res, next) {
    if(res.locals.table_name.length >= 2) {
      next()
    } else {
      next({
        status: 400,
        message: `Table name must be at least 2 characters`
      })
    }
  }

function validateCapacity(req, res, next) {
  if(Number(res.locals.capacity) > 0) {
    next()
  } else {
    next({
      status: 400,
      message: `Capacity must be greater than 0`
    })
  }
}

async function create(req, res) {
  const newTable = await service.create(req.body.data)
  res.status(201).json({
    data: newTable
  })
}
 
module.exports = {
  list: [
    asyncErrorBoundary(list)
  ],
  create: [
    ["table_name", "capacity"].map(field=>validateHasTextFunction(field)),
    validateTableNameLength,
    validateCapacity,
    asyncErrorBoundary(create)
  ],
};
