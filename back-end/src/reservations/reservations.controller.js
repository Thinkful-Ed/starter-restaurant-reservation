/** @format */

//import error components
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

//import service file
const service = require("./reservations.service");

//Validation functions

//validate that body has data property

function hasData(req, res, next) {
	if (req.body.data) {
		return next();
	}
	next({ status: 400, message: "Body must have data property" });
}

//validate that body has all required properties

const requiredProperties = [
	"first_name",
	"last_name",
	"mobile_number",
	"reservation_date",
	"reservation_time",
	"people",
];

const hasRequiredProperties = hasProperties(requiredProperties);

//validate that number of people is not less than 1

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

//validate that people property is a number

function peopleIsNumber(req, res, next) {
	const people = req.body.data.people;

	if (!Number.isInteger(people)) {
		return next({
			status: 400,
			message: "people must be a number",
		});
	}
	next();
}

//validate that time is valid format

function validTimeFormat(req, res, next) {
	const time = req.body.data.reservation_time;
	const validTime = /[0-9]{2}:[0-9]{2}/;

	if (!validTime.test(time)) {
		return next({
			status: 400,
			message: "Invalid reservation_time format",
		});
	}
	next();
}

//validate that date is valid format

function validDateFormat(req, res, next) {
	const date = req.body.data.reservation_date;
	const validDate = /\d{4}-\d{2}-\d{2}/;

	if (!validDate.test(date)) {
		return next({
			status: 400,
			message: "Invalid reservation_date format",
		});
	}
	next();
}

//validate reservation's timeframe

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

	//reservation is not for a tuesday
	const resDay = date.getDay();

	if (resDay === 2) {
		return next({
			status: 400,
			message: "The restaurant is closed on Tuesdays",
		});
	}

	if (
		date.getHours() < 10 ||
		(date.getHours() === 10 && date.getMinutes() < 30)
	) {
		return next({
			status: 400,
			message: "The earliest reservation time is 10:30am",
		});
	}

	if (
		date.getHours() > 21 ||
		(date.getHours() === 21 && date.getMinutes() > 30)
	) {
		return next({
			status: 400,
			message: "The latest reservation time is 9:30pm",
		});
	}
	next();
}
function isNotPastDate(req, res, next) {
	const { reservation_date, reservation_time } = req.body.data;
	const [hour, minute] = reservation_time.split(":");
	let [year, month, day] = reservation_date.split("-");
	month -= 1;
	const reservationDate = new Date(
		year,
		month,
		day,
		hour,
		minute,
		59,
		59,
	).getTime();
	const today = new Date().getTime();

	if (reservationDate > today) {
		next();
	} else {
		next({
			status: 400,
			message: "reservation date and time must be set in the future",
		});
	}
}
//validate that reservation exists

async function reservationExists(req, res, next) {
	const reservation = await service.read(req.params.reservation_id);

	if (reservation) {
		res.locals.reservation = reservation;
		return next();
	}
	next({
		status: 404,
		message: `Reservation ${req.params.reservation_id}  cannot be found`,
	});
}

//validate the status of reservation

const validStatusValues = ["booked", "seated", "finished", "cancelled"];

function validStatus(req, res, next) {
	const { status } = req.body.data;

	if (!validStatusValues.includes(status)) {
		return next({ status: 400, message: "unknown status" });
	}
	next();
}

//validate that reservation is not finished (a finished reservation cannot be updated)

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

//validate that reservation has booked status

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

//CRUDL functions

//create new reservation

async function create(req, res) {
	const newReservation = await service.create(req.body.data);

	res.status(201).json({
		data: newReservation,
	});
}

// get a single reservation

function read(req, res) {
	res.json({ data: res.locals.reservation });
}

//update reservation

async function update(req, res, next) {
	const updatedReservation = {
		...req.body.data,
		reservation_id: res.locals.reservation.reservation_id,
	};

	const data = await service.update(updatedReservation);
	res.json({ data });
}

//update reservation status

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

//list reservations for a date, a mobile number

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
		isNotPastDate,
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
