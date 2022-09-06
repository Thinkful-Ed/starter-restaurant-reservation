/**
 * List handler for table resources
 */
const service = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { table } = require("../db/connection");
 
function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const properties = [
    "table_name",
    "capacity",
  ];

  if (!data) {
    const error = new Error(`Data is required.`);
    error.status = 400;
    next(error);
  }
  properties.forEach((property) => {
    if (!data[property]) {
      const error = new Error(`A '${property}' property is required.`);
      error.status = 400;
      next(error);
    }
  });

  if (data.table_name.length <= 1) {
    return next({
      status: 400,
      message: `Property "table_name" must be two or more characters.`,
    });
  }

  if (typeof data.capacity !== "number") {
    return next({
      status: 400,
      message: `Property "capacity" must be a number.`,
    });
  }

  next();
}

async function tableExists(req, res, next) {
  const tableId = req.params.table_id;
  const table = await service.read(tableId);
  if (table) {
    res.locals.table = table;
    return next();
  }
  return next({ status: 404, message: `Table cannot be found.` });
}

async function list(req, res) {
    const data = await service.list();
    res.json({ data: data });
}

async function create(req, res, next) {
  service
    .create(req.body.data)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
}

async function update(req, res, next) {
  if(!req.body.data){
    return next({ status: 400, message: `Data cannot be found.` });
  }
  if (!req.body.data.reservation_id) {
    return next({ status: 400, message: `Data requires reservation_id.` });
  }
  const resCheck = await service.reservationCheck(req.body.data.reservation_id)
  if (!resCheck){
    return next({ status: 404, message: `Reservation id ${req.body.data.reservation_id} does not exist`})
  }
  const updatedTable = {
    ...req.body.data,
    table_id: res.locals.table.table_id,
  };
  const data = await service.update(updatedTable);
  res.status(201).json({ data: data });
}
  
module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasOnlyValidProperties,
    asyncErrorBoundary(create)
  ],
  update: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(update)
  ]
};
  