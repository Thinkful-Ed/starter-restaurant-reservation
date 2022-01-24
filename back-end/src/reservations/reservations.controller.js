const service = require('./reservations.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const hasProperties = require('../errors/hasProperties')

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const date = req.query
  res.json({
    data: [],
  });
}

module.exports = {
  list,
};
