const service = require("./reservations.service");
const validation = require("./reservations.validation");

/**
 * List handler for reservation resources
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
/**
 * Create handler for reservation resources
 */
async function create(req, res) {
	const data = await service.create(res.locals.validReservation);
	res.status(201).json({ data });
}
/**
 * Read handler for reservation resources
 */
function read(req, res) {
	const data = res.locals.foundReservation;
	res.json({ data });
}
/**
 * Update handler for reservation resources
 */
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
	const { reservation } = res.locals;
	// set reservation status to validated status
	reservation.status = res.locals.status;
	const data = await service.update(
		res.locals.validReservation,
		res.locals.foundReservation.reservation_id,
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
