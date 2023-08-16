const reservationsService = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

/**
 * List handler for reservation resources
 */

async function list(req, res) {
  const reservations = await reservationsService.list();
  res.json({ data: reservations });
}

module.exports = {
	list: asyncErrorBoundary(list),
};
