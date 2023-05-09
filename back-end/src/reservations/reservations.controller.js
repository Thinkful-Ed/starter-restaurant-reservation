/**
 * List handler for reservation resources
 */
const reservationsService = require('./reservations.service');

async function list(req, res) {
  res.json({ data: await reservationsService.list() });
}

module.exports = {
  list,
};
