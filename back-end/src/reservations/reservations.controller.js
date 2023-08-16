const P = require('pino');
const hasProperties = require('../errors/hasProperties')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const { peopleValidator, dateValidator, timeValidator, isDateInPast, isDateATuesday, isDuringBusinessHours } = require('../errors/reservationCreateValidators')
const service = require('./reservations.service')


async function list(req, res) {
  const { date } = req.query;
  if(date){
    res.json({
      data : await service.listByDate(date)
    })
  } else {
    res.json({ 
      data: await service.list(),
    });
  }
}

const create = async(req, res, _next) => {
  res.status(201).json({data : await service.create(req.body.data)})
}

module.exports = {
  list,
  create : [hasProperties(
    'first_name',
    'last_name',
    'mobile_number',
    'reservation_date',
    'reservation_time',
    'people'
  ), peopleValidator,
  dateValidator,
  timeValidator,
  isDateInPast,
  isDateATuesday,
  isDuringBusinessHours,
  asyncErrorBoundary(create)]
};
