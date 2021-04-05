const moment = require('moment')

const validateParams = (params) => {
  const { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = params;
  if (!first_name || first_name === "")
    throw new Error("first_name cannot be blank")
  if (!last_name || last_name === "")
    throw new Error("last_name cannot be blank")
  if (!mobile_number || mobile_number === "")
    throw new Error("mobile_number cannot be blank")
  if (!Number.isInteger(people))
    throw new Error("people should be a number")
  if (people === 0)
    throw new Error("people should be greater than 0")
  if (!reservation_date || reservation_date === "")
    throw new Error("reservation_date cannot be blank")
  if (new Date(reservation_date).toString() === 'Invalid Date' || moment(reservation_time, 'hh:mm').toString() == 'Invalid date')
    throw new Error("reservation_date or reservation_time is not valid")
  if (dateInPast(reservation_date))
    throw new Error("reservation_date must be in the future")
  if (dayIsTuesday(reservation_date))
    throw new Error("The restaurant is closed on tuesday")
  if (!reservation_time || reservation_time === "")
    throw new Error("reservation_time cannot be blank")
  if (timeBeforeOpening(reservation_time))
    throw new Error("All reservations will be booked after 10:30 AM")
  if (timeAfterClosing(reservation_time))
    throw new Error("The reservation time is after 9:30 PM, the restaurant will be closed at 10:30 PM")
  if (timeInPast(reservation_time))
    throw new Error("Reservation time must be in the future")
}

const dateInPast = (date) => {
  let today = new Date()
  let mentionedDate = new Date(date)
  return (mentionedDate <= today)
}

const dayIsTuesday = (date) => {
  let mentionedDate = new Date(date)
  return (mentionedDate.getDay() === 2)
}

const timeBeforeOpening = (time) => (moment(time, "hh:mm") <= moment("10:30", "hh:mm"))

const timeAfterClosing = (time) => (moment(time, "hh:mm") >= moment("21:30", "hh:mm"))

const timeInPast = (date, time) => {
  todayDate = new Date();
  currentTime = moment();
  if (date > todayDate)
    return false

  if (currentTime >= time) {
    return true
  }
}

const createReservation = (knex, data) => {
  knex('reservations').insert(data)
}

const getReservations = (knex, date) => {
  if (date)
    return knex('reservations').where({ reservation_date: date }).select().orderBy('reservation_time', 'asc')
  else
    return knex('reservations').select().orderBy('reservation_time', 'asc')
}

module.exports = {
  validateParams,
  createReservation,
  getReservations
}
