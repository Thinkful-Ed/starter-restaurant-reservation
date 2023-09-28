/**
 * List handler for reservation resources
 */
const service = require("./reservations.service")

async function list(req, res) {
  const {date} = req.query
  const result = await service.list(date)
  const sorted = result.sort((res1, res2) => {
    const today = new Date();
    const time1 = new Date(today.toDateString() + ' ' + res1.reservation_time);
    const time2 = new Date(today.toDateString() + ' ' + res2.reservation_time);
    return time1 - time2;
  });  console.log(sorted)
  res.json({data: sorted})
}

const validResProperties = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
]
async function ValidReservation(req, res, next) {
  const newReservation = req.body;
  console.log("****", newReservation)
  if (newReservation) {
  const invalidProperties = Object.keys(newReservation).filter((key) => !validResProperties.includes(key));
  if (invalidProperties.length) {
    return next({
      status: 400,
      message: `Invalid reservation field(s): ${invalidProperties.join(", ")}`
    })
  }
  const reservation = await service.create(newReservation);
  console.log("***", reservation)
  res.locals.reservation = reservation;
  next()  
  }

}

function create(req, res, next) {
  const {reservation} = res.locals;
  res.status(201).json({data: "hello"})
}

module.exports = {
  list,
  create: [
    ValidReservation,
    create
  ]
};
