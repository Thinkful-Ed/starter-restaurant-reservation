/**
 * List handler for reservation resources
 */
const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
  const date = req.query.date
  console.log(date)
  const data = date ? await service.listDate(date) : await service.list()
  res.json({ data })
}

module.exports = {
  list: [asyncErrorBoundary(list)],
}
