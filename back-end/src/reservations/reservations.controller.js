const reservationsService = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

/**
 * List handler for reservation resources
 */

// list all reservations for one date only. (E.g. if the URL is `/dashboard?date=2035-12-30`
//then send a GET to `/reservations?date=2035-12-30` to list the reservations for that date).
//The date is defaulted to today, and the reservations are sorted by time.

async function list(req, res) {
  const reservations = await reservationsService.list();
  res.json({ data: reservations });
}

module.exports = {
	list: asyncErrorBoundary(list),
};
