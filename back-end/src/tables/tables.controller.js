const tablesService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/requiredProperties");

function hasData(req, res, next) {
    if(req.body.data) {
        return next();
    }
    next({ status: 400, message: "Body must have a data property."});
}

const REQUIRED_PROPERTIES = ["table_name", "capacity"];
const hasRequiredProperties = hasProperties(...REQUIRED_PROPERTIES);

function validateTableName(req, res, next) {
    const tableName = req.body.data.table_name;
    if (tableName.length >= 2) {
      return next();
    }
    next({
      status: 400,
      message: "table_name must be longer than 2 characters.",
    });
  }
  
function validateTableCapacity(req, res, next) {
    const capacity = req.body.data.capacity;
    if (capacity >= 1 && typeof capacity === "number") {
      return next();
    }
    next({ status: 400, message: "capacity must be at least 1 person." });
  }

function hasReservationId(req, res, next) {
    const reservation = req.body.data.reservation_id;
    if (reservation) {
      return next();
    }
    next({ status: 400, message: "reservation_id required" });
  }

async function reservationIdExists(req, res, next) {
    const reservation = await tablesService.readReservation(
      req.body.data.reservation_id
    );
    if (reservation) {
      res.locals.reservation = reservation;
      return next();
    }
    next({
      status: 404,
      message: `reservation_id ${req.body.data.reservation_id} does not exist`,
    });
  }

async function reservationIsSeated(req, res, next) {
    const seated = await tablesService.readTableByReservation(
      req.body.data.reservation_id
    );
    if (!seated) {
      return next();
    }
    next({
      status: 400,
      message: "reservation_id is already seated",
    });
  }

  async function tableIdExists(req, res, next) {
    const table_id = req.params.table_id;
    const table = await tablesService.readTable(table_id);
    if (table) {
      res.locals.table = table;
      return next();
    }
    next({
      status: 404,
      message: `table_id ${table_id} does not exist`,
    });
  }

async function hasSufficientCapacity(req, res, next) {
  const table_id = req.params.table_id;
  const table = await tablesService.readTable(table_id);
  const reservation = await tablesService.readReservation(
    req.body.data.reservation_id
  );
    if (reservation.people > table.capacity) {
      next({
        status: 400,
        message: "table capacity is smaller than reservation size",
      });
    } 
    return next();
  }

async function tableIsFree(req, res, next) {
  const table_id = req.params.table_id;
  const table = await tablesService.readTable(table_id);
  if (!table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `table_id is occupied`,
  });
}

async function tableIsOccupied(req, res, next) {
  const table_id = req.params.table_id;
  const table = await tablesService.readTable(table_id);
  if(table.table_status === "occupied") {
    return next();
  }
  next({
    status: 400,
    message: "table_id is not occupied",
  });
}

async function list(req, res) {
    const data = await tablesService.list();
    res.json({ data });
}

async function create(req, res) {
    const table = req.body.data;
    const data = await tablesService.create(table);
    res.status(201).json({ data });
}

async function update(req, res) {
  const { reservation_id } = req.body.data;
  const { table_id } = req.params;
  await tablesService.update(reservation_id, table_id, { status: "seated" });
  res.status(200).json({ data: reservation_id });
}

async function deleteTableReservation(req, res) {
	const { table_id } = req.params;
	const response = await tablesService.deleteTableReservation(table_id)
	res.status(200).json({data:response})
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [
        hasData,
        hasRequiredProperties,
        validateTableName,
        validateTableCapacity,
        asyncErrorBoundary(create),
    ],
    update: [
      hasData,
      hasReservationId,
      asyncErrorBoundary(reservationIdExists),
      asyncErrorBoundary(hasSufficientCapacity),
      asyncErrorBoundary(tableIsFree),
      asyncErrorBoundary(tableIdExists),
      asyncErrorBoundary(reservationIsSeated),
      asyncErrorBoundary(update),
    ],
    delete: [
      asyncErrorBoundary(tableIdExists),
      asyncErrorBoundary(tableIsOccupied),
      asyncErrorBoundary(deleteTableReservation),
    ],
}