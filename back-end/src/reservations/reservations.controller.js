const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
  if(req.query.date) {
    const date = req.query.date || null
    const data = await service.list(date)
    res.json({
      data,
    });
  } else if(req.query.mobile_number) {
    const mobile_number = req.query.mobile_number
    const data = await service.search(mobile_number)
    res.json({
      data,
    });
  }
}

function validateDataIsSent(req, res, next) {
  if(req.body.data) {
    next()
  } else {
    next({
      status: 400,
      message: `Request must include data`
    })
  }
}

//validates that all the fields has a value, stores the value in res.locals for further use
function validateHasTextFunction(field) {
  function validateHasText(req, res, next) {
    if(req.body.data[field]) {
      res.locals[field] = req.body.data[field]
      next()
    } else {
      next({
        status: 400,
        message: `Reservation must include a ${field}`
      })
    }
  }

  return validateHasText
}

//if status is sent, validate that it is booked
function validateStatus(req, res, next) {
  if(req.body.data.status) {
    if(req.body.data.status !== "booked") {
      next({
        status: 400,
        message: `status cannot be ${req.body.data.status}`
      })
    } else {
      next()
    }
  } else {
    next()
  }
}

function validateNumber(req, res, next) {
  //replaces () and - so that it can be formatted for database
  const number = res.locals.mobile_number.replace(/[^0-9]/g, '')
  if(number.length === 10) {
    const formattedNumber = number.slice(0,3) + "-" + number.slice(3,6) + "-" + number.slice(6)
    req.body.data.mobile_number = formattedNumber
    next()
  } else {
    next({
      status: 400,
      message: `Mobile number must be 10 digits`
    })
  }
}

function validateDate(req, res, next) {
  const reservationDate = new Date(res.locals.reservation_date)
  if(!isNaN(reservationDate)) {
    next()
  } else {
    next({
      status: 400,
      message: `Date (reservation_date) must be in a valid format (YYYY-MM-DD)`
    })
  }
}

function validateTime(req, res, next) {
  const reservationDate = new Date(`${res.locals.reservation_date} ${res.locals.reservation_time}`)
  if(!isNaN(reservationDate)) {
    next()
  } else {
    next({
      status: 400,
      message: `Time (reservation_time) must be in a valid format (HH:MM)`
    })
  }
}

//checks the reservation date Epoch time vs the current one
function validateDateToPast(req, res, next) {
  const currentDate = new Date()
  const reservationDate = new Date(`${res.locals.reservation_date} ${res.locals.reservation_time}`)
  const currentDateEpoch = currentDate.getTime()
  const reservationDateEpoch = reservationDate.getTime()
  if(currentDateEpoch <= reservationDateEpoch) {
    res.locals.currentDateEpoch = currentDateEpoch
    next()
  } else {
    next({
      status: 400,
      message: `Reservation must be in the future`
    })
  }
}

//checks if the reservation date is Tuesday
function validateDayOfWeek(req,res,next) {
  const reservationDate = new Date(`${res.locals.reservation_date} ${res.locals.reservation_time}`)
  const day = reservationDate.getDay()
  if(day === 2) {
    next({
      status: 400,
      message: `Restaurant is closed on Tuesday`
    })
  } else {
    next()
  }
}

//set open time, close time, reservation time, checks if reservation is between open and close
function validateTimeOfDay(req,res,next) {
  const restaurantOpen = new Date()
  restaurantOpen.setHours(10,30,0)
  const restaurantClose = new Date()
  restaurantClose.setHours(21,30,0)

  const reservationTime = new Date()
  const reservationHours = res.locals.reservation_time.slice(0,2)
  const reservationMins = res.locals.reservation_time.slice(3)
  reservationTime.setHours(reservationHours, reservationMins, 0)

  if(reservationTime >= restaurantOpen && reservationTime <restaurantClose) {
    next()
  } else {
    next({
      status: 400,
      message: "Reservation time must be between 10:30 AM and 9:30 PM"
    })
  }
}

function validatePeople(req, res, next) {
  if(typeof res.locals.people === "number") {
    next()
  } else {
    next({
      status: 400,
      message: `people must be an integer`
    })
  }
}

function validatePeopleSize(req, res, next) {
  if(Number(res.locals.people) > 1) {
    next()
  } else {
    next({
      status: 400,
      message: `Party size must be greater than 1`
    })
  }
}

async function create(req, res) {
  const newReservation = await service.create(req.body.data)
  res.status(201).json({
    data: newReservation[0]
  })
}

async function validateReservationExists(req, res, next) {
  if(!req.params.reservation_id) {
    next( {
      status: 400,
      message: `reservation_id must be included`
    })
  }
  const reservation = await service.read(req.params.reservation_id)
  if(!reservation) {
    next({
      status: 404,
      message: `reservation_id ${req.params.reservation_id} does not exist`
    })
  } else {
    res.locals.reservation = reservation
    next()
  }
}

async function read(req, res) {
  const reservation = await service.read(Number(req.params.reservation_id))
  res.status(200).json({
    data: reservation
  })
}

function validateUpdatedStatus(req, res, next) {
  const validStatus = [
    "booked",
    "seated",
    "finished",
    "cancelled"
  ]
  if(req.body.data.status) {
    if(validStatus.includes(req.body.data.status)) {
      next()
    } else {
      next({
        status: 400,
        message: `${req.body.data.status} is not a valid status`
      })
    }
  } else {
    next({
      status: 400,
      message: `status must be included`
    })
  }
}

async function validateCurrentStatus(req, res, next) {
  if(res.locals.reservation.status === "finished") {
    next({
      status: 400,
      message: `reservation with finished status cannot be updated`
    })
  } else {
    next()
  }
}

async function updateStatus(req, res) {
  const reservation = await service.updateStatus(res.locals.reservation.reservation_id, req.body.data.status)
  res.status(200).json({
    data: reservation[0]
  })
}

async function updateReservation(req, res) {
  const reservationToUpdate = {
    ...res.locals.reservation,
    ...req.body.data
  }
  const reservation = await service.update(reservationToUpdate)
  reservation[0].mobile_number = reservation[0].mobile_number.replace(/-/g, "")
  res.status(200).json({
    data: reservation[0]
  })
}
 
module.exports = {
  list: [
    asyncErrorBoundary(list)
  ],
  create: [
    validateDataIsSent,
    ["first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"].map(field=>validateHasTextFunction(field)), 
    validateStatus,
    validateNumber,
    validateDate,
    validateTime,
    validateDateToPast,
    validateDayOfWeek,
    validateTimeOfDay,
    validatePeople,
    validatePeopleSize,
    asyncErrorBoundary(create)
  ],
  read: [
    asyncErrorBoundary(validateReservationExists),
    read
  ],
  updateStatus: [
    asyncErrorBoundary(validateReservationExists),
    validateUpdatedStatus,
    validateCurrentStatus,
    asyncErrorBoundary(updateStatus)
  ],
  update: [
    validateDataIsSent,
    ["first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"].map(field=>validateHasTextFunction(field)), 
    validateStatus,
    validateNumber,
    validateDate,
    validateTime,
    validateDateToPast,
    validateDayOfWeek,
    validateTimeOfDay,
    validatePeople,
    validatePeopleSize,
    asyncErrorBoundary(validateReservationExists),
    asyncErrorBoundary(updateReservation)
  ]
};