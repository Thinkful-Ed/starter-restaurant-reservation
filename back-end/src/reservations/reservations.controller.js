const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


/*
*** VALIDATION ***
*/

function validateNumOfPeople(req, res, next) {
  const { data } = req.body;

  if (!data.people || data.people < 1) {
    
    return next({ status: 400, message: "Party must be of at least one person" });
  }

  next();
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date } = req.query;

  if (date) {
    const data = await service.read(date);
    res.json({ data });
  } else {
    const data = await service.list();
    res.json({ data });
  }
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [validateNumOfPeople, asyncErrorBoundary(create)],
};
