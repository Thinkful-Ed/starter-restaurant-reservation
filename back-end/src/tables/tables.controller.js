const service = require("./tables.service");

const list = async (req, res) => res.json({ data: await service.list() });
const create = async (req, res) =>
  res.status(201).json({ data: await service.create(req.body.data) });
const seatReservation = async (req, res, next) =>
  service
    .seatReservation(Number(req.params.tableId), req.body.data.reservation_id)
    .then((updatedTable) => res.json({ data: updatedTable }))
    .catch((err) => next({ status: 400, message: err }));

module.exports = { list, create, seatReservation };
