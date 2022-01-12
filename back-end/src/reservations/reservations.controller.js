const service = require("./reservations.service");

async function list(req, res) {
  const data = await service.list();
  res.send({ data });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.send({ data });
}

module.exports = {
  list,
  create,
};
