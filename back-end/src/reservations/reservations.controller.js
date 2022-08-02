const reservationService = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const hasProperties = require("../errors/hasProperties")
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  // console.log("req", req)
  const { date } = req.query;
  let data;

  if(date){

    data= await reservationService.listByQuery(date);
  }
  else {
    data= await reservationService.list();
  }

  res.json({data})
  // console.log(data)
}

async function hasOnlyValidProperties(req, res, next){
  // console.log("hello valid properties")
  const VALID_PROPERTIES = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
    "status"
  ]
  // console.log("valid properties", VALID_PROPERTIES)
  const {data = {}} = req.body;
  const invalidFields = Object.keys(data).filter((field) => !VALID_PROPERTIES.includes(field));
  if(invalidFields.length){
    return next({
      status:400,
      message: `Invalid field(s): ${invalidFields.join(", ")},`
    });
  }
  next();
}

const hasRequiredProperties = hasProperties("first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people")

async function create(req, res, next){
  // console.log("create")
  const status= req.body.data.status
  if(status === "finished" || status === "seated"){
    return next({
      status:400,
      message:`The status of this reservation is set to ${status}.`
    })
  }
  await reservationService.create(req.body.data)
  .then((data) => {
    // console.log("data in reservations create", data)
    return res.status(201).json({data})
  })
  .catch(next)
}

async function reservationExists(req,res,next){
  let reservation_id = req.params.reservation_id
  let reservation= await reservationService.read(reservation_id)
  if(reservation){
    res.locals.reservation = reservation

    return next();
  }
  return next({
    status:404,
    message:`Reservation id ${reservation_id}, could not be found.`
  })
}

async function read(req,res){
  const {reservation} = res.locals
  res.json({ data: reservation });
}

async function validateIfReservationIsFinished(req,res,next){
  const reservation_id = req.params.reservation_id
  //const reservation = await reservation
  if(reservation_id){
    if(res.locals.reservation.status === "finished"){
      return next({
        status:400,
        message:`Sorry the reservation status is finished!`
      })
    }
    return next();
  }
}

async function youCanChangeTheStatus(req, res,next){
  let reservation_id = req.params.reservation_id
  let status = req.body.data.status

  if(status !== "finished" && status !== "seated" && status !== "booked"){
    return next({
      status:400,
      message:`Status of ${status} is unknown`
    })
  }

  await reservationService.theStatus(reservation_id, status)
  let changeStatus = await reservationService.read(reservation_id)

  // console.log("****************************");
  // console.log("changeStatus", changeStatus);

  if(changeStatus){
    return res.json({ data: changeStatus })
  }

  return next({
    status:400,
    message: `Reservation status for ${reservation_id}, could not be updated to ${status}.`
  })
}



module.exports = {
  list: asyncErrorBoundary(list),
  create: [asyncErrorBoundary(hasRequiredProperties), asyncErrorBoundary(hasOnlyValidProperties), asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  youCanChangeTheStatus: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(validateIfReservationIsFinished), asyncErrorBoundary(youCanChangeTheStatus)]
};
