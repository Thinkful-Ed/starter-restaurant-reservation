const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")


async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await reservationsService.read(parseInt(reservation_id));
  if (reservation) {
    res.locals.reservation = reservation
    return next();
  }
  next({ status: 404, message: `Reservation ${reservation_id} cannot be found.` });
}

async function mobileNumberDataSearch(req, res, next) {
  if (!req.query.mobile_number) {
    return next();
  }
    //const found = await reservationsService.search(req.query.mobile_number)
    if (Number.isNaN(parseInt(req.query.mobile_number))) {
      return next({ 
        status: 400,
        message: "No reservations found."
    })
  }
  res.locals.mobile_number = req.query.mobile_number;
  next();
}

//validation for empty fields

function isValidReservation(req, res, next) {
  const requiredFields = [
    "first_name", 
    "last_name", 
    "mobile_number", 
    "reservation_date", 
    "reservation_time",
    "people"
  ]

  if (!req.body.data) {
     return next({
      status: 400,
      message: `Can not submit empty form.`,
    });
  }
  for (const field of requiredFields) {
    if (!req.body.data[field]) {
       return next({
        status: 400,
        message: `Order must include a ${field}`,
      });
    }
  }
  next();
}

function isPartyValid(req, res, next) {
  const { people } = req.body.data;
  if (!(typeof(people) === "number") || people <= 0) {
    return next({
      status: 400,
      message: `Number of people must be a number greater than zero.`
    });
  }
  next();
}

function dateFormatValidation(req, res, next) {
  const { reservation_date } = req.body.data; 
  if (reservation_date.slice(0, 10).match(/^\d{4}-\d{2}-\d{2}$/) === null) {
    return next({
      status: 400,
      message: `The reservation_date must be in YYYY-MM-DD format.`
    })
  }
  next();
}

  function isNotTuesday(req, res, next) {
  const { reservation_date } = req.body.data;
  const date = new Date(reservation_date + "T12:00:00")
  const day = date.getDay();
  if (day === 2) {
    return next({
      status: 400,
      message: `Reservation must be in the future. Restaurant is closed on Tuesdays.`
    })
  }
  next();
}

function isFutureDate(req, res, next) {
  const { reservation_date } = req.body.data;
  const current = Date.now();
  const selected = Date.parse(reservation_date);
  if (current - selected >= 0) {
    return next({
      status: 400,
      message: `Reservation must be in the future. Restaurant is closed on Tuesdays.`
    })
  }
  next();
}

function timeFormatValidation(req, res, next) {
    const { reservation_time } = req.body.data; 
    console.log(reservation_time.slice(0, 5))
    if (reservation_time.slice(0, 5).match(/^\d{1,2}:\d{2}([ap]m)?$/) === null) {
      return next({
        status: 400,
        message: `The reservation_time must be in HH:MM format.`
      })
    }
    next();
}

function isAfterOpen(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const momentOfOpening = new Date(`${reservation_date}T10:30`)
  const openingTime = momentOfOpening.getTime()
  const momentOfReservation = new Date(`${reservation_date}T${reservation_time}`);
  const reservationTime = momentOfReservation.getTime();
  const difference = reservationTime - openingTime
  if (difference < 0) {
    return next({
      status: 400,
      message: `The reservation_time must be at or after 10:30AM.`
    })
  }
  next();
}

function isBeforeClose(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const momentOfClosing = new Date(`${reservation_date}T21:30`)
  const closingTime = momentOfClosing.getTime()
  const momentOfReservation = new Date(`${reservation_date}T${reservation_time}`);
  const reservationTime = momentOfReservation.getTime();
  const difference = closingTime - reservationTime;
  if (difference < 0) {
    return next({
      status: 400,
      message: `The reservation_time must be at or before 09:30PM.`
    })
  }
  next();
}

function isFutureTime(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const presentMoment = Date.now();
  const reservationMoment = new Date(`${reservation_date}T${reservation_time}`)
  const reservationTime = reservationMoment.getTime();
  const difference = presentMoment - reservationTime;
  if (difference >= 0) { 
    return next({
      status: 400,
      message: `Reservation time must be in the future.`
    })
  }
  next();
}

function isBooked(req, res, next) {
  if (req.body.data.status === "seated") {
    return next({
      status: 400,
      message: "Reservation status should not be seated."
    })
  };
  if (req.body.data.status === "finished") {
    return next({
      status: 400,
      message: "Reservation status should not be finished."
    })
  }
  next();
}

function isValidStatus(req, res, next) {
  const { status } = req.body.data;
  const validStatuses = ["booked", "seated", "finished", "cancelled"];
    if (!validStatuses.includes(status)) {
      return next({
        status: 400,
        message: "Status input unknown."
      });
    }
  next();
}


function isNotFinished(req, res, next) {
  if (res.locals.reservation.status === "finished") {
    return next({
      status: 400,
      message: "Reservation can not already be finished."
    })
  }
  next();
}

async function create(req, res) {
  let reservation = req.body.data;
  let result = await reservationsService.create(reservation);
  res.status(201).json({data: result[0]});
}

function read(req, res) {
  res.json({ data: res.locals.reservation })
}

async function update(req, res) {
  if (!req.body.data.reservation_id) {
  const updatedReservation = {...res.locals.reservation, status: req.body.data.status};
  res.status(200).json({ 
    data: await reservationsService.update(updatedReservation) 
  }) 
} else {
  const updatedReservation = {...req.body.data, reservation_date: req.body.data.reservation_date.slice(0, 10), reservation_time:  req.body.data.reservation_time.slice(0, 5)};
  console.log(updatedReservation)
  res.status(200).json({
    data: await reservationsService.update(updatedReservation)
  })
}
}



/**
 * List handler for reservation resources
 */
// List handler for reservation resources
async function list(req, res) {
  if (req.query.date) {
    // console.log(req.query.date)
    const { date } = req.query;
    const reservationsByDate = await reservationsService.list(date);
    res.json({
      data: reservationsByDate,
    });
  } if (res.locals.mobile_number) {
    // console.log(res.locals.mobile_number)
    const found = await reservationsService.search(res.locals.mobile_number);
    console.log(found);
  res.json({ data: found })
   }
}

module.exports = {
  read: [asyncErrorBoundary(reservationExists), read],
  list: [asyncErrorBoundary(mobileNumberDataSearch), asyncErrorBoundary(list)],
  create: [isValidReservation, isPartyValid, dateFormatValidation, isNotTuesday, isFutureDate,  timeFormatValidation, isAfterOpen, isBeforeClose, isFutureTime, isBooked, asyncErrorBoundary(create)],
  updateStatus: [asyncErrorBoundary(reservationExists),  isValidStatus, isNotFinished, asyncErrorBoundary(update)],
  updateReservation: [asyncErrorBoundary(reservationExists), isValidReservation, isPartyValid, dateFormatValidation, isNotTuesday, isFutureDate,  timeFormatValidation, isAfterOpen, isBeforeClose, isFutureTime, isBooked, asyncErrorBoundary(update)]
}
