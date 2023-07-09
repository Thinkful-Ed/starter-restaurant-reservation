/** @format */

const service = require("./seat.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

////////////////
// MIDDLEWARE //
////////////////

async function seatExists(request, response, next) {
	if (!request.body.data)
		return next({
			status: 400,
			message: "Data is missing!",
		});

	const reservationId = request.body.data.reservation_id;
	const table = response.locals.table;
	const { table_id, capacity } = table;
	let { reservation_id } = table;

	if (!reservationId) {
		return next({
			status: 400,
			message: "Missing reservation_id",
		});
	}

	if (reservation_id) {
		return next({
			status: 400,
			message: "Table is already occupied.",
		});
	}

	// Assign the reservation_id and then check if it is a valid reservation

	reservation_id = reservationId;

	let reservation = await service.read(reservationId);

	if (!reservation) {
		return next({
			status: 404,
			message: `Reservation ${reservationId} cannot be found.`,
		});
	}

	if (reservation.people > capacity) {
		return next({
			status: 400,
			message: `Table ${table_id} does not have the capacity for your party. Choose another table.`,
		});
	}

	next();
}

// End of Middleware

// Update
async function update(request, response, next) {
	try {
		const { table } = response.locals;
		const { reservation_id } = request.body.data;
		const { table_id } = request.params;

		const reservation = await service.read(reservation_id);
		if (reservation.status === "seated") {
			return next({
				status: 400,
				message: `Reservation ${reservation_id} has already been seated.`,
			});
		}
		const updatedTable = { ...table, reservation_id };

		const data = await service.update(table_id, reservation_id, updatedTable);

		response.json({ data });
	} catch (err) {
		console.error(err);
	}
}

// Delete
async function finish(_, response, next) {
	const table = response.locals.table;
	let { reservation_id } = table;

	if (!reservation_id)
		return next({
			status: 400,
			message: "This table is not occupied.",
		});

	const deleted = await service.finish(reservation_id);

	response.sendStatus(200).json({ data: deleted });
}

module.exports = {
	update: [asyncErrorBoundary(seatExists), asyncErrorBoundary(update)],
	delete: [asyncErrorBoundary(finish)],
};
