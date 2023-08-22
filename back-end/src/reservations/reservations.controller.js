const service = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

/**
 * List handler for reservation resources
 */

//return 400 if data is missing

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

// return 400 if reservation_date is not pattern="\d{4}-\d{2}-\d{2}"

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

//returns 400 if reservation occurs in the past

function isPast(req, res, next) {
	const { reservation_date } = req.body.data;

	const date = new Date(reservation_date);
	const today = new Date();

	if (date < today) {
		return res.status(400).json({ error: `reservation_date must be in the future` });
	}

	next();
}

//returns 400 if reservation_date is a Tuesday

function isTuesday(req, res, next) {
	const { reservation_date } = req.body.data;

	const date = new Date(reservation_date);

	if (date.getUTCDay() === 2) {
		return res.status(400).json({ error: `restaurant is closed on Tuesdays` });
	}

	next();
}


//return 400 if reservation_time is not pattern="\d{2}:\d{2}"

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


//return 400 id people is not a number

function isNumber(req, res, next) {
  const { people } = req.body.data;
  console.log(typeof people, people); // Add this line

  if (typeof people !== 'number') {
    return res.status(400).json({ error: `people must be a number` });
  }

  next();
}

async function list(req, res) {
	const { date } = req.query;

	if (date) {
		const data = await service.listDate(date);
		res.json({ data });
	} else {
		const data = await service.listAll();
		res.json({ data });
	}
}

async function create(req, res) {
	const newReservation = await service.create(req.body.data);
	res.status(201).json({ data: newReservation });
}

module.exports = {
	list: asyncErrorBoundary(list),
	create: [hasData, isDate, isPast, isTuesday, isTime, isNumber, asyncErrorBoundary(create)],
};
