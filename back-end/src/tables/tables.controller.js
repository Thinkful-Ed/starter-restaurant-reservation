const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const validateData = (req, res, next) => {
  const data = req.body.data;
  if (!data) {
    next({ status: 400, message: "Body must include a data object" });
  }
  next();
};

const validateBody = (req, res, next) => {
  if (!req.body.data.table_name || req.body.data.table_name === "") {
    return next({ status: 400, message: "'table_name' field cannot be empty" });
  }

  if (req.body.data.table_name.length < 2) {
    return next({
      status: 400,
      message: "'table_name' field must be at least 2 characters",
    });
  }

  if (!req.body.data.capacity || req.body.data.capacity === "") {
    return next({ status: 400, message: "'capacity' field cannot be empty" });
  }

  //if (!Number(req.body.data.capacity)) {
  if (typeof req.body.data.capacity !== "number") {
    return next({ status: 400, message: "'capacity' field must be a number" });
  }

  if (req.body.data.capacity < 1) {
    return next({
      status: 400,
      message: "'capacity' field must be at least 1",
    });
  }

  next();
};

//checking to see if the reservation exist
async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  if (!reservation_id) {
    next({
      status: 400,
      message: `A reservation_id is required`,
    });
  }
  const reservation = await resService.read(reservation_id);
  if (reservation) {
    res.locals.res = reservation;
    next();
  } else {
    next({
      status: 404,
      message: `A reservation with the id ${reservation_id} was not found.`,
    });
  }
}
//checking to see if the table exist
async function tableExists(req, res, next) {
  const table_id = Number(req.params.table_id);
  const table = await service.readTable(table_id);
  if (table) {
    res.locals.table = table;
    next();
  } else {
    next({
      status: 404,
      message: `Table with id ${table_id} does not exist.`,
    });
  }
}

//checeking availability =====>>>>>>
const tableIsAvailable = (req, res, next) => {
  const available = res.locals.table.reservation_id;
  if (available) {
    next({
      status: 400,
      message: `Table ${res.locals.table.table_id} is currently not available. Please use another table.`,
    });
  }
  next();
};
//=====>>>>>>>>
async function validateAvailability(req, res, next) {
  const table_id = Number(req.params.table_id);
  const table = await service.readTable(table_id);

  if (table.reservation_id) {
    res.locals.table = table;
    next();
  } else {
    next({
      status: 400,
      message: `Table is not available.`,
    });
  }
}

const validateSeatedTable = (req, res, next) => {
  const { status } = res.locals.res;
  if (status === "seated") {
    next({
      status: 400,
      message: `This reservation is already at a table!`,
    });
  }
  next();
};

const validateTableSeating = (req, res, next) => {
  const partySize = res.locals.partySize;
  const capacity = res.locals.table.capacity;
  if (partySize > capacity) {
    next({
      status: 400,
      message: `The party size is greater than the table capacity. Please select another table.`,
    });
  }
  next();
};

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

//create a available table
async function create(req, res) {
  req.body.data.status = "free";
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

//Seats a Table
async function update(req, res) {
  await service.occupy(
    res.locals.table.table_id,
    res.locals.reservation.reservation_id
  );
  await service.updateReservation(
    res.locals.reservation.reservation_id,
    "seated"
  );

  res.status(200).json({ data: { status: "seated" } });
}

//Displays Finished Table
async function destroy(req, res) {
  await service.updateReservation(res.locals.table.reservation_id, "finished");
  await service.free(res.locals.table.table_id);

  res.status(200).json({ data: { status: "finished" } });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(validateData),
    asyncErrorBoundary(validateBody),
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(validateData),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(tableIsAvailable),
    asyncErrorBoundary(validateSeatedTable),
    asyncErrorBoundary(validateTableSeating),
    asyncErrorBoundary(update),
  ],
  destroy: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(validateAvailability),
    asyncErrorBoundary(destroy),
  ],
};
