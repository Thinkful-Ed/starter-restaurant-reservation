const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const {date} = req.query;
  if (!date){
   return res.json({data : await service.list()});
  }

  const foundReservations = await service.listByDate(date)
  foundReservations.sort((a,b)=> a.reservation_time < b.reservation_time ? -1: 1)

   res.json({data: foundReservations});
}

function read(req, res) {
  const { reservation } = res.locals;
  res.status(201).json(reservation);
}

async function isValidId(req, res, next) {
  const { reservationId } = req.params;

  const reservation = await service.read(reservationId);

  if (reservation) {
    res.locals.reservation = reservation;
    next();
  }
  next({
    status: 404,
    message: `Reservation ID does not exist: ${reservationId}`,
  });
}
module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(isValidId), read]
};
