const reservationsService = require("./reservations.service");
const asyncErrorboundary = require("../errors/asyncErrorBoundary");
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  res.json(await {data: reservationsService.list()});
}

module.exports = {
  list: [asyncErrorboundary(list)],
};
