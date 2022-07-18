const { json } = require("express");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const service = require("./reservations.service")

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  res.json({
    data: [],
  });
}

//validate data
function validateData(payload){
  const errors = []

  //check if there are any violations
  //if (day is a tuesday) errors.push("it's a tuesday")
  // console.log(errors)
  
  //if (too early or too late) errors.push("not open yet")
  // console.log(errors)

  if (errors.length > 0){
    //return the errors as a response
  } else{
    //payload is valid, proceed to the next steps to POST to db
  }
}

function bodyHasData(propertyName){
  return function (req, res, next){
    const { data = {} } = req.body
    data[propertyName] && propertyName.length > 0 ? next() : next({ status: 400, message: `Reservation must have: ${propertyName}.`})
  }
}

//get the service

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
  console.log("You did it! Great job!")
  //then push the newReserve into somewhere?
  res.status(201).json({ data: newReserve })

  // res.json({ data: await service.create(req.body.data)})


  //pass data to service here
  //const data = await service.create(req.body.data)
  //return res.status(201).json({ data })


  //await service
//  .create(req.body.date)
//  .then((data )=> res.status(201).json({ data }))
//  .catch(next)
  // res.send({ data: "hello from the server"})
  
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
    asyncErrorBoundary(create)
  ]
};
