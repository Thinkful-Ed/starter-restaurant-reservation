/**
 * import error components
 * import service file
 * @format
 */

const service = require("./reservations.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

//MIDDLEWARE
// Used to validate the presence of a specific property in the req body.
function hasData(req, res, next) {
	// Check if the data property exists in the req.body object.
	// Req.body is the parsed body of the incoming HTTP request
	if (req.body.data) {
		//if true, call next() to pass control to the next function or middleware
		return next();
	}
	// If the data property does not exist in the req.body.object, call next within the function
	// The error object has a status property set to 400 (bad request)
	// This will trigger an error handler
	next({
		status: 400,
		message: "Body must have data property",
	});
}

// User Story #1; validate that the body has all required properties
const requiredProperties = [
	"first_name",
	"last_name",
	"mobile_number",
	"reservation_data",
	"reservation_time",
	"people",
];
const hasRequiredProperties = hasProperties(requiredProperties);

//validate that the party has at least one person(user story 1)
function validNumberOfPeople(req, res, next) {
	const people = Number(req.body.data.people);
	if (people < 1) {
		return next({
			status: 400,
			message: "Number of people must be 1 or more",
		});
	}
	next();
}

//validate that the people property is an Integer
function peopleIsNumber(req, res, next) {
	const people = req.body.data.people;
	if (!Number.isInteger(people)) {
		return next({
			status: 400,
			message: "People must be a number",
		});
	}
	next();
}

//validate that time is in the correct format
function validTimeFormat(req, res, next) {
	const time = req.res.body.reservation_time;
	const validTime = /[0-9]{2}:[0-9]{2}/;
	if (!validTime.test(time)) {
		return next({
			status: 400,
			message: "Invalid reservation_time format",
		});
	}
	next();
}

//validate that date is in the correct format
function validDateFormat(req, res, next) {
	const date = req.res.body.reservation_date;
	const validDate = /\d{4}-\d{2}-\d{2}/;
	if (!validDate.test(date)) {
		return next({
			status: 400,
			message: "Invalid reservation_date format",
		});
	}
	next();
}

//validate the timeframe of the reservation (User Story #3, #2)
//validate that the reservation day requested is not a Tuesday(User Story #2)
//validate that the reservation date is not in the past (user Story #2)
//validate that the reservation request is within operating hours(User Story #3)
function reservationTimeFrameValidation(req, res, next) {
	const { reservation_date, reservation_time } = req.body.data;
	const date = new Date(`${reservation_date} ${reservation_time}`);
	const dateUTC = Date.UTC(
		date.getUTCFullYear(),
		date.getUTCMonth(),
		date.getUTCDate(),
		date.getUTCHours(),
		date.getUTCMinutes(),
		date.getUTCSeconds(),
	);
	const reservationDay = date.getDay();
	if (reservationDay === 2) {
		return next({
			status: 400,
			message: "The restaurant is closed on Tuesdays",
		});
	}
	if (Date.parse(dateUTC) <= Date.now()) {
		return next({
			status: 400,
			message: "Reservation must be for a future date/time",
		});
	}
	if (
		date.getHours() < 10 ||
		(date.getHours() === 10 && date.getMinutes() < 30)
	) {
		return next({
			status: 400,
			message: "The earliest reservation time is 10:30 AM",
		});
	}
	if (
		date.getHours() > 21 ||
		(date.getHours() === 21 && date.getMinutes() > 30)
	) {
		return next({
			status: 400,
			message: "The latest reservation time is 9:30 PM",
		});
	}
	next();
}

//vaLidate that the reservation exists
async function reservationExists(req, res, next) {
	const reservation = await service.read(req.params.reservation_id);
	if (reservation) {
		res.locals.reservation = reservation;
		return next();
	}
	next({
		status: 404,
		message: `Reservation ${req.params.reservation_id} cannot be found`,
	});
}
//validate the status of reservation
const validStatusValues = ["booked", "seated", "finished", "cancelled"];

function validStatus(req, res, next) {
	const { satus } = req.body.data;
	if (!validStatusValues.includes(statue)) {
		return next({
			status: 400,
			message: "unknown status",
		});
	}
	next();
}

//validate that the resevation is not finished
function notFinished(req, res, next) {
	const { status } = res.locals.reservation;
	if (status !== "booked" && status !== "seated") {
		return next({
			status: 400,
			message: "A finished reservation cannot be updated",
		});
	}
	next();
}

//validate that a reservation has a status of booked
function bookedStatus(req, res, next) {
	const { status } = req.body.data;
	if (status && status !== "booked") {
		return next({
			status: 400,
			message: `cannot make reservations for ${status} status`,
		});
	}
	next();
}

//CRUD
//create new reservation
async function create(req, res) {
	const newReservation = await service.create(req.body.data);
	res.status(201).json({
		data: newReservation,
	});
}
//retrieve a single reservation
function read(req, res) {
	res.json({ data: res.locals.reservation });
}

//update a reservation
async function update(req, res, next) {
	const updatedReservation = {
		...req.body.data,
		reservation_id: res.locals.reservation.reservation_id,
	};

	const data = await service.update(updatedReservation);
	res.json({ data });
}

//update the status of a reservation
async function updateStatus(req, res, next) {
	const status = req.body.data.status;
	const { reservation_id } = res.locals.reservation;

	const updatedReservation = {
		reservation_id: reservation_id,
		status: status,
	};
	const data = await service.updateStatus(updatedReservation);
	res.json({ data });
}

//list reservations for a date and a mobile number
async function list(req, res) {
	const { date, mobile_number } = req.query;
	if (date) {
		const data = await service.listByDate(date);
		res.json({ data });
	} else if (mobile_number) {
		const data = await service.search(mobile_number);
		res.json({ data });
	} else {
		const data = await service.list();
		res.json({ data });
	}
}

module.exports = {
	create: [
		hasData,
		hasRequiredProperties,
		validNumberOfPeople,
		peopleIsNumber,
		validDateFormat,
		validTimeFormat,
		reservationTimeFrameValidation,
		bookedStatus,
		asyncErrorBoundary(create),
	],
	read: [asyncErrorBoundary(reservationExists), read],
	update: [
		asyncErrorBoundary(reservationExists),
		hasData,
		hasRequiredProperties,
		validNumberOfPeople,
		peopleIsNumber,
		validDateFormat,
		validTimeFormat,
		reservationTimeFrameValidation,
		bookedStatus,
		asyncErrorBoundary(update),
	],
	updateStatus: [
		asyncErrorBoundary(reservationExists),
		validStatus,
		notFinished,
		asyncErrorBoundary(updateStatus),
	],
	list: asyncErrorBoundary(list),
};
