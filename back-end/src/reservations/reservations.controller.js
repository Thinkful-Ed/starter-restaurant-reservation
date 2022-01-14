const service = require('/reservations.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const hasProperties = require('../errors/hasProperties')

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  res.json({
    data: [],
  });
}
console.log('wooo')
module.exports = {
  list,
};
