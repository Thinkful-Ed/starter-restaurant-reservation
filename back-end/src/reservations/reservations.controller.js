const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const bodyDataHas = require("../errors/bodyDataHas");


/*
*** VALIDATION ***
*/

async function reservationExists(req, res, next){
  const {data} = req.body;
  const {date} = req.query;
  const reservation = await service.list();

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
  create: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    asyncErrorBoundary(create)],
};
