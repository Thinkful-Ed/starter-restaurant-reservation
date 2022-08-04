const tableService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  res.json({ data: await tableService.list() });
}

async function hasOnlyValidProperties(req, res, next) {
  const VALID_PROPERTIES = ["table_name", "capacity", "reservation_id"];
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")},`,
    });
  }
  next();
}
async function hasRequiredProperties(req, res, next) {
  const hasProperties = ["table_name", "capacity"];
  const { data = {} } = req.body;
  errorMessages = [];
  try {
    hasProperties.forEach((property) => {
      const value = data[property];
      if (!value) {
        errorMessages.push(`A '${property}' field is required.`);
      }
      if (property === "table_name" && value) {
        if (value.length <= 1) {
          errorMessages.push(
            `Table name should have at least 2 characters, please update table_name.`
          );
        }
      }
      if (property === "capacity" && value) {
        if (value <= 0) {
          errorMessages.push(`The capacity must be greater than 0`);
        }
        if (typeof value !== "number") {
          errorMessages.push(`The capacity must be a number`);
        }
      }
    });
    if (errorMessages.length > 0) {
      next({
        status: 400,
        message: errorMessages.join("\n"),
      });
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  await tableService
    .create(req.body.data)
    .then((data) => {
      return res.status(201).json({ data });
    })
    .catch(next);
}

async function validCapacity(req, res, next) {
  const tableData = await tableService.read(req.params.table_id);
  const reservationData = await tableService.readReservation(
    req.body.data.reservation_id
  );

  if (tableData.capacity < reservationData.people) {
    return next({
      status: 400,
      message: `Too many people, capacity is ${tableData.capacity}`,
    });
  }
  if (tableData.reservation_id) {
    return next({
      status: 400,
      message: `This table is currently occupied.`,
    });
  }

  next();
}

async function update(req, res, next) {
  const updatedReservationId = req.body.data;

  res.json({
    data: await tableService.update(updatedReservationId, req.params.table_id),
  });
}
async function byeByeOccupiedTable(req, res, next) {
  const { table_id } = req.params;

  const reservationIsThere = await tableService.read(table_id);

  if (reservationIsThere.reservation_id) {
    res.json({
      data: await tableService.freeUpTable(
        table_id,
        reservationIsThere.reservation_id
      ),
    });
  }
  return next({
    status: 400,
    message: `This table is not occupied.`,
  });
}
async function tableIdExists(req, res, next) {
  const tableId = await tableService.read(req.params.table_id);

  if (tableId) {
    return next();
  }
  return next({
    status: 404,
    message: `The table id does not exist, ${req.params.table_id}.`,
  });
}

async function reservationIdExists(req, res, next) {
  if (!req.body.data) {
    return next({
      status: 400,
      message: `Data is missing!`,
    });
  }

  if (!req.body.data.reservation_id) {
    return next({
      status: 400,
      message: `Reservation id is missing, reservation_id!`,
    });
  }
  const reservation = await tableService.readReservation(
    req.body.data.reservation_id
  );

  if (!reservation) {
    return next({
      status: 404,
      message: `Reservation id does not exist ${req.body.data.reservation_id}.`,
    });
  }

  if (reservation) {
    if (reservation.status === "seated") {
      return next({
        status: 400,
        message: `The status of this reservation is seated!`,
      });
    }

    return next();
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(hasOnlyValidProperties),
    asyncErrorBoundary(hasRequiredProperties),
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(tableIdExists),
    asyncErrorBoundary(reservationIdExists),
    asyncErrorBoundary(validCapacity),
    asyncErrorBoundary(update),
  ],
  byeByeOccupiedTable: [
    asyncErrorBoundary(tableIdExists),
    asyncErrorBoundary(byeByeOccupiedTable),
  ],
};
