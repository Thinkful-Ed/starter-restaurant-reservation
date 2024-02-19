const service = require('./reservations.service');

// Validation function for reservation data
function hasRequiredFields(req, res, next) {
  const { data = {} } = req.body;
  const requiredFields = ['first_name', 'last_name', 'mobile_number', 'reservation_date', 'reservation_time', 'people'];

  for (let field of requiredFields) {
    if (!data[field]) {
      return next({
        status: 400,
        message: `Field required: ${field}`,
      });
    }
  }

  //  validation for reservation_date
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.reservation_date)) {
    return next({
      status: 400,
      message: `Invalid date format: reservation_date`,
    });
  }

  //  validation for reservation_time
  if (!/^\d{2}:\d{2}$/.test(data.reservation_time)) {
    return next({
      status: 400,
      message: `Invalid time format: reservation_time`,
    });
  }

  // Example validation for people
  if (typeof data.people !== 'number' || data.people < 1) {
    return next({
      status: 400,
      message: `Invalid number of people: people`,
    });
  }

  next();
}



async function create(req, res, next) {
  try {
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
}

async function list(req, res, next) {
  const { date } = req.query;
  const data = await service.list(date);
  res.json({ data });
}

module.exports = {
  create: [hasRequiredFields, create],
  list,
};
