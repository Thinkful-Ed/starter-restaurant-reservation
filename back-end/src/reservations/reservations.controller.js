const service = require('./reservations.service')

async function list(req, res) {
  res.json({
    data: [],
  });
}

const create = async(req, res, _next) => {
  res.status(201).json({data : await service.create(req.body.data)})
}

module.exports = {
  list,
  create,
};
