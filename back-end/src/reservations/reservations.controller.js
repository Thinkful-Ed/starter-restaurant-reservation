const service = require("./reservations.service");

function bodyDataVerification(req, res, next) {
  const toCheck = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];

  let notValid = [];
  const { data = {} } = req.body;
  toCheck.forEach((param) => {
    if (!data[param]) {
      notValid.push(param);
    }
  });

  if (notValid.length > 0) {
    next({
      error: 400,
      message: `Please fill in the following: ${notValid.join(", ")}`,
    });
  }
  next();
}

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function create(req, res) {
  res.json({ data: await service.create(req.body.data) });
}

module.exports = {
  list,
  create: [bodyDataVerification, create],
};
