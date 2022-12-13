const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const service = require("./reservationsService")
const hasProperties = require("../errors/hasProperties");
const P = require("pino");
/**
 * List handler for reservation resources
 */
const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
]

const hasRequiredProperties = hasProperties(...VALID_PROPERTIES)

function validateDate(req, res, next) {
  const { data = {} } = req.body;
    if (!Date.parse(data.reservation_date)){
    next({
        status:400,
        message: `reservation_date is invalid`
      });
    };
  next();
}

function validateTime(req, res, next ){
  const time = req.body.data.reservation_time;
  if (!time.match(/^(\d{1,2}):(\d{2})([ap]m)?$/)){
   return next({
      status:400,
      message:"reservation_time must be in hh,mm,ss"
    });
  }
  next();
};

function validatePeople(req, res, next){
  const people = req.body.data.people;
  if (typeof(people) !== "number"){
    next({
      status:400,
      message: `people is invalid`
    });
  }
  next()
};

async function list(req, res) {
  console.log(req.params)
  res.json({
    data: await service.list()
  });
};

async function create(req, res,) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data })
}

module.exports = {
  list,
  create: [
    hasRequiredProperties,
    validateDate,
    validateTime,
    validatePeople,
    asyncErrorBoundary(create),
  ],


};
