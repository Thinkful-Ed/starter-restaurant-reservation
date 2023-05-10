/**
 * List handler for reservation resources
 */
const reservationsService = require('./reservations.service');

async function list(req, res) {
  const date = req.query.date;
  const mobile_number = req.query.mobile_number;
  const data = await (date
    ? reservationsService.list(date)
    : reservationsService.search(mobile_number));
  res.json({ data });
}



module.exports = {
  list,
};
