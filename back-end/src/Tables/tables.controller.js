const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const listedTable = await service.listTables();
  res.json({
    data: listedTable.sort((table1, table2) => {
      return table1.table_name.localeCompare(table2.table_name);
    }),
  });
}

function hasContent(req, res, next) {
  const { data } = req.body;
  const contents = Object.values(data);
  const hasContent = contents.every((content) => content);
  if (hasContent) {
    next();
  } else {
    const emptyProp = [];
    for (const prop in data) {
      if (!data[prop] || data[prop] <= 0) {
        emptyProp.push(prop);
      }
    }
    next({ status: 400, message: `Missing ${emptyProp}` });
  }
}

function hasProp(req, res, next) {
  const { data } = req.body;
  const requiredProps = ["table_name", "capacity"];
  const props = Object.keys(data);
  const hasProps = requiredProps.every((prop) => {
    return props.includes(prop);
  });
  if (hasProps) {
    next();
  } else {
    const missingProps = requiredProps.filter((prop) => !props.includes(prop));
    if (missingProps.length > 0)
      next({
        status: 400,
        message: `You are missing the ${missingProps} property`,
      });
  }
}

function checkData(req, res, next) {
  if (req.body.data) {
    next();
  } else {
    next({ status: 400, message: "Need data key" });
  }
}

function checkCapacity(req, res, next) {
  const { capacity } = req.body.data;
  console.log(typeof capacity);
  console.log(capacity);
  if (typeof capacity === "number") {
    next();
  } else {
    next({ status: 400, message: "capacity must be a number" });
  }
}

function checkTableNameLength(req, res, next) {
  const { table_name } = req.body.data;
  if (table_name.length > 1) {
    next();
  } else {
    next({ status: 400, message: "table_name must be more than one charater" });
  }
}

function hasReservationId(req, res, next) {
  if (req.body.data.reservation_id) {
    next();
  } else {
    next({ status: 400, message: "missing reservation_id prop" });
  }
}

async function create(req, res) {
  res.status(201).json({ data: await service.create(req.body.data) });
}

async function update(req, res) {
  res.json({
    data: await service.update(
      req.params.tableId,
      req.body.data.reservation_id
    ),
  });
}

async function checkReservation(req, res, next) {
  const { reservation_id } = req.body.data;
  const checkReservation = await service.readReservation(reservation_id);
  if (checkReservation) {
    res.locals.targetReservation = checkReservation;
    next();
  } else {
    next({
      status: 404,
      message: `${reservation_id} does not exist`,
    });
  }
}

async function checkIfTableCanFit(req, res, next) {
  const { tableId } = req.params;
  const checkTable = await service.readTable(tableId);
  if (checkTable.capacity >= res.locals.targetReservation.people) {
    res.locals.targetTable = checkTable;
    next();
  } else {
    next({
      status: 400,
      message: "The capacity of the table cannot fit the number of people",
    });
  }
}

function checkIfOccupied(req, res, next) {
  if (!res.locals.targetTable.reservation_id) {
    next();
  } else {
    next({ status: 400, message: "Table is occupied" });
  }
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    checkData,
    hasProp,
    hasContent,
    checkCapacity,
    checkTableNameLength,
    asyncErrorBoundary(create),
  ],
  update: [
    checkData,
    hasReservationId,
    checkReservation,
    hasContent,
    checkIfTableCanFit,
    checkIfOccupied,
    asyncErrorBoundary(update),
  ],
};
