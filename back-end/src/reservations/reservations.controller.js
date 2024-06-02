/**
 * List handler for reservation resources
 */
async function list(req, res) {
  res.json({
    data: [],
  });
}

let nextId = 1;

async function create(req, res) {
  const newReservation = req.body.data;

  const now = new Date().toISOString();
  newReservation.reservation_id = nextId++;
  newReservation.created_at = now;
  newReservation.updated_at = now;

  res.status(201).json({
    data: newReservation,
  });
}
module.exports = {
  list,create,
};
