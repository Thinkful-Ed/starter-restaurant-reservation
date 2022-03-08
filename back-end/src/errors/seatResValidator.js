const service = require("../reservations/reservations.service");

const statuses = new Set(["booked", "seated", "finished", "cancelled"]);

async function seatResValidator(req, res, next) {
  const { reservation_id } = req.params;
  const { status = null } = req.body.data;

  const data = await service.read(reservation_id);
  if (!data)
    next({
      status: 404,
      message: `Reservation id ${reservation_id} does not exist`,
    });

  if (status && !statuses.has(status))
    next({
      status: 400,
      message: `Reservation status "${status}" is unknown`,
    });

  if (status && data.status === "finished")
    next({
      status: 400,
      message: `Reservation is already finished. A finished reservation can not be updated.`,
    });

  next();
}

module.exports = seatResValidator;
