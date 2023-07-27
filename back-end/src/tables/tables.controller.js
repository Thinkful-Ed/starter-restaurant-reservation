const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// --------------------------VALIDATION MIDDLEWARE BEGINS-------------------------------------
// Use the VALID_PROPERTIES array to check to see if the data sent to the database has all of the required properties
const VALID_PROPERTIES = ["table_name", "capacity", "reservation_id"];

// If no data is sent with the post or put request return the status and error message
const hasRequiredDataProperties = (req, res, next) => {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: "Body must contain data" });
};

// Makes sure data sent with POST request includes all of hte VALID_PROPERTIES
const hasOnlyValidProperties = (req, res, next) => {
  const { data = {} } = req.body;
  const validProperties = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );
  if (validProperties.length) {
    next({
      status: 400,
      message: `Invalid field(s): ${validProperties.join(", ")}`,
    });
  }
  next();
};

// This Validation middle ware ensures that any arguments passed into the function is present in the data.
const hasProperties = (...properties) => {
  return function (req, res, next) {
    const { data = {} } = req.body;
    try {
      properties.forEach((property) => {
        if (!data[property]) {
          const error = new Error(`A ${property} property is required`);
          error.status = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

// This validation middleware ensures that the table_name data sent with the post request has a length of at least 2 characters.
const tableLengthValidation = (req, res, next) => {
  const { table_name } = req.body.data;
  if (table_name.length < 2) {
    next({
      status: 400,
      message: "table_name must have at least 2 characters",
    });
  }
  next();
};

// This function checks to make sure that newly created tables have a capacity of at least 1
const CapacityCheckValidation = (req, res, next) => {
  const { capacity } = req.body.data;
  if (capacity < 1 || typeof capacity !== "number") {
    next({
      status: 400,
      message: "table capacity must be able to seat at least one person",
    });
  }
  next();
};

// This function creates a new table in the database
const create = async (req, res, next) => {
  const data = await service.create(req.body.data);
  res.status(201).json({ data: data });
};

// This function uses the reservation id in the body data to see if a reservation matching the id exists in the database. if it does it stores that message as res.locals. If it no reservation is found in the database send the status and error message.
const reservationExists = async (req, res, next) => {
  const { reservation_id } = req.body.data;
  const reservation = await service.readReservation(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `No reservation_id matching ${reservation_id} found in the database`,
  });
};

//  This validation searches the database for a table with the matching id. if a table is found it is stored in res.locals. if no matching id is found send the status and error message
const tableExists = async (req, res, next) => {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `No table_id matching ${table_id} forund in the database `,
  });
};

// checks to make sure that the number of people is smaller than the table capacity size. if number of people to large for table status error message is sent.
const canTableFitParty = (req, res, next) => {
  const { people } = res.locals.reservation;
  const { capacity } = res.locals.table;
  if (people > capacity) {
    return next({
      status: 400,
      message: "Table capacity is to small to fit your party size",
    });
  }
  next();
};

// checks to see if a reservation_id is currently at a table. If a reservation_id is at the table then the table is occupied. If the table is occupied send the status error message.
const isTableOccupied = (req, res, next) => {
  const { reservation_id } = res.locals.table;
  if (reservation_id) {
    return next({ status: 400, message: "table is currently occupied" });
  }
  next();
};

// this validation middleware makes sure that the current table is not occupied.
const tableIsNotOccupied = (req, res, next) => {
  const { reservation_id } = res.locals.table;
  if (!reservation_id) {
    return next({ status: 400, message: "not occupied" });
  }
  next();
};

// this validation middleware checks to see if the reservation status is currently seated. If the reservation status is currently seated send the status error message.
const isReservationAlreadySeated = (req, res, next) => {
  const { status } = res.locals.reservation;
  if (status && status === "seated") {
    return next({ status: 400, message: "reservation is already seated" });
  }
  next();
};

// retrieves the reservation from the database with the matching id. if no reservation is found send the status error message
const findReservation = async (req, res, next) => {
  const { reservation_id } = res.locals.table;
  const reservation = await service.readReservation(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `no reservation with ID ${reservation_id} found`,
  });
};
// --------------------------------VALIDATION MIDDLEWARE ENDS --------------------------------

// This function will send all the tables in the database
const list = async (req, res, next) => {
  const tableList = await service.list();
  res.json({ data: tableList });
};

// Made Change
// updates the reservation status to seated and the tables status to occupies
const seatReservation = async (req, res, next) => {
  const updatedTable = {
    ...req.body.data,
    table_id: res.locals.table.table_id,
  };
  const updatedReservation = {
    ...res.locals.reservation,
    status: "seated",
  };
  const data = await service.update(updatedTable, updatedReservation);
  res.json({ data });
};

// This validation middleware removes reservation_id from the table, changes the reservation status to finished, and table status to free
const finishReservation = async (req, res, next) => {
  const table = res.locals.table;
  const updatedTable = {
    ...table,
    reservation_id: null,
    status: "free",
  };
  const updatedReservation = {
    ...res.locals.reservation,
    reservation_id: res.locals.reservation.reservation_id,
    status: "finished",
  };
  const data = await service.update(updatedTable, updatedReservation);
  res.json({ data });
};

module.exports = {
  create: [
    hasRequiredDataProperties,
    hasOnlyValidProperties,
    hasProperties("table_name", "capacity"),
    tableLengthValidation,
    CapacityCheckValidation,
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
  seatReservation: [
    asyncErrorBoundary(tableExists),
    hasRequiredDataProperties,
    hasProperties("reservation_id"),
    asyncErrorBoundary(reservationExists),
    isReservationAlreadySeated,
    canTableFitParty,
    isTableOccupied,
    asyncErrorBoundary(seatReservation),
  ],
  finishReservation: [
    asyncErrorBoundary(tableExists),
    tableIsNotOccupied,
    asyncErrorBoundary(findReservation),
    asyncErrorBoundary(finishReservation),
  ],
};