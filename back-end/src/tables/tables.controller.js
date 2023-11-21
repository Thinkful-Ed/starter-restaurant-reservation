const tableService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * Update handler for assigning a reservation to a table.
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

async function update(req, res) {
  const table_id = res.locals.table.table_id;
  const reservation_id = req.body.data.reservation_id;
  const data = await tableService.update(table_id, reservation_id);
  res.status(200).json({ data });
}

module.exports = {
  update: [tableExists, update],
};
