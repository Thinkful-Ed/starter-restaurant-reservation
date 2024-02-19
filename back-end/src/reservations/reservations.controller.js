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

  // Additional validations 

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
