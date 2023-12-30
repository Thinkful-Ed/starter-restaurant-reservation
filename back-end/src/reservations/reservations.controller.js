const service = require("./reservations.service");
const validation = require("./reservations.validation");

/**
 * Handlers for reservation resources
 */
async function list(req, res) {
	const date = req.query.date;
	const mobile_number = req.query.mobile_number;
	let data = [];
	// if mobile number query, filter by mobile number
	// if data query, filter by date
	// else, return all unfiltered
	if (mobile_number) {
		data = await service.search(mobile_number);
	} else if (date) {
		data = await service.listDate(date);
	} else {
		data = await service.list();
	}
	// return result
	res.json({ data });
}
async function create(req, res) {
	// find validated reservation in locals
	const { validReservation } = res.locals;
	// call API and return response
	const data = await service.create(validReservation);
	res.status(201).json({ data });
}
function read(req, res) {
	// find existing reservation in locals and return
	const { foundReservation } = res.locals;
	res.json({ data: foundReservation });
}
async function update(req, res) {
	const data = await service.update(
		res.locals.validReservation,
		res.locals.foundReservation.reservation_id,
	);
	res.json({ data });
}
/**
 * Update status handler for reservation resources
 */
async function updateStatus(req, res) {
	const { foundReservation, validStatus } = res.locals;
	// set reservation status to validated status
	foundReservation.status = validStatus;
	const data = await service.update(
		foundReservation,
		foundReservation.reservation_id,
	);
	res.json({ data });
}
/**
 * Return with required validation in order
 */
module.exports = {
	list,
	create: [validation.isValidReservation, validation.isStatusBooked, create],
	read: [validation.reservationExists, read],
	update: [
		validation.reservationExists,
		validation.isValidReservation,
		validation.statusIsFinished,
		update,
	],
	updateStatus: [
		validation.reservationExists,
		validation.reservationIsFinished,
		validation.statusIsFinished,
		validation.isValidStatus,
		updateStatus,
	],
};
