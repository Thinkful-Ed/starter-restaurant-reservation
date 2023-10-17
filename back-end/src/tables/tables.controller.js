const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const VALID_PROPERTIES = [
  "table_id",
  "table_name",
  "capacity",
  "reservation_id",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  next();
}

const hasRequiredProperties = hasProperties("table_name", "capacity");

async function tableExists(req, res, next) {
    const { table_id }= req.params;
    const table = await service.read(table_id);
    if (table) {
      res.locals.table = table;
      return next();
    }
    next({
      status: 404,
      message: `Table id ${table_id} does not exist.`,
    });
}

async function reservationIdExists(req, res, next){
    if(req.body.data){
        const reservation_id = req.body.data.reservation_id;
        const reservation = await service.readReservation(reservation_id);
        if (reservation) {
          res.locals.reservation = reservation;
          return next();
        }
        next({
          status: 404,
          message: `Resevation id ${reservation_id} does not exist.`,
        });
    }
}

function validTableName(req, res, next) {
  const tableName = req.body.data.table_name;
  if (tableName.length <= 1) {
    next({
      status: 400,
      message: `table_name must be longer than one character.`,
    });
  }
    next();
  
}

function capacityIsNum(req, res, next){
    const capacity =  req.body.data.capacity;
    if(typeof capacity !== 'number'){
        next({
            status: 400,
            message: 'capacity must be a number.'
        });
    } else {
        next();
    }
}

function hasEnoughCapacity(req, res, next) {
  const { reservation, table } = res.locals;
  if (Number(table.capacity) < Number(reservation.people)) {
    next({
      status: 400,
      message: `table does not have enough capacity for reservation party.`,
    });
  } 
    return next();
  
}

function tableIsNotTaken(req, res, next) {
  const { reservation_id } = res.locals.table;
  if (reservation_id) {
    return next({
      status: 400,
      message: `table is occupied.`,
    });
  } 
    next();
 
}

function tableIsTaken(req, res, next) {
  const { reservation_id } = res.locals.table;
  if (!reservation_id) {
    return next({
      status: 400,
      message: `table is not occupied.`,
    });
  } 
    next();

}

function statusNotSeated(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "seated") {
    next({
      status: 400,
      message: `reservation status is ${status}.`,
    });
  } else {
    return next();
  }
}

async function updateStatusToSeated(req, res, next) {
  const updatedReservation = {
    ...res.locals.reservation,
    status: "seated",
  };
  await service.updatedReservationStatus(updatedReservation);
  next();
}

async function clearTable(req, res, next) {
  const reservation = await service.readReservation(
    res.locals.table.reservation_id
  );
  const updatedReservation = { ...reservation, status: "finished" };
  await service.updatedReservationStatus(updatedReservation);
  await service.clearTable(req.params.table_id);
  res.status(200).json({});
}

async function list(req, res) {
  const data = await service.list();
  res.json({ data: data });
}

async function create(req, res, next) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data: data });
}

async function read(req, res) {
  const data = res.locals.table;
  res.json({ data: data });
}

async function update(req, res) {
  const updatedTable = {
    ...req.body.data,
    table_id: res.locals.table.table_id
  };
  const data = await service.update(updatedTable);
  res.status(200).json({ data: data });
}

async function destroy(req, res) {
  const { table } = res.locals;
  await service.delete(table.table_id);
  res.sendStatus(204);
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    validTableName,
    capacityIsNum,
    asyncErrorBoundary(create),
  ],
  update: [
    hasOnlyValidProperties,
    hasProperties('reservation_id'),
    tableExists,
    reservationIdExists,
    hasEnoughCapacity,
    tableIsNotTaken,
    updateStatusToSeated,
    statusNotSeated,
    asyncErrorBoundary(update),
  ],
  clearTable: [
    tableExists,
    asyncErrorBoundary(tableIsTaken),
    asyncErrorBoundary(clearTable),
  ],
  delete: [asyncErrorBoundary(tableExists), asyncErrorBoundary(destroy)],
};
