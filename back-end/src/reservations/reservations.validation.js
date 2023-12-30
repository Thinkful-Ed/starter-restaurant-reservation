const service = require("./reservations.service");

/**
 * Middleware to check if reservation resource exists on database
 */
async function reservationExists(req, res, next) {
	// find ID in params
	const id = req.params.reservation_id;
	// call API
	const reservation = await service.read(id);
	// load result to locals or break with 404 not found
	if (reservation) {
		res.locals.foundReservation = reservation;
		return next();
	}
	next({
		status: 404,
		message: `Reservation ${id} cannot be found.`,
	});
}
/**
 * Middleware to check if reservation resource in request body is valid
 */
function isValidReservation(req, res, next) {
	// find reservation in req body
	const reservation = { ...req.body.data };
	// store errors
	const errors = [];
	// check for invalid form fields
	if (!reservation.first_name) errors.push("first_name is required.");
	if (!reservation.last_name) errors.push("last_name is required.");
	if (!reservation.mobile_number) errors.push("mobile_number is required.");
	if (
		!reservation.reservation_date ||
		!/^\d{4}-\d{2}-\d{2}$/.test(reservation.reservation_date)
	)
		errors.push("reservation_date is not valid.");
	if (
		!reservation.reservation_time ||
		!/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(
			reservation.reservation_time.slice(0, 5),
		)
	)
		errors.push("reservation_time is not valid.");
	if (!reservation.people || typeof reservation.people != "number")
		errors.push("Reservation size people is required.");
	// check if date & time are valid
	const reqDate = reservation.reservation_date;
	const reqTime = reservation.reservation_time;
	if (reqDate && reqTime) {
		// Compare request's getTime to today's using numerical values
		const dateTime = Date.parse(reqDate + " " + reqTime);
		const now = new Date().getTime();
		if (dateTime < now)
			errors.push("reservation_date must be in the future.");
		// Compare request's date to restaurant's operating days
		const dateString = new Date(reqDate).toDateString();
		if (dateString.includes("Mon"))
			errors.push("Restaurant is closed on Tuesdays.");
		// Compare request's time to restaurant's operating hours
		const hours = Number(reqTime.slice(0, 2));
		const minutes = Number(reqTime.slice(3));
		const timeNum = hours * 60 + minutes;
		// 630 = 10:30AM 1290 = 9:30PM
		if (timeNum < 630 || timeNum > 1290) {
			errors.push("Restaurant is closed at the requested time.");
		}
	}
	// load result to locals or break with 400 & full message
	if (errors.length !== 0) {
		return next({ status: 400, message: errors.join(" ") });
	}
	// validation
	if (!reservation.status) reservation.status = "booked";
	res.locals.validReservation = reservation;
	return next();
}
/**
 * Middleware to check if status resource in request body is valid
 */
function isValidStatus(req, res, next) {
	// define valid statuses
	const validStatuses = ["booked", "seated", "cancelled", "finished"];
	// find status in req body
	const status = req.body.data.status;
	// load result to locals or break with 400 unknown status
	if (validStatuses.includes(status)) {
		res.locals.validStatus = status;
		return next();
	}
	return next({
		status: 400,
		message: "Status is unknown.",
	});
}
/**
 * Middleware to check if reservation resource in request body is
 * "booked" status
 */
function isStatusBooked(req, res, next) {
	// define valid statuses
	// cancelled is allowed so that cancelled reservations can be
	// directly added to system for record keeping
	const validStatuses = ["booked", "cancelled"];
	// find status in locals
	const status = res.locals.validReservation.status;
	// return next or break with 400 invalid status
	if (validStatuses.includes(status)) return next();
	return next({
		status: 400,
		message:
			"Invalid status for a new reservation (cannot be seated or finished).",
	});
}
/**
 * Middleware to check if reservation resource in locals is finished
 */
function reservationIsFinished(req, res, next) {
	// return next if reservation in locals is not finished or
	// break with 400 reservation finished
	if (res.locals.foundReservation.status !== "finished") return next();
	return next({
		status: 400,
		message: "Reservation already finished.",
	});
}
/**
 * Middleware to check if status resource in locals is finished
 */
function statusIsFinished(req, res, next) {
	// return next if status in locals is not finished or
	// break with 400 cannot be updated
	if (res.locals.status !== "finished") return next();
	return next({
		status: 400,
		message: "A finished reservation cannot be updated.",
	});
}

module.exports = {
	reservationExists,
	isValidReservation,
	isValidStatus,
	isStatusBooked,
	reservationIsFinished,
	statusIsFinished,
};
