const service = require("./reservations.service.js");

async function list(req, res) {
  const { date } = req.query;

  if (date) {
    res.json({ data: await service.reservationsOnDate(date) });
  } else {
    res.json({ data: await service.getAllReservations() })
  }
}

module.exports = {
  list,
};
