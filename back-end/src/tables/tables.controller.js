const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function create(req, res, next) {
  const { table_name, capacity } = req.body.data;
  
  const result = await service.create({
    table_name,
    capacity,
  });
  res.status(201);
  res.json({ data: result });
}

function hasData(req, res, next) {
  if (!req.body.data) {
    next({ status: 400, message: "Table lacks required data." });
  } else next();
}

const hasTableName = (req, res, next) => {
  const { data: { table_name } = {} } = req.body;
  if (table_name && table_name.length > 1) {
    return next();
  }
  return next({ status: 400, message: "a table_name is required" });
};

const hasCapacity = (req, res, next) => {
  let { data: { capacity } = {} } = req.body;
  if (capacity && typeof capacity === "number") {
    return next();
  }
  return next({ status: 400, message: "a valid capacity is required" });
};

async function update(req, res) {
  const data = await service.update(
    res.locals.table.table_id,
    res.locals.reservation.reservation_id
  );
  res.json({ data });
}

async function tableExists(req, res, next) {
  const table = await service.read(req.params.table_id);

  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `Table ${req.params.table_id} cannot be found.`,
  });
}

async function reservationExists(req, res, next) {
  const { data: { reservation_id } = {} } = req.body;
  if (reservation_id) {
    const reservation = await service.readReservation(reservation_id);
    if (reservation) {
      res.locals.reservation = reservation;
      return next();
    }
    return next({
      status: 404,
      message: `reservation ${reservation_id}} does not exist`,
    });
  } else {
    return next({
      status: 400,
      message: `reservation_id does not exist`,
    });
  }
}

const hasAvailability = (req, res, next) => {
  if (res.locals.table.reservation_id !== null) {
    return next({ status: 400, message: "table is occupied" });
  }

  if (res.locals.reservation.status === "seated") {
    return next({ status: 400, message: "reservation is all ready seated" });
  }

  if (res.locals.table.capacity >= res.locals.reservation.people) {
    return next();
  }
  return next({ status: 400, message: "a valid capacity is required" });
};

async function destroy(req, res, next) {
  if (res.locals.table.reservation_id) {
    await service.destroy(res.locals.table);
    res.sendStatus(200);
  } else next({ status: 400, message: "table is not occupied" });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasData, hasTableName, hasCapacity, asyncErrorBoundary(create)],
  update: [
    asyncErrorBoundary(tableExists),
    hasData,
    reservationExists,
    hasAvailability,
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(tableExists), asyncErrorBoundary(destroy)],
};