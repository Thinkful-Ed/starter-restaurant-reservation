const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


function validateTableAvailability(req, res, next) {
	const { reservation_id } = res.locals.table;
	if (reservation_id) {
		return next({ status: 400, message: `Table is occupied` });
	}
	return next();
}

async function validateTableId(req, res, next) {
	const { table_id } = req.params;
	const table = await service.read(table_id);
	if (!table) {
		return next({
			status: 400,
			message: `Table ID: ${table_id} -- Not Found`,
		});
	} else {
		res.locals.table = table;
		return next();
	}
}

async function validateReservationId(req, res, next) {
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

function validateCapacityOfTableAndReservation(req, res, next) {
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

function validateNewTableData(req, res, next) {
	const { data } = req.body;
	const validFields = ["table_name", "capacity"];

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
		if (!data[field]) {
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
	const response = await service.update(updatedTable);
	return res.status(200).json({ data: response });
}

async function read(req, res, next) {
	return res.json({ data: res.locals.data });
}

module.exports = {
	list,
	create: [
		asyncErrorBoundary(validateNewTableData),
		asyncErrorBoundary(create),
	],
	update: [
		asyncErrorBoundary(validateTableId),
		validateTableAvailability,
		asyncErrorBoundary(validateReservationId),
		validateCapacityOfTableAndReservation,
		asyncErrorBoundary(updateTableReservation),
	],
};