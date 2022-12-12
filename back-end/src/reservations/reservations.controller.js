const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const service = require("./reservationsService")
/**
 * List handler for reservation resources
 */


async function list(req, res) {
  console.log(req.params)
  res.json({
    data: await service.list()
  });
}

async function create(req, res,) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data })
}

module.exports = {
  list,
  create,

};
