const reservationsService = require("./reservations.service");
/**
 * List handler for reservation resources
 */

async function list(req, res) {
  const data = await reservationsService.list(req.query.date);
  //console.log(req.query.date);
  console.log(req.query);
  res.json({ data });
}

module.exports = {
  list,
};
