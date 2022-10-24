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
  next();
}
//lists reservations by date
async function list(req, res, next) {
 let date = new Date().toJSON().slice(0,10);
  if (req.query.date) {
  date = req.query.date;
 }
 console.log(date);
res.json({ data: await service.getReservationsByDate(date)})
}



//to create a reservation
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}




module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasRequiredProperties, hasOnlyValidProperties, asyncErrorBoundary(create)],
};
