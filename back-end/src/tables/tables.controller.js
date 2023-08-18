const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");

function quantityValidator(field) {
  return function (req, _res, next) {
    const { data: { [field]: value } = {} } = req.body;
    if (value < 1) {
      return next({
        status: 400,
        message: `${field} must be at least 1`,
      });
    }
    if (!Number.isInteger(value)) {
      return next({
        status: 400,
        message: `${field} must be an integer`,
      });
    }
    next();
  };
}

function nameValidator(field) {
  return function (req, _res, next) {
    const { data: { [field]: value } = {} } = req.body;
    if (!value) {
      return next({
        status: 400,
        message: `${field} is missing`,
      });
    }
    if (value.length < 2) {
      return next({
        status: 400,
        message: `${field} must be at least 2 characters`,
      });
    }
    next();
  };
}

async function capacityValidator(req, res, next) {
  // console.log("capacityValidator");
  if (!req.body.data) {
    return next({
      status: 400,
      message: "data is missing",
    });
  }

  if (!req.body.data.reservation_id) {
    return next({
      status: 400,
      message: "reservation_id is missing",
    });
  }

  const reservation = await reservationsService.read(
    req.body.data.reservation_id
  );

  if (!reservation) {
    return next({
      status: 404,
      message: `reservation_id ${req.body.data.reservation_id} not found`,
    });
  }
  const table = await service.read(req.params.table_id);
  if (reservation.people > table.capacity) {
    return next({
      status: 400,
      message: "Table capacity exceeded",
    });
  }
  next();
}

async function isOccupied(req, res, next) {
  const { table_id } = req.params;
  const { reservation_id } = req.body.data;
  const table = await service.read(table_id);

  if (table.reservation_id) {
    return next({
      status: 400,
      message: "Table is occupied",
    });
  }
  next();
}

async function isNotOccupied(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);

  if (!table.reservation_id) {
    return next({
      status: 400,
      message: "Table is not occupied",
    });
  }
  next();
}

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (!table) {
    return next({
      status: 404,
      message: `Table ${table_id} cannot be found.`,
    });
  }
  next();
}

async function reservationIsNotSeated(req, res, next) {
  const { reservation_id } = req.body.data;
  const reservation = await reservationsService.read(reservation_id);
  if (reservation.status === "seated") {
    return next({
      status: 400,
      message: "Reservation is already seated",
    });
  }
  next();
}

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function create(req, res) {
  const response = await service.create(req.body.data);
  res.status(201).json({ data: response });
}

async function update(req, res) {
  const { table_id } = req.params;
  const { reservation_id } = req.body.data;
  // console.log("update");
  // console.log({ reservation_id, table_id });
  // console.log(req.body.data);
  // console.log(req.params);
  // console.log({ table_id, reservation_id });
  const response = await service.update(table_id, reservation_id);
  // console.log(response);
  res.status(200).json({ data: response });
}

async function destroy(req, res) {
  const { table_id } = req.params;
  const response = await service.update(table_id, null);
  res.status(200).json({ data: response });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    nameValidator("table_name"),
    quantityValidator("capacity"),
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(capacityValidator),
    asyncErrorBoundary(isOccupied),
    asyncErrorBoundary(reservationIsNotSeated),
    asyncErrorBoundary(update),
  ],
  delete: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(isNotOccupied),
    asyncErrorBoundary(destroy),
  ],
};
