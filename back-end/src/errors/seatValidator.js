const tablesService = require("../tables/tables.service");
const reservationsService = require("../reservations/reservations.service");

async function seatValidator(req, res, next) {
  const { table_id } = req.params;

  const { data = null } = req.body;
  if (!data) next({ status: 400, message: "data is required." });

  const seatId = data.reservation_id;
  if (!seatId) next({ status: 400, message: "reservation_id is required." });

  const { capacity, reservation_id } = await tablesService.read(table_id);
  const seatData = await reservationsService.read(seatId);
  if (!seatData)
    next({ status: 404, message: `Reservation id ${seatId} does not exit` });

  if (capacity < seatData.people) {
    next({
      status: 400,
      message:
        "The number of people reserved exceeds the seating capacity of this table. Please select another table.",
    });
  }

  if (reservation_id) {
    next({
      status: 400,
      message: "The table is occupied. Please select another table.",
    });
  }

  next();
}

module.exports = seatValidator;
