const { json } = require("express");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const service = require("./reservations.service")
const dateFormat = /\d\d\d\d-\d\d-\d\d/;
const timeFormat = /\d\d:\d\d/;



/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const {date} = req.query
  // // console.log("dateasdfasdf: ", date)
  // const currentDate = await service.list()
  // // console.log("currentDate:", currentDate)
  // res.json({ data: currentDate.filter(date ? reserv => reserv.reservation_date == date : () => true )})
  let data
  if (date) {
    data = await service.listByDate(date)
  } else {
    data = await service.list()
  }
  res.json({data})
}


async function read(req, res){
  res.status(200).json({ data: res.locals.reservation })
}

// async function update(req, res, next){
//   await service.update(res.locals.reservation.reservation_id)
//   res.status(200).json({ data: res.locals.reservation})
// }


async function create(req, res){
  const {data: { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = {} } = req.body

  const newReserve = {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people
  }
  const response = await service.create(newReserve)
  // console.log("responseStat: ", response.status)
  // if (response.status == "booked"){
  //   res.status(201).json({ data: response })  
  // } else if (response.status == "seated"){
  //   res.status(400).json({ data: response })  
  // }
  // else {
  //   res.status(400).json({ data: response })  
  // }
  res.status(201).json({ data: response })

  // res.json({ data: await service.create(req.body.data)})
  
}

// async function finish(req, res, next){
//   const reservation_id = req.params.reservation_id
//   await service.changeToFinished(reservation_id)
//   const result = await service.read(reservation_id)
//   // console.log("asdfasdfasdf", result)
//   res.status(200).json({ data: { status: result.status} })
// }

async function update(req, res, next){
  const reservation_id = req.params.reservation_id
  const {status} = req.body.data
  await service.update(reservation_id, status )
  const result = await service.read(reservation_id)

  res.status(200).json({ data: { status: result.status} })
}

async function getReservationByPhone(req, res, next){
  console.log("hello") 
}


//-------------------------- validation stuff
function validateData(req, res, next){
  const {reservation_time, reservation_date, status} = req.body.data
  // let reserv_time = data["reservation_time"]
  let day = new Date(`${reservation_date} ${reservation_time}`)
  if (status === "seated" || status === "finished"){
    next({
      status: 400,
      message: "Cannot be seated or finished"
    })
  }
  if (day.getDay() === 2) {
    next({
      status: 400,
      message: "We're closed on Tuesdays, please select another day."
    })
    
  } 
  else if(day < Date.now()){
      next({
        status: 400,
        message: "You can't make reservations for the past. Pick a date in the future."
      })
  }

  next()
}

function bodyHasData(propertyName){
  return function (req, res, next){
    // console.log("request: ", req.body)
    const { data = {} } = req.body
    data[propertyName] && propertyName.length > 0 ? next() : next({ status: 400, message: `Reservation must have: ${propertyName}.`})
  }
}

function reservationDayIsValid(req, res, next){
  const { reservation_date} = req.body.data


  if(!dateFormat.test(reservation_date)){
    return next({ status: 400, message: "reservation_date is invalid."})
  }
  next()
}

function reservationTimeIsValid(req, res, next){
  const { reservation_time } = req.body.data
  if(!timeFormat.test(reservation_time)){
    return next({ status: 400, message: "reservation_time is invalid."})
  }
  else if(reservation_time < "10:30"){
    return next({ status: 400, message: "We're not open yet."})
  }
  else if(reservation_time > "19:30"){
    return next({ status: 400, message: "We're closing soon. Please choose an earlier time or come back another day!"})
  }
  next()

}

function peopleIsValidNumber(req, res, next){
  const { people } = req.body.data
  if (typeof people === "number"){
    next()
  } else{
    return next({
      status: 400,
      message: "Please enter a valid number for number of people"
    })
  }
 
}



function reservationExists(req, res, next){
  service.read(req.params.reservation_id)
  .then((reservation)=>{
      if(reservation){
          res.locals.reservation = reservation
          return next()
      }
      next({ status: 404, message: `Reservation ID: ${req.params.reservation_id} cannot be found!`})
  })
  .catch(next)
}

async function validateStatus(req, res, next){
  console.log("hey lok at me:", req.body)
  const { status } = req.body.data
  // const response = await service.read()
  if (status !== "finished" && status !== "seated" && status !== "booked" && status !== "cancelled" ){
    return next ({ status: 400, message: "Reservation status is unknown" })
  }
  if (res.locals.reservation.status === "finished"){
    return next({ status: 400, message: "Cannot update a finished reservation."})
  }
  // if (status === "unknown"){
  //   return next({ status: 400, message: "Reservation status is unknown"})
  // } else if( status === "finished"){
  //   return next({ status: 400, message: "A finished reservation cannot be updated"})
  // }
  next()
}

module.exports = {
  list: asyncErrorBoundary(list),

  create: [
    asyncErrorBoundary(bodyHasData("first_name")),
    asyncErrorBoundary(bodyHasData("last_name")),
    asyncErrorBoundary(bodyHasData("mobile_number")),
    asyncErrorBoundary(bodyHasData("reservation_date")),
    asyncErrorBoundary(bodyHasData("reservation_time")),
    asyncErrorBoundary(bodyHasData("people")),
    validateData,
    reservationDayIsValid,
    reservationTimeIsValid,
    peopleIsValidNumber,
    asyncErrorBoundary(create)
  ], 

  read: [
    reservationExists,
    asyncErrorBoundary(read)
  ],

  update: [
    reservationExists,
    // asyncErrorBoundary(update)
    validateStatus,
    asyncErrorBoundary(update)
  ],
  getReservationByPhone,

};
