const service = require("./tables.service");

function dataExists(req, res, next) {
  const { data } = req.body;

  if (!data) {
    next({ status: 400, message: "" });
  }

  res.locals.data = data;
  next();
}

function tableNameVerification(req, res, next) {
  if (!res.locals.data.table_name) {
    next({ status: 400, message: "table_name is missing" });
  }

  if (res.locals.data.table_name.length < 2) {
    next({
      status: 400,
      message: "table_name must be more then one character long",
    });
  }

  next();
}

function capacityVerification(req, res, next) {
  if (!res.locals.data.capacity) {
    next({ status: 400, message: "capacity is missing." });
  }

  if (!Number.isInteger(res.locals.data.capacity)) {
    next({ status: 400, message: "capacity must be an integer." });
  }

  if (res.locals.data.capacity === 0) {
    next({ status: 400, message: "capacity must be greater than 0." });
  }

  next();
}

async function reservationIdExistsInDatabase(req, res, next) {
  const check = await service.readRes(res.locals.data.reservation_id);
  if (!check) {
    next({
      status: 404,
      message: `reservation id: ${res.locals.data.reservation_id} does not exist`,
    });
  }

  next();
}

function reservationIdExistsInBody(req, res, next) {
  if (!res.locals.data.reservation_id) {
    next({ status: 400, message: "reservation_id is missing." });
  }

  next();
}

async function capacityMatch(req, res, next) {
  const reservation = await service.readRes(res.locals.data.reservation_id);
  const table = await service.readTable(req.params.table_id);

  if (table.capacity < reservation.people) {
    next({
      status: 400,
      message: "party exceeds table capacity",
    });
  }

  res.locals.table = table;
  next();
}

function tableOccupied(req, res, next) {
  if (res.locals.table.table_status !== null) {
    next({ status: 400, message: "occupied" });
  }

  next();
}

async function tableExists(req, res, next) {
  const table = await service.readTable(req.params.table_id);

  if (!table) {
    next({
      status: 404,
      message: `table ${req.params.table_id} does not exist.`,
    });
  }

  res.locals.table = table;
  next();
}

function tableNotOccupied(req, res, next) {
  if (res.locals.table.table_status === null) {
    next({ status: 400, message: "table is not occupied" });
  }

  next();
}

async function list(req, res) {
  res.json({ data: await service.list() });
}

async function create(req, res) {
  res.status(201).json({ data: await service.create(req.body.data) });
}

async function update(req, res) {
  const { reservation_id } = req.body.data;
  const { table_id } = req.params;

  res
    .status(200)
    .json({ data: await service.update(reservation_id, table_id) });
}

async function destroy(req, res) {
  await service.finish(req.params.table_id);
  res.sendStatus(200);
}

module.exports = {
  list,
  create: [dataExists, capacityVerification, tableNameVerification, create],
  update: [
    dataExists,
    reservationIdExistsInBody,
    reservationIdExistsInDatabase,
    capacityMatch,
    tableOccupied,
    update,
  ],
  destroy: [tableExists, tableNotOccupied, destroy],
};
