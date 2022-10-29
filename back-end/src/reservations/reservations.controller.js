const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
//proper fields validation
const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
]
const hasRequiredProperties = hasProperties(VALID_PROPERTIES);

function hasOnlyValidProperties(req, res, next) {
  const {data = {} } = req.body;
  const invalidFields = Object.keys(data).filter((field)=> !VALID_PROPERTIES.includes(field));
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    })
  }
  if (data.people && typeof data.people !== "number") {
    return next({
      status: 400,
      message: `Number of people is not valid.`,
    });
  }
  next();
}


//date and time validation
function validDate(req, res, next) {
  const { data = {} } = req.body;
  if (!data["reservation_date"].match(/\d{4}-\d{2}-\d{2}/)) {
    return next({
      status: 400,
      message: `Selected reservation_date ${data["reservation_date"]} is not valid.`,
    });
  }
  else if (new Date(data["reservation_date"]).getDay() + 1 === 2) {
    next({
      status: 400,
      message: `Reservations are closed on Tuesdays.`,
    });
  }
  else if (Date.parse(data["reservation_date"]) < Date.now()) {
    next({
      status: 400,
      message: `You've selected a day in the past. Please reserve a future date.`,
    });
  }
  next();
}

function validTime(req, res, next) {
  const reservation = req.body.data;
  const [hour, minute] = reservation.reservation_time.split(":");
  const min = minute/60;
  const time = hour + min;
  const openHour = 100.5;
  const closeHour = 210.5;
  if (!Number(time)) {
    return next({
      status:400,
      message: "reservation_time"
    })
  }
  if (time < openHour|| time > closeHour) {
    return next({
      status: 400,
      message: `${hour}, ${minute}, ${time}: Reservation must be made within reasonable business hours: 10:30 AM - 9:30 PM.`
    })
  }
  next();
}

  //get current day, year, and month
  //get day, year, and month of request 


//lists reservations by date
async function list(req, res, next) {
 let date = new Date().toJSON().slice(0,10);
  if (req.query.date) {
  date = req.query.date;
 }
res.json({ data: await service.getReservationsByDate(date)})
}
//to get reservation by ID
async function read(req, res, next) {
  const { reservation_Id } = req.params;
  const data = await service.read(reservation_Id);
  if (data) {
      res.json({ data });
  } else {
      return next({status: 404, message: 'Reservation cannot be found.'});
  }
}


//to create a reservation
async function create(req, res) {
  const reservation = await service.create(req.body.data);
  res.status(201).json({data: reservation})
}




module.exports = {
  list: asyncErrorBoundary(list),
  read: asyncErrorBoundary(read),
  create: [hasRequiredProperties, hasOnlyValidProperties, validDate, validTime, asyncErrorBoundary(create)],
};
