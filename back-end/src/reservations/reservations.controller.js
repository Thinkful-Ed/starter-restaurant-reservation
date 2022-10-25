const services = require("./reservations.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */

function getDate() {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
}

async function list(req, res) {
  const data = await services.list(req.query.date ? req.query.date : getDate());
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
