const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */
async function list(req, res, next) {
  const data = await reservationsService.list();
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
