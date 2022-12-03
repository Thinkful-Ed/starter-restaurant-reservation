const reservationsService = require("./reservations.service")
/**
 * List handler for reservation resources
 */
 async function list(req, res) {
  const data = await reservationsService.list();
  res.json({ data });
}

async function create(req, res, next) {
  reservationsService
  .create(req.body.data)
  .then((data) => res.status(201).json({data}))
  .catch(next)
}

module.exports = {
  list,
  create
};
