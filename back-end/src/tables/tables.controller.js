const service = require("./tables.service");

const list = async (req, res) => res.json({ data: await service.list() });
const create = async (req, res) =>
  res.status(201).json({ data: await service.create(req.body.data) });

module.exports = { list, create };
