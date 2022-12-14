const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const service = require("./reservationsService")
const hasProperties = require("../errors/hasProperties");
const P = require("pino");
/**
 * List handler for reservation resources
 */
/// validation middleware
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
  res.locals.time = time
  if (!time.match(/^(\d{1,2}):(\d{2})([ap]m)?$/)){
   return next({
      status:400,
      message:"reservation_time must be in hh,mm,ss"
    });
  }
  next();
};

function timeIsValid(req, res, next ){
  const time = res.locals.time
  if(time < "10:30" && time > "21:30"){
    next({
      status:400,
      message:"Invalid time entry"
    })
  }
  next()
}

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

function isNotTuesday(req, res, next){
  const date = new Date(req.body.data.reservation_date)
  const day = date.getUTCDay();
  res.locals.day = day;
  res.locals.date = date;
  if (day === 2){
    next({
      status:400,
      message:"closed on tuesedays "
    });
  };
  next();
};
// checks to see if the dat is in the past 
function isNotPast(req, res, next){
 const date = new Date()
  const day = res.locals.day;
    if(day < date){
      next({
        status: 400,
        message: "must be scheduled for a future date"
      });
    };
    next();
};

/////// crudl operations
async function list(req, res) {
  console.log(req.params)
  res.json({
    data: await service.list()
  });
};

async function create(req, res,) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}




module.exports = {
  list,
  create: [
    hasRequiredProperties,
    validateDate,
    validateTime,
    validatePeople,
    isNotTuesday,
    isNotPast,
    timeIsValid,
    asyncErrorBoundary(create),
  ],
  
};
