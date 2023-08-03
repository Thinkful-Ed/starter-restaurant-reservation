/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const response = await service.list()

  res.json({ data: response})
}

module.exports = {
  list,
};
