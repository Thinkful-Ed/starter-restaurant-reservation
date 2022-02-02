const service = require("./reservations.service")
const asyncErr = require("../errors/asyncErrorBoundary")

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function list(req, res, next) {
  const data = await service.list()
  res.json({ data })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function create(req, res, next) {
  const newReservation = await service.create(req.body.data)
  res.status(201).json({
    data: newReservation,
  })
}



module.exports = {
  list: [asyncErr(list)],
  create: [asyncErr(create)],
};
