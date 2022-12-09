const reservationsService = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
/**
 * List handler for reservation resources
 */
 async function list(req, res) {
  res.json({ data: await reservationsService.list() })
}

async function create(req, res, next) {
  res.status(201).json({ data: await reservationsService.create(req.body.data)})
  .catch(next)
}

module.exports = {
  list,
  create: asyncErrorBoundary(create),
};
