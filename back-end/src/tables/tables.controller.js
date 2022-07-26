const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
//----------HELPER FUNCTIONS-------

//verifies table availability by checking if the table has a reservation_id assigned
function verifyTableAvailable(req, res, next) {
	const { reservation_id } = res.locals.table;
	if (reservation_id) {
		return next({ status: 400, message: `Table is occupied` });
	}
	return next();
}

// performs a read operation for the given table ID and assigns the response to res.locals.table if valid
async function verifyTableId(req, res, next) {
	const { table_id } = req.params;
	const table = await service.read(table_id);
	if (!table) {
		return next({
			status: 404,
			message: `Table ID: ${table_id} -- Not Found`,
		});
	} else {
		res.locals.table = table;
		return next();
	}
}

//verifies that the body data contains a reservation ID
async function verifyReservationId(req, res, next) {
	const { data } = req.body;

	if (!data) {
		return next({ status: 400, message: `Data is missing.` });
	}
	if (!data.reservation_id) {
		return next({
			status: 400,
			message: `Data does not contain "reservation_id"`,
		});
	}

	const response = await service.readReservation(data.reservation_id);

	if (!response) {
		return next({
			status: 404,
			message: `Reservation ID: ${data.reservation_id} -- Not Found`,
		});
	}
	res.locals.reservation = response;
	return next();
}

// compares total table capacity against the reservations party size
function verifyCapacityOfTableAndReservation(req, res, next) {
	const { capacity } = res.locals.table;
	const { people } = res.locals.reservation;

	if (people > capacity) {
		return next({
			status: 400,
			message: `Party size of ${people} exceeds table capacity of ${capacity}`,
		});
	}

	return next();
}

// verifies that a reservation ID exists in a table prior to deletion
function verifyTableReservationStatus(req, res, next) {
	const { reservation_id } = res.locals.table;
	if (!reservation_id) {
		return next({ status: 400, message: "The table is not occupied" });
	}
	return next();
}

function verifyTableNotSeated(req, res, next) {
	const { status } = res.locals.reservation;
	if (status === "seated") {
		return next({ status: 400, message: "Reservation already seated" });
	}
	return next();
}

//validates all table body data fields
function validateNewTableData(req, res, next) {
	const { data } = req.body;
	const validFields = ["table_name", "capacity", "reservation_id"];

	if (!data) {
		return next({ status: 400, message: "Data is missing." });
	}

	//validate data does not contain extra key/values
	const currentFields = Object.keys(data);
	for (let field of currentFields) {
		if (!validFields.includes(field)) {
			return next({
				status: 400,
				message: `Invalid data field ${field}.`,
			});
		}
	}

	for (let field of validFields) {
		if (!data[field] && field !== "reservation_id") {
			return next({ status: 400, message: `${field} is missing.` });
		}
		if (field === "table_name") {
			const fieldData = data[field];
			if (fieldData.length < 2) {
				return next({
					status: 400,
					message: `table_name must be at least two characters in length.`,
				});
			}
		}
		if (field === "capacity") {
			const fieldData = data[field];
			if (typeof fieldData !== "number") {
				return next({
					status: 400,
					message: `capacity must be a number.`,
				});
			}
			if (fieldData < 1) {
				return next({
					status: 400,
					message: `capacity must be greater than 0.`,
				});
			}
		}
	}

	return next();
}
//----------CRUD FUNCTIONS---------
async function list(req, res, next) {
	const data = await service.list();
	res.json({ data });
}

async function create(req, res, next) {
	const { data } = req.body;
	const response = await service.create(data);
	res.status(201).json({ data: response });
}

async function updateTableReservation(req, res, next) {
	const updatedTable = { ...res.locals.table, ...req.body.data };
	const response = await service.update(updatedTable, { status: "seated" });

	return res.status(200).json({ data: response });
}

async function read(req, res, next) {
	return res.json({ data: res.locals.data });
}

//destroys reservation ID of the given table
async function destroyTableReservation(req, res, next) {
	const currentTable = res.locals.table;
	const { reservation_id } = currentTable;
	const updatedReservation_id = { reservation_id: null };
	const updatedTable = { ...currentTable, ...updatedReservation_id };
	const response = await service.destroy(
		updatedTable,
		{ status: "finished" },
		reservation_id
	);
	res.status(200).json({ data: response });
}

module.exports = {
	list,
	create: [
		asyncErrorBoundary(validateNewTableData),
		asyncErrorBoundary(create),
	],
	update: [
		asyncErrorBoundary(verifyTableId),
		verifyTableAvailable,
		asyncErrorBoundary(verifyReservationId),
		verifyTableNotSeated,
		verifyCapacityOfTableAndReservation,
		asyncErrorBoundary(updateTableReservation),
	],
	destroy: [
		asyncErrorBoundary(verifyTableId),
		verifyTableReservationStatus,
		asyncErrorBoundary(destroyTableReservation),
	],
};
