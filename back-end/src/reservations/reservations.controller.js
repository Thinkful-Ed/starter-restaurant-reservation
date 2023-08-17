const reservationsService = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

/**
 * List handler for reservation resources
 */
//create helper functions that returns 400 if data is missing

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

// function validateNames(req, res, next) {
// 	const { data } = req.body;
// 	const namePattern = /^[A-Za-z]+$/;

// 	if (namePattern.test(data.first_name) && namePattern.test(data.last_name)) {
// 		next();
// 	} else {
// 		return res
// 			.status(400)
// 			.json({ error: 'Invalid first_name or last_name format' });
// 	}
// }

function validateNames(req, res, next) {
	const { data } = req.body;

	if (typeof data.first_name === 'string' && typeof data.last_name === 'string') {
			next();
	} else {
			return res
					.status(400)
					.json({ error: 'Invalid first_name or last_name format' });
	}
}

function validateReservationDate(req, res, next) {
	const { data } = req.body;
	
	// Check if reservation_date is a valid date
	const parsedDate = Date.parse(data.reservation_date);
	if (isNaN(parsedDate)) {
			return res.status(400).json({ error: 'reservation_date is not a valid date' });
	}
	
	const currentDate = new Date();
	const submittedDate = new Date(parsedDate);

	// Check if reservation_date is in the past
	if (submittedDate < currentDate) {
			return res.status(400).json({ error: 'reservation_date must be a future date' });
	}

	// Check if reservation_date is a Tuesday (day of the week: 2)
	if (submittedDate.getUTCDay() === 2) { // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
			return res.status(400).json({ error: 'closed' });
	}
	
	next();
}


function validateReservationTime(req, res, next) {
	const { data } = req.body;
	const timePattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
	
	// Check if reservation_time is a valid time format
	if (!timePattern.test(data.reservation_time)) {
			return res.status(400).json({ error: 'reservation_time is not a valid time' });
	}
	
	const submittedTime = data.reservation_time.split(':');
	const hours = parseInt(submittedTime[0]);
	const minutes = parseInt(submittedTime[1]);

	// Get the current time
	const currentTime = new Date();
	const currentHours = currentTime.getHours();
	const currentMinutes = currentTime.getMinutes();

	// Check if reservation_time is in the past
	if (hours < currentHours || (hours === currentHours && minutes < currentMinutes)) {
			return res.status(400).json({ error: 'reservation_time must be in the future' });
	}

	// Check if reservation_time is before 10:30am or after 9:30pm
	if (hours < 10 || (hours === 10 && minutes < 30) || hours > 21 || (hours === 21 && minutes > 30)) {
			return res.status(400).json({ error: 'reservation_time is not within allowed hours' });
	}
	
	// If all checks pass, move to the next middleware
	next();
}


function validatePeople(req, res, next) {
	const { data } = req.body;
	if (typeof data.people === 'number' && data.people > 0) {
		next();
	} else {
		return res
			.status(400)
			.json({ error: 'people must be a valid positive number' });
	}
}

async function list(req, res) {
	const { date, mobile_number } = req.query;
	let reservation;

	if (date) {
		reservation = await reservationsService.list(date);
	} else if (mobile_number) {
		reservation = await reservationsService.search(mobile_number);
	} else {
		reservation = await reservationsService.listAll();
	}

	res.json({ data: reservation });
}

async function create(req, res) {
	const newReservation = await reservationsService.create(req.body.data);
	res.status(201).json({ data: newReservation });
}

module.exports = {
	list: asyncErrorBoundary(list),
	create: [
		hasData,
		validateNames,
		validateReservationDate,
		validateReservationTime,
		validatePeople,
		asyncErrorBoundary(create),
	],
};
