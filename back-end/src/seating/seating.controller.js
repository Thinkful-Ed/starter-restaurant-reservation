const seatingService = require('./seating.service');



function list(req, res) {
  let seat;
  seat = seatingService.list();
  res.json({ data: seat });
}

module.exports = {
  list,
};