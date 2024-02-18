
async function list(req, res) {
  const { date } = req.query;
  // Assuming 'service.list' fetches reservations for a specific date from the DB
  const reservations = await service.list(date);
  res.json({ data: reservations });
}

function hasRequiredFields(req, res, next) {
  const { data = {} } = req.body;
  const requiredFields = ['first_name', 'last_name', 'mobile_number', 'reservation_date', 'reservation_time', 'people'];

  for (let field of requiredFields) {
    if (!data[field]) {
      return res.status(400).json({ error: `Field required: ${field}` });
    }
  }

  next(); // Proceed to the next middleware/function if validation passes
}

async function create(req, res) {
  const newReservation = req.body.data;


  
  const createdReservation = await service.create(newReservation);
  res.status(201).json({ data: createdReservation });
}

module.exports = {
  list,
  create: [hasRequiredFields, create], // Apply the validation middleware before the create function
};
module.exports = {
  list,
};
