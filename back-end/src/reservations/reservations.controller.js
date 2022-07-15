/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");

//----------------HELPER FUNCTIONS----------------

function checkValidFields(req, res, next) {
	const validFields = [
		"first_name",
		"last_name",
		"mobile_number",
		"reservation_date",
		"reservation_time",
		"people",
	];
	const { data } = req.body;

	if (data) {
		for (let field of validFields) {
			if (!data[field]) {
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
				if (!validateIfFuturePresentDate(data[field])) {
					return next({
						status: 400,
						message: `The reservation date is in the past. Only future reservations are allowed.`,
					});
				}
			}
			if (field === "reservation_time") {
				if (!validateTime(data[field])) {
					return next({
						status: 400,
						message: `${field} is not valid.`,
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
		}
	} else {
		return next({ status: 400, message: "Data does not exists" });
	}
	return next();
}

function validateDate(date) {
	date = new Date(date);
	if (date.toString() === "Invalid Date") {
		return false;
	} else {
		return true;
	}
}

function validateTime(time) {
	time = time.split(":").map((value) => {
		return parseInt(value);
	});
	if (!time[0]) {
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

function validatePeople(peopleCount) {
	if (typeof peopleCount === "string" || peopleCount <= 0) {
		return false;
	}
	return true;
}

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
function validateIfFuturePresentDate(date) {
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

//-----------------CRUD FUNCTIONS-----------------
async function list(req, res) {
	const queryDate = req.query;
	const data = await service.list(queryDate.date);

	res.json({
		data: data,
	});
}

async function create(req, res, next) {
	const { data } = req.body;
	const responseData = await service.create(data);
	res.status(201).send({ data: responseData });
}

module.exports = {
	list,
	create: [checkValidFields, create],
};
