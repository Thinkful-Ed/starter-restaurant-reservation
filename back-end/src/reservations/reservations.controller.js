const asyncErrorBoundary = require("../errors/asynchErrorBoundry");
const service = require("./reservations.service")

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  let date = req.query.date
  console.log(date)
  const data = await service.list(date)
  res.json({
    data: data,
  });
}

async function create(req, res){
  const data = await service.create(req.body.data)
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: asyncErrorBoundary(create)
};