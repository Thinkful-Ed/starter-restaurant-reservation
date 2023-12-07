const tableService = require("./tables.service");
const reservationService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasValidTableProperties = require("../errors/table_errors/hasValidTableProperties");
const validateTableStatusUpdate = require("../errors/table_errors/validateTableStatusUpdate");

/**
 * List handler for table resources
 */
async function list(req, res, next) {
  const data = await tableService.list();
  res.status(200).json({ data });
}

/**
 * Handler to check that data exists for a create table request
 */
const dataExists = (req, res, next) => {
  if (!req.body.data) {
    next({
      status: 400,
      message: `Data is missing.`,
    });
  }
  next();
};

/**
 * Handler to check if the create request has required table properties
 */

const hasRequiredProperties = hasProperties("table_name", "capacity");
/**
 * Handler to check if the create request has valid table properties
 */
const hasValidProperties = hasValidTableProperties("table_name", "capacity");

/**
 * Create handler for a new reservation
 */

async function create(req, res, next) {
  const table = req.body.data;
  const data = await tableService.create(table);
  res.status(201).json({ data });
}

/**
 * Handler to check that data exists for an update table request
 */

async function tableExists(req, res, next) {
  const table_id = req.params.table_id;
  const table = await tableService.read(table_id);
  if (table) {
    res.locals.table = table;
    next();
  } else {
    next({ status: 404, message: `Table Id${table_id} does not exist` });
  }
}

/**
 * Read handler for a table
 */
function read(req, res, next) {
  const data = res.locals.table;
  res.status(200).json({ data });
}

/**
 * Update handler for assigning a reservation to a table
 */

async function update(req, res) {
  const table_id = res.locals.table.table_id;
  const reservation_id = req.body.data.reservation_id;
  const data = await tableService.update(table_id, reservation_id);
  res.status(200).json({ data });
  //updates reservation status to "seated"
  const reservationData = await reservationService.updateStatus(
    reservation_id,
    "seated"
  );
  res.status(200).json({ data: reservationData });
}

/**
 * Delete handler for removing a reservation from a table and marking the reservation as finished
 */
async function destroy(req, res, next) {
  const table = res.locals.table;
  if (table.reservation_id === null) {
    next({ status: 400, message: `Table ${table.table_id} is not occupied.` });
  } else {
    await tableService.destroy(table.table_id);
    res.status(200).json({ data: "Deleted" });
    //calls the reservation server to update the deleted reservation's status to "finished".
    const reservationData = reservationService.updateStatus(
      table.reservation_id,
      "finished"
    );
    res.status(200).json({ data: reservationData });
  }
}

module.exports = {
  list,
  read: [asyncErrorBoundary(tableExists), read],
  create: [
    dataExists,
    hasRequiredProperties,
    hasValidProperties,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(validateTableStatusUpdate),
    asyncErrorBoundary(update),
  ],
  destroy: [asyncErrorBoundary(tableExists), asyncErrorBoundary(destroy)],
};
