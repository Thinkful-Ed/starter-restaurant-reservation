/**
 * List handler for reservation resources
 */

const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const moment = require('moment')

async function list(req, res) {
  const knex = req.app.get('db')

  let reservations
  if (req.query.date)
    reservations = await knex('reservations').where({ reservation_date: req.query.date }).select().orderBy('reservation_time', 'asc')
  else
    reservations = await knex('reservations').select().orderBy('reservation_time', 'asc')
  res.json({
    data: await reservations
  });
}

async function create(req, res) {
  const knex = req.app.get('db')
  const { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = req.body.data

  await knex('reservations').insert({
    first_name: validateAttribute(first_name),
    last_name: validateAttribute(last_name),
    mobile_number: validateAttribute(mobile_number),
    reservation_date: validateDate(reservation_date),
    reservation_time: validateAttribute(reservation_time),
    people: validateNumAttribute(people)
  })

  res.status(201)
  res.json({
    data: req.body.data
  });
}

const validateAttribute = (attr) => {
  if (attr !== "")
    return attr
}

const validateNumAttribute = (attr) => {
  if (Number.isInteger(attr) && attr !== 0)
    return attr
}

const validateDate = (date) => {
  let today = new Date()
  let mentionedDate = new Date(date)
  if (mentionedDate <= today)
    throw new Error("reservation_date must be in the future")

  if (mentionedDate.getDay() === 2)
    throw new Error("The restaurant is closed on tuesday")
  return date;
}

module.exports = {
  list,
  create: asyncErrorBoundary(create)
};
