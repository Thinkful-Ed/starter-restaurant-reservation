const service = require("./tables.service");
const ReservationsService = require("../reservations/reservations.service");
const validation = require("./tables.validation.js");

/**
 * Handlers for table & seat resources
 */
async function list(req, res) {
	const data = await service.list();
	res.json({ data });
}
async function create(req, res) {
	// find validated table in locals
	const { validTable } = res.locals;
	// call API and return response
	const data = await service.create(validTable);
	res.status(201).json({ data });
}
function read(req, res) {
	// find existing table in locals and return
	const { foundTable } = res.locals;
	res.json({ data: foundTable });
}
/**
 * Handlers for table assignment resources
 */
async function updateTableAssignment(req, res, next) {
	// find table in locals, reservation ID in req body
	const { foundTable } = res.locals;
	const { reservation_id } = req.body;
	// update table
	foundTable.reservation_id = reservation_id;
	const data = await service.update(foundTable, foundTable.table_id);
	// update reservation
	const reservation = await ReservationsService.read(
		foundTable.reservation_id,
	);
	if (reservation.status === "seated") {
		return next({
			status: 400,
			message: "Reservation already seated. ",
		});
	} else {
		reservation.status = "seated";
	}
	await ReservationsService.update(reservation, reservation.reservation_id);
	res.json({ data });
}
async function destroyTableAssignment(req, res) {
	// find table in locals
	const { foundTable } = res.locals;
	// update table
	foundTable.reservation_id = null;
	const data = await service.update(foundTable, foundTable.table_id);
	// update reservation
	const reservation = await ReservationsService.read(
		foundTable.reservation_id,
	);
	if (reservation) {
		reservation.status = "finished";
		await ReservationsService.update(
			reservation,
			reservation.reservation_id,
		);
	}
	res.json({ data });
}
/**
 * Return with required validation in order
 */
module.exports = {
	list,
	create: [validation.isValidTable, create],
	read: [validation.tableExists, read],
	update: [
		validation.tableExists,
		validation.isAvailable,
		validation.isLargeEnough,
		updateTableAssignment,
	],
	delete: [
		validation.tableExists,
		validation.isUnavailable,
		destroyTableAssignment,
	],
};
