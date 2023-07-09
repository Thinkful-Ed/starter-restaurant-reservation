/** @format */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

////////////////
// MIDDLEWARE //
////////////////

async function reservationExists(request, response, next) {
	const { reservation_id } = request.params;

	let reservation = await service.read(reservation_id);

	const error = {
		status: 404,
		message: `Reservation ${reservation_id} cannot be found.`,
	};

	if (reservation) {
		response.locals.reservation = reservation;
		return next();
	}

	next(error);
}

async function validateReservation(request, response, next) {
	if (!request.body.data)
		return next({ status: 400, message: "Data Missing!" });
	const {
		first_name,
		last_name,
		mobile_number,
		people,
		reservation_date,
		reservation_time,
		status,
	} = request.body.data;
	let updatedStatus = status;
	if (
		!first_name ||
		!last_name ||
		!mobile_number ||
		!people ||
		!reservation_date ||
		!reservation_time
	)
		return next({
			status: 400,
			message:
				"Please complete the following: first_name, last_name, mobile_number, people, reservation_date, and reservation_time.",
		});
	if (!reservation_date.match(/\d{4}-\d{2}-\d{2}/))
		return next({ status: 400, message: "reservation_date is invalid!" });
	if (!reservation_time.match(/\d{2}:\d{2}/))
		return next({ status: 400, message: "reservation_time is invalid!" });
	if (typeof people !== "number")
		return next({ status: 400, message: "people is not a number!" });
	if (!status) updatedStatus = "booked";
	if (status === "seated")
		return next({ status: 400, message: "reservation is already seated" });
	if (status === "finished")
		return next({ status: 400, message: "reservation is already finished" });
	response.locals.newReservation = {
		first_name,
		last_name,
		mobile_number,
		people,
		reservation_date,
		reservation_time,
		status: updatedStatus,
	};
	next();
}

async function isValidDateTime(request, _, next) {
	const { reservation_date, reservation_time } = request.body.data;
	const date = new Date(reservation_date);
	let today = new Date();
	const resDate = new Date(reservation_date).toUTCString();

	if (resDate.includes("Tue")) {
		return next({
			status: 400,
			message: "Sorry, we are closed on Tuesdays. Please choose another day.",
		});
	}

	// if (reservation_date.slice(0, 4) < today.getFullYear()) {
	//   return next({
	//     status: 400,
	//     message: 'Please choose a future date.',
	//   });
	// }

	if (
		date.valueOf() < today.valueOf() &&
		date.toUTCString().slice(0, 16) !== today.toUTCString().slice(0, 16)
	)
		return next({
			status: 400,
			message: "Reservations must be made in the future!",
		});

	if (reservation_time < "10:30" || reservation_time > "21:30") {
		return next({
			status: 400,
			message: "Sorry, we are closed at that time. Please choose another time.",
		});
	}
	next();
}

////////////////////
// END MIDDLEWARE //
////////////////////

// Create
async function create(_, response) {
	const data = await service.create(response.locals.newReservation);
	response.status(201).json({
		data: data[0],
	});
}

// Read
async function read(_, response) {
	response.json({
		data: response.locals.reservation,
	});
}

// Update

const update = async (request, response) => {
	const { reservation } = response.locals;

	const updatedReservation = { ...reservation, ...request.body.data };
	const { reservation_id } = reservation;

	const data = await service.update(reservation_id, updatedReservation);

	response.json({ data: data[0] });
};

// Update Status
async function updateStatus(request, response, next) {
	const newStatus = request.body.data.status;
	const validStatus = ["booked", "seated", "finished", "cancelled"];
	const { reservation } = response.locals;
	const { reservation_id } = reservation;
	let { status } = reservation;
	if (!validStatus.includes(newStatus)) {
		return next({
			status: 400,
			message: "Cannot accept unknown status",
		});
	}
	if (status === "finished") {
		return next({
			status: 400,
			message: "Cannot change finished reservation",
		});
	}

	const updatedReservation = { ...reservation, ...request.body.data };

	const data = await service.update(reservation_id, updatedReservation);

	response.json({ data: { status: newStatus } });
}

// List
async function list(request, response) {
	const { date, mobile_number } = request.query;
	let results = null;

	!date
		? (results = await service.search(mobile_number))
		: (results = await service.list(date));

	results = results.filter((result) => {
		return result.status !== "finished";
	});

	response.json({ data: results });
}

module.exports = {
	create: [
		asyncErrorBoundary(validateReservation),
		asyncErrorBoundary(isValidDateTime),
		asyncErrorBoundary(create),
	],
	read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
	update: [
		asyncErrorBoundary(reservationExists),
		asyncErrorBoundary(validateReservation),
		asyncErrorBoundary(update),
	],
	updateStatus: [
		asyncErrorBoundary(reservationExists),
		asyncErrorBoundary(updateStatus),
	],
	list: [asyncErrorBoundary(list)],
};
