const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
/**
 * List handler for reservation resources
 */
// List handler for reservation resources
async function list(req, res) {
  const { date } = req.query;
  const reservationsByDate = await reservationsService.list(date);
  res.json({
    data: reservationsByDate,
  });
}
module.exports = {
  list: asyncErrorBoundary(list)
};
