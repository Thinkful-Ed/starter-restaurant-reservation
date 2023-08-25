const service = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

/**
 * List handler for reservation resources
 */
//middleware//////////////////////////////////////////////middleware//
async function reservationExists(req, res, next) {
	const { reservation_id } = req.params;
	const reservation = await service.read(reservation_id);
	if (reservation) {
		res.locals.reservation = reservation;
		return next();
	}
	return res
		.status(404)
		.json({ error: `reservation ${reservation_id} not found` });
}

const requiredFields = [
	'first_name',
	'last_name',
	'mobile_number',
	'reservation_date',
	'reservation_time',
	'people',
];

function hasData(req, res, next) {
	const { data } = req.body;

	if (!data) {
		return res.status(400).json({ error: 'Data is missing' });
	}

	for (const field of requiredFields) {
		if (!data[field]) {
			return res.status(400).json({ error: `${field} is missing` });
		}

		if (typeof data[field] === 'string' && data[field].trim() === '') {
			return res.status(400).json({ error: `${field} cannot be empty` });
		}
	}

	next();
}

//date////////////////////////////////////////////////////////////////////////////////////date//

function isDate(req, res, next) {
	const { reservation_date } = req.body.data;
	
	const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
	
	if (!dateRegex.test(reservation_date)) {
		return res
		.status(400)
		.json({ error: `reservation_date must be in YYYY-MM-DD format` });
	}
	
	next();
}

function isNotPast(req, res, next) {
	const { reservation_date } = req.body.data;

	const date = new Date(reservation_date);
	const today = new Date();

	if (date < today) {
		return res
			.status(400)
			.json({ error: `reservation_date must be in the future` });
	}

	next();
}

function isNotTuesday(req, res, next) {
	const { reservation_date } = req.body.data;

	const date = new Date(reservation_date);

	if (date.getUTCDay() === 2) {
		return res.status(400).json({ error: `restaurant is closed on Tuesdays` });
	}

	next();
}

//time//////////////////////////////////////////////////////////////////////////////////////////time//

function isTime(req, res, next) {
	const { reservation_time } = req.body.data;

	const timeRegex = /^\d{2}:\d{2}$/;

	if (!timeRegex.test(reservation_time)) {
		return res
			.status(400)
			.json({ error: `reservation_time must be in HH:MM format` });
	}

	next();
}

function isNotTooEarly(req, res, next) {
	const { reservation_time } = req.body.data;

	const [hours, minutes] = reservation_time.split(':').map(Number);

	if (hours < 10 || (hours === 10 && minutes < 30)) {
		return res
			.status(400)
			.json({ error: `reservation must be between 10:30am and 9:30pm` });
	}

	next();
}

function isNotTooLate(req, res, next) {
	const { reservation_time } = req.body.data;

	const [hours, minutes] = reservation_time.split(':').map(Number);

	if (hours > 21 || (hours === 21 && minutes > 30)) {
		return res
			.status(400)
			.json({ error: `reservation must be between 10:30am and 9:30pm` });
	}

	next();
}

//people//////////////////////////////////////////////////////////////////////////////////////////people//

function isNumber(req, res, next) {
	const { people } = req.body.data;

	if (typeof people !== 'number') {
		return res.status(400).json({ error: `people must be a number` });
	}

	next();
}

//status///////////////////////////////////////////////////////////////////////////////status//
function hasStatus(req, res, next) {
	const { status } = req.body.data;
	console.log(status);
	const validStatus = ['booked', 'seated', 'finished', 'cancelled'];

	if (!validStatus.includes(status)) {
		return res.status(400).json({ error: "status is unknown" });
	}

	next();
}



function isNotSeated(req, res, next) {
	const { status } = req.body.data;
	if (status === 'seated') {
		return res.status(400).json({ error: 'reservation is already seated' });
	}
	next();
}

function isNotFinished(req, res, next) {
	const { status } = req.body.data;
	if (status === 'finished') {
		return res.status(400).json({ error: 'reservation is already finished' }
		);
	}
	next();
}

function isNotFinishedLocal(req, res, next) {
	const { status } = res.locals.reservation;
	if (status === 'finished') {
		return res.status(400).json({ error: 'reservation is already finished' }
		);
	}
	next();
}
//crudl///////////////////////////////////////////////////crudl//
async function listResevations(req, res) {
	const { date } = req.query;
	const { mobile_number } = req.query;
	if (mobile_number) {
		const data = await service.search(mobile_number);
		res.json({ data });
	} else if (date) {
		const data = await service.listDate(date);
		res.json({ data });
	} else {
		const data = await service.listAll();
		res.json({ data });
	}
}

async function createReservation(req, res) {
	const newReservation = await service.create(req.body.data);
	res.status(201).json({ data: newReservation });
}

async function readReservation(req, res) {
	const { reservation_id } = req.params;
	const data = await service.read(reservation_id);
	res.status(200).json({ data });
}

async function updateReservationStatus(req, res) {
	const { reservation_id } = req.params;
	const { status } = req.body.data;
	const data = await service.update(reservation_id, status);
	res.status(200).json({ data });
}

async function updateReservation(req, res) {
	const { reservation_id } = req.params;
	const data = await service.updateReservation(reservation_id, req.body.data);
	res.status(200).json({ data });
}

module.exports = {
	list: asyncErrorBoundary(listResevations),
	create: [
		hasData,
		isDate,
		isNotPast,
		isNotTuesday,
		isTime,
		isNotTooEarly,
		isNotTooLate,
		isNumber,
		isNotSeated,
		isNotFinished,
		asyncErrorBoundary(createReservation),
	],
	read: [
		asyncErrorBoundary(reservationExists),
		asyncErrorBoundary(readReservation)
	],
	updateStatus: [
		asyncErrorBoundary(reservationExists),
		hasStatus,
		isNotFinishedLocal,
		asyncErrorBoundary(updateReservationStatus),
	],
	updateReservation: [
		asyncErrorBoundary(reservationExists),
		hasData,
		isDate,
		isTime,
		isNotPast,
		isNumber,
		asyncErrorBoundary(updateReservation),
	],
};
