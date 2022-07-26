const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//----------------HELPER FUNCTIONS----------------

//performs a read operation to verify reservation ID and assigns the response to res.locals.reservation
async function verifyReservationId(req, res, next) {
	const { reservation_id } = req.params;
	const reservation = await service.read(reservation_id);
	if (!reservation) {
		return next({
			status: 404,
			message: `Reservation ID: ${reservation_id} - Not Found`,
		});
	} else {
		res.locals.reservation = reservation;
		return next();
	}
}

//checks the validity of all fields in the body data using boolean helper functions
function checkValidFields(req, res, next) {
	const validFields = [
		"first_name",
		"last_name",
		"mobile_number",
		"reservation_date",
		"reservation_time",
		"people",
		"status",
	];
	const { data } = req.body;

	if (data) {
		for (let field of validFields) {
			if (!data[field] && field !== "status") {
				return next({
					status: 400,
					message: `${field} does not exist.`,
				});
			}
			if (field === "reservation_date") {
				if (!validateDate(data[field])) {
					return next({
						status: 400,
						message: `${field} is not valid.`,
					});
				}
				if (!validateDay(data[field])) {
					return next({
						status: 400,
						message: `Restaurant is closed on Tuesdays.`,
					});
				}
				if (!validateIfFutureDate(data[field])) {
					return next({
						status: 400,
						message: `The reservation date is in the past. Only future reservations are allowed.`,
					});
				}
			}
			if (field === "reservation_time") {
				const time = data[field].split(":").map((value) => {
					return parseInt(value);
				});

				if (!validateTime(time)) {
					return next({
						status: 400,
						message: `${field} is not valid.`,
					});
				}

				if (!validateBookingTimeInOperatingHours(time)) {
					return next({
						status: 400,
						message: `Booking time must be between 10:30 AM to 09:30 PM.`,
					});
				}

				if (
					!validateBookingTimeFuture(time, data["reservation_date"])
				) {
					return next({
						status: 400,
						message: `Booking time must be in the future and between 10:30 AM to 09:30 PM.`,
					});
				}
			}
			if (field === "people") {
				if (!validatePeople(data[field])) {
					return next({
						status: 400,
						message: `${field} is not valid.`,
					});
				}
			}
			if (field === "status" && data[field]) {
				if (!validateBookedStatus(data[field])) {
					return next({
						status: 400,
						message: `${data[field]}`,
					});
				}
			}
		}
	} else {
		return next({ status: 400, message: "Data does not exists" });
	}
	return next();
}

// validate booked status for Post request
function validateBookedStatus(status) {
	if (status !== "booked") {
		return false;
	}
	return true;
}

// verify valid status for put request to /reservations/:reservation_id/status
function verifyStatus(req, res, next) {
	const validStatusList = ["booked", "seated", "finished", "cancelled"];
	const { status } = req.body.data;

	const bodyStatus = res.locals.reservation.status;
	if (!validStatusList.includes(status)) {
		return next({ status: 400, message: `Status:${status} is not valid` });
	}
	if (bodyStatus === "finished") {
		return next({
			status: 400,
			message: `Cannot change status from finished.`,
		});
	}
	return next();
}

// verifies date from the body data is valid by converting it in the new Date object
function validateDate(date) {
	date = new Date(date);
	if (date.toString() === "Invalid Date") {
		return false;
	} else {
		return true;
	}
}

function validateTime(time) {
	if (!time[0] && time[0] !== 0) {
		return false;
	}
	if (time[0] < 0 || time[0] > 23) {
		return false;
	}
	if (time[1] < 0 || time[1] > 59 || time[2] < 0 || time[2] > 59) {
		return false;
	}
	return true;
}

function validateBookingTimeInOperatingHours(time) {
	let checkTime = time;

	if (checkTime[0] < 10 || (checkTime[0] === 10 && checkTime[1] < 30)) {
		return false;
	}
	if (checkTime[0] > 21 || (checkTime[0] === 21 && checkTime[1] > 30)) {
		return false;
	}

	return true;
}

function validateBookingTimeFuture(time, date) {
	let checkTime = time;
	let currentTime = new Date();
	currentTime = [currentTime.getHours(), currentTime.getMinutes()];

	if (checkIfSameDayBooking(date)) {
		if (checkTime[0] < currentTime[0]) {
			return false;
		}
		if (checkTime[0] === currentTime[0] && checkTime[1] < currentTime[1]) {
			return false;
		}
	}

	return true;
}

