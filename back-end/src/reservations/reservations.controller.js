const service = require("./reservations.service");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const data = await service.list(req.query.date);

  res.json({
    data,
  });
}

async function create(req, res) {
  const data = await service.create(req.body.data);

  res.status(201).json({
    data: data,
  });
}

module.exports = {
  create,
  list,
};
