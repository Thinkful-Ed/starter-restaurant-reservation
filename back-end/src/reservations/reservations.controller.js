const service = require("./reservations.service");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date = "" } = req.query;
  res.json({
    data: date.length ? await service.listByDate(date) : await service.list(),
  });
}

module.exports = {
  list,
};
