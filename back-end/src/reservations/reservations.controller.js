/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//create function to check restaurant schedule
async function validReservationDate(req, res, next) {
  const todaysDate = new Date();
  const reservationDate = new Date(`${req.body.data.reservation_date}T${req.body.data.reservation_time}:00.000`);

  //Tuesday is 2 for the backend
  if (reservationDate.getDay() === 2) {
    return next({
      status: 400,
      message: ` The restaurant is closed on Tuesdays`
    })
  }

  if (reservationDate < todaysDate) {
    return next({
      status: 400,
      message: `Reservation must be a future date.`
    })
  }

  const openingTime = new Date(
    `${req.body.data.reservation_date}T10:30:00.000`
  );
  const closingTime = new Date(
    `${req.body.data.reservation_date}T21:30:00.000`
  );

  if (
    reservationDate < openingTime ||
    reservationDate > closingTime
  ) {
    return next({
      status: 400,
      message: `Restaurant is not open for reservations at that time.`,
    });
  }

  next();

}

async function list(req, res) {
  const date = req.query.date;
  const mobile_number = req.query.mobile_number;

  const reservations = await service.list(date, mobile_number);

  const response = reservations.filter((reservation) => reservation.status !== "finished");
  
  res.status(200).json({ data: response})
}

async function create(req, res) {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ error: "Data is required" });
  }

  const requiredFields = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people"
  ]
  for (const field of requiredFields) {
    if (!data[field]) {
      return res.status(400).json({ error: `${field} is required`});
    }
  }

  //require "people" to be a number
  const {people} = data;
  if (isNaN(people) || people <= 0 || !Number.isInteger(people)) {
    return res.status(400).json({ error: "people must be a number"})
  }

  const { reservation_date, reservation_time } = data;
  if (!isValidDate(reservation_date) || !isValidTime(reservation_time)) {
    return res.status(400).json({ error: "Invalid reservation_date or reservation_time format" });
  }

  try {
    const response = await service.create(req.body.data);
    res.status(201).json({data: response[0]})

  } catch (error) {
    res.status(500).json({ error: "An error has occurred"})
  }

}

// Helper functions to validate date and time formats
function isValidDate(date) {
  return /\d{4}-\d{2}-\d{2}/.test(date);
}

function isValidTime(time) {
  return /\d{2}:\d{2}/.test(time);
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(validReservationDate),
    asyncErrorBoundary(create)
  ]
};
