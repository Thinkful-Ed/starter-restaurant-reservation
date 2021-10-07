//const { create } = require("./reservations.service");
const service = require ("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const hasProperties = require("../errors/hasProperties")

const VALID_PROPERTIES = [
  "first_name", 
  "last_name", 
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "reservation_id",
  "created_at", 
  "updated_at",
];

function hasOnlyValidProperties(req, res, next){
  const {data = {}} = req.body;
  res.locals.reservation = req.body.data;

  const invalidFields = Object.keys(data).filter((field)=> !VALID_PROPERTIES.includes(field))

  if(invalidFields.length){
    return next({
      status: 400, 
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    })
  }
  next()
}

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name", 
  "mobile_number",
  "reservation_date", 
  "reservation_time",
  "people"
)



function isValidTime(req, res, next){
  const {reservation_time} = req.body.data;

  const timeRegularEx = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  if(reservation_time.match(timeRegularEx)===null){
    return next({
      status: 400,
      message: "reservation_time is not a valid time.",
    });
  }
  next();
}
  
  function isValidDate(req,res, next){
  const {reservation_date, reservation_time} = req.body.data;
  let reservationDateTime = reservation_date + " " + reservation_time;
  let reservationAsDate = new Date(reservationDateTime);
  if(isNaN(reservationAsDate.getDate())){
    return next({
      status: 400, 
      message: "reservation_date is not a valid date."
    })
  }
  next();
  }

  function peopleIsNumber(req, res, next){
    const {people} = req.body.data;
    const peopleInt = parseInt(people)
    const sizeOfParty = Number.isInteger(peopleInt)
    if(!sizeOfParty){
          return next({
            status: 400,
            message: "Number of people entered is invalid",
          })
    }
    next()
  }
  // if(!Number.isInteger(people) || people < 1 ){
  //    return next({
  //      status: 400,
  //      message: "Number of people entered is invalid",
  //    })
  //  }



function dayNotTuesday(req, res, next){
  const {reservation_date} = req.body.data;
  const date = new Date(reservation_date);
  const theDay= date.getUTCDay();

  if(theDay===2){
    return next({
      status: 400, 
      message: "The restaurant is closed on Tuesdays.",
    })
  } else {
    return next();
  }
}

function dayNotInThePast(req, res, next){
  const {reservation_date, reservation_time} = req.body.data;
  const now = Date.now();
  const reservationDate = new Date(`${reservation_date} ${reservation_time}`);
  if(reservationDate < now){//first date is in future, or it is today
      return next({
        status: 400, 
        message: "Reservation must be made for a future day and time"
      })
    }
    next()
  }

   
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const {date} = req.query;

  if(date){
    res.json({data: await service.listByDate(date)})
  } else {
    res.json({
      data: await service.list()
    });
  }
}

async function createNew(req, res){
  const newReservation = await service.create(req.body.data)
  res.status(201).json({data: newReservation[0]});
}

module.exports = {
  create: [hasOnlyValidProperties, hasRequiredProperties, isValidTime, isValidDate, dayNotTuesday, dayNotInThePast,
    peopleIsNumber, 
    asyncErrorBoundary(createNew),],
  list: asyncErrorBoundary(list),
};
