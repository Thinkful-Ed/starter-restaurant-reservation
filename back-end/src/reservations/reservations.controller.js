const service = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  console.log('hi')
  const data = await service.list()
  res.json({
    data
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
