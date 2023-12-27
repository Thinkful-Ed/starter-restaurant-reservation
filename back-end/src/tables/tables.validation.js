const service = require("./tables.service");
const ReservationsService = require("../reservations/reservations.service");

/**
 * Middleware to check if table resource exists on database
 */
async function tableExists(req, res, next) {
	// find ID in params
	const id = req.params.table_id;
	// call API
	const table = await service.read(id);
	// load result to locals or break with 404 not found
	if (table) {
		res.locals.foundTable = table;
		return next();
	}
	next({
		status: 404,
		message: `Table ${id} cannot be found.`,
	});
}
/**
 * Middleware to check if table resource in request body is valid
 */
function isValidTable(req, res, next) {
	// find table in req body
	const table = { ...req.body.data };
	// store errors
	const errors = [];
	// check for invalid form fields
	if (!table.table_name || table.table_name.length < 2)
		errors.push("table_name must be at least two characters.");
	if (
		!table.capacity ||
		table.capacity < 1 ||
		typeof table.capacity != "number"
	)
		errors.push("Table capacity must be at least one.");
	// load result to locals or break with 404 & full message
	if (errors.length !== 0) {
		return next({ status: 400, message: errors.join(" ") });
	}
	res.locals.validTable = table;
	return next();
}
/**
 * Middleware to check if table has assignment
 */
function isAvailable(req, res, next) {
	const { foundTable } = res.locals;
	if (!foundTable.reservation_id) {
		return next();
	}
	return next({ status: 400, message: "Table is already occupied." });
}
function isUnavailable(req, res, next) {
	const { foundTable } = res.locals;
	if (foundTable.reservation_id !== null) {
		return next();
	}
	return next({ status: 400, message: "Table is not occupied." });
}
/**
 * Middleware to check if table resource in locals is large enough
 * for reservation request in request body
 */
async function isLargeEnough(req, res, next) {
	// find table in locals
	const { foundTable } = res.locals;
	// find reservation ID in req body
	const { data } = req.body;
	if (data) {
		const { reservation_id } = data;
		if (reservation_id) {
			const reservation = await ReservationsService.read(reservation_id);
			if (!reservation) {
				return next({
					status: 404,
					message: `Table ${reservation_id} not found.`,
				});
			}
			if (reservation.people > foundTable.capacity) {
				return next({
					status: 400,
					message:
						"Table capacity is not large enough for party size.",
				});
			}
		} else {
			return next({
				status: 400,
				message: "Invalid reservation_id.",
			});
		}
	} else {
		return next({
			status: 400,
			message: "No data found.",
		});
	}
	return next();
}

module.exports = {
	isValidTable,
	tableExists,
	isAvailable,
	isUnavailable,
	isLargeEnough,
};