function validatePeople(peopleCount) {
	if (typeof peopleCount === "string" || peopleCount <= 0) {
		return false;
	}
	return true;
}

//validates reservation day is not a tuesday
function validateDay(date) {
	date = date.split("-");
	date = [date[1], date[2], date[0]].join("-");
	let newDate = new Date(date);
	if (newDate.getDay() === 2) {
		return false;
	}
	return true;
}

// checks to see if the date is not in the past.
// returns a boolean of true if passed validation for present/future date
function validateIfFutureDate(date) {
	date = date.split("-");
	date = [date[1], date[2], date[0]].join("-");
	let checkDate = new Date(date);
	let currentDate = new Date();
	checkDate = {
		year: checkDate.getFullYear(),
		month: checkDate.getMonth() + 1,
		day: checkDate.getDate(),
	};
	currentDate = {
		year: currentDate.getFullYear(),
		month: currentDate.getMonth() + 1,
		day: currentDate.getDate(),
	};

	if (checkDate.year < currentDate.year) {
		return false;
	} else if (
		checkDate.year === currentDate.year &&
		checkDate.month < currentDate.month
	) {
		return false;
	} else if (
		checkDate.year === currentDate.year &&
		checkDate.month === currentDate.month &&
		checkDate.day < currentDate.day
	) {
		return false;
	}

	return true;
}

// helper function for validating future booking time
// returns a boolean of true if the booking date and current date are the same
function checkIfSameDayBooking(date) {
	date = date.split("-");
	date = [date[1], date[2], date[0]].join("-");
	let checkDate = new Date(date);
	let currentDate = new Date();
	checkDate = {
		year: checkDate.getFullYear(),
		month: checkDate.getMonth() + 1,
		day: checkDate.getDate(),
	};
	currentDate = {
		year: currentDate.getFullYear(),
		month: currentDate.getMonth() + 1,
		day: currentDate.getDate(),
	};
	if (
		checkDate.year === currentDate.year &&
		checkDate.month === currentDate.month &&
		checkDate.day === currentDate.day
	) {
		return true;
	} else {
		return false;
	}
}

function verifyEditableStatus(req, res, next) {
	const { status } = res.locals.reservation;
	if (status !== "booked") {
		return next({ status: 400, message: `${status}` });
	}
	return next();
}

//-----------------CRUD FUNCTIONS-----------------
async function list(req, res) {
	const queryData = req.query;

	if (queryData["mobile_number"]) {
		const { mobile_number } = queryData;
		const data = await service.listByTelephoneNumber(mobile_number);
		return res.status(200).json({ data });
	}

	const date = queryData["date"];
	let todayDate = new Date();
	let data;

	if (!date) {
		todayDate = [
			todayDate.getFullYear(),
			todayDate.getMonth() + 1,
			todayDate.getDate(),
		].join("-");
		data = await service.listByDate(todayDate);
	} else {
		data = await service.listByDate(date);
	}
	return res.json({
		data: data,
	});
}

async function read(req, res, next) {
	const responseData = res.locals.reservation;
	res.status(200).json({ data: responseData });
}

async function create(req, res, next) {
	const data = req.body.data;
	data["status"] = "booked";
	const responseData = await service.create(data);
	res.status(201).json({ data: responseData });
}

async function updateStatus(req, res, next) {
	const currentData = res.locals.reservation;
	const updatedStatus = req.body.data;
	const updatedReservation = { ...currentData, ...updatedStatus };
	const response = await service.update(
		updatedReservation,
		updatedReservation.reservation_id
	);
	res.status(200).json({ data: response });
}

async function updateReservation(req, res, next) {
	const updatedReservation = req.body.data;
	const response = await service.update(
		updatedReservation,
		updatedReservation.reservation_id
	);
	res.status(200).json({ data: response });
}

module.exports = {
	list: [asyncErrorBoundary(list)],
	create: [asyncErrorBoundary(checkValidFields), asyncErrorBoundary(create)],
	read: [asyncErrorBoundary(verifyReservationId), asyncErrorBoundary(read)],
	updateStatus: [
		asyncErrorBoundary(verifyReservationId),
		verifyStatus,
		asyncErrorBoundary(updateStatus),
	],
	updateReservation: [
		asyncErrorBoundary(verifyReservationId),
		verifyEditableStatus,
		asyncErrorBoundary(checkValidFields),
		asyncErrorBoundary(updateReservation),
	],
};
