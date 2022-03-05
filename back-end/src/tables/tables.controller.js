const service = require("./tables.service");
const tableValidator = require("../errors/tableValidator");
const seatValidator = require("../errors/seatValidator");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  res.json({ data: await service.list() });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  data.people = parseInt(data.people);
  res.status(201).json({ data });
}

async function read(req, res, next) {
  const { table_id } = req.params;
  const data = await service.read(table_id);
  if (!data)
    next({
      status: 404,
      message: `Table id ${table_id} does not exit`,
    });
  res.json({ data });
}

async function addReservation(req, res) {
  const { table_id } = req.params;
  res.json({ data: await service.addReservation(req.body.data, table_id) });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [tableValidator, asyncErrorBoundary(create)],
  read: asyncErrorBoundary(read),
  addReservation: [
    asyncErrorBoundary(seatValidator),
    asyncErrorBoundary(addReservation),
  ],
};
