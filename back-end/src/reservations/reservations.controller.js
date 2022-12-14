/**
 * List handler for reservation resources
 */
const reservationsService = require("./reservations.service");

async function list(req, res) {
  const { date } = req.query;
  if (date) {
    const data = await reservationsService.list(date);
    res.json({
      data: data,
    });
  }
  data = await reservationsService.list();
  res.json({
    data: data,
  });
}

function notTuesday(req, res, next) {
  const { reservation_date } = req.body.data;
  const day = reservation_date.getUTCDay();
  if (day === 2) {
    return next({
      status: 400,
      message: "Restaurant is closed on Tuesday",
    });
  }
  next();
}

function storeOpen(req, res, next) {
  const { reservation_time } = req.body.data;
  const hours = reservation_time.substring(0, 2);
  const min = reservation_time.substring(2, 4);
  if ((hours <= 10 && min <= 30) || (hours >= 21 && min >= 30)) {
    return next({
      status: 400,
      message: "Please reserve your seat between 10:30am and 9:30pm.",
    });
  }
}

function futureDate(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const date = new Date(reservation_date, reservation_time);
  if (date < new Date()) {
    return next({
      status: 400,
      message: "Reservation must be in the future",
    });
  }
  next();
}

async function create(req, res, next) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list,
  create: [notTuesday, futureDate, storeOpen, create],
};
