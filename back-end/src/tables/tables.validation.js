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
	const table = { ...req.body };
	// validate types
	table.capacity = Number(table.capacity);
	// store errors
	const errors = [];
	// check for invalid form fields
	if (!table.table_name || table.table_name.length < 2)
		errors.push("Table name must be at least two characters.");
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
	if (foundTable.reservation_id === null) {
		return next();
	}
	next({ status: 400, message: "Table is already occupied." });
}
function isUnavailable(req, res, next) {
	const { foundTable } = res.locals;
	if (foundTable.reservation_id !== null) {
		return next();
	}
	next({ status: 400, message: "Table is not occupied." });
}
/**
 * Middleware to check if table resource in locals is large enough
 * for reservation request in request body
 */
async function isLargeEnough(req, res, next) {
	// find table in locals
	const { foundTable } = res.locals;
	if (req.body.data) {
		const id = req.body.data.reservation_id;
		if (id) {
			const reservation = await ReservationsService.read(id);
			if (!reservation[0]) {
				return next({
					status: 404,
					message: `table ${id} not found.`,
				});
			}
			if (reservation[0].people > foundTable.capacity) {
				return next({
					status: 400,
					message:
						"table capacity is not large enough for party size.",
				});
			}
		} else {
			return next({
				status: 400,
				message: "invalid reservation_id. ",
			});
		}
	} else {
		return next({
			status: 400,
			message: "no data provided.",
		});
	}
	next();
}

module.exports = {
	isValidTable,
	tableExists,
	isAvailable,
	isUnavailable,
	isLargeEnough,
};
