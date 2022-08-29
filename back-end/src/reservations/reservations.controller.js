/**
 * List handler for reservation resources
 */
 const service = require("./reservations.service");
 const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

 async function list(req, res) {
  const query = req.query.date;
  const data = query ? await service.listDate(query) : await service.list();

  res.json({
    data,
  });
}

module.exports = {
 list:[ asyncErrorBoundary(list)],
};
