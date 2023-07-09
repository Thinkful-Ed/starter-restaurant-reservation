/** @format */

//import error components
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

//import service files
const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");

//Validation functions

//validate that table exists

async function tableExists(req, res, next) {
	const table = await service.read(req.params.table_id);

	if (table) {
		res.locals.table = table;
		return next();
	}
	next({
		status: 404,
		message: `Table ${req.params.table_id} cannot be found`,
	});
}

//validate that reservation exists

async function reservationExists(req, res, next) {
	const { reservation_id } = req.body.data;
	const reservation = await reservationsService.read(reservation_id);

	if (reservation) {
		res.locals.reservation = reservation;
		return next();
	}
	next({
		status: 404,
		message: `Reservation ${reservation_id}  cannot be found`,
	});
}

//validate that request body has data property

function hasData(req, res, next) {
	if (req.body.data) {
		return next();
	}
	next({ status: 400, message: "Body must have data property" });
}

//validate that request has reservation_id property

function hasReservationId(req, res, next) {
	const { data } = req.body;

	if (!data.reservation_id) {
		return next({
			status: 400,
			message: "Body must have reservation_id property",
		});
	}
	next();
}

//validate that body has required properties

const requiredProperties = ["table_name", "capacity"];
const hasRequiredProperties = hasProperties(requiredProperties);

//validate that table name is at least 2 characters long

function tableNameIsValid(req, res, next) {
	const tableName = req.body.data.table_name;

	if (tableName.length < 2) {
		return next({
			status: 400,
			message: "table_name must be at least 2 characters long",
		});
	}
	next();
}

//validate that table capacity is at least 1 person and is a number

function validCapacity(req, res, next) {
	const tableCapacity = req.body.data.capacity;

	if (!Number.isInteger(tableCapacity)) {
		return next({
			status: 400,
			message: "Table capacity must be a number",
		});
	}

	if (tableCapacity < 1) {
		return next({
			status: 400,
			message: "Table capacity must be at least 1",
		});
	}

	next();
}

//validate that table capacity is enough for the number of people

function tableCanFitAllPeople(req, res, next) {
	const tableCapacity = res.locals.table.capacity;
	const numberOfPeopleInReservation = res.locals.reservation.people;

	if (tableCapacity < numberOfPeopleInReservation) {
		return next({
			status: 400,
			message: `This table's capacity is ${tableCapacity} people. Please choose a bigger table.`,
		});
	}
	next();
}

//validate that table is occupied

function tableIsOccupied(req, res, next) {
	const table = res.locals.table;

	if (table.reservation_id) {
		return next({
			status: 400,
			message:
				"This table is already occupied. Please choose a different table.",
		});
	}
	next();
}

//validate that table is not occupied

function tableIsUnoccupied(req, res, next) {
	const table = res.locals.table;

	if (!table.reservation_id) {
		return next({
			status: 400,
			message: "This table is not occupied.",
		});
	}
	next();
}

//validate that reservation is not already seated

function isSeated(req, res, next) {
	const { status } = res.locals.reservation;

	if (status === "seated") {
		return next({
			status: 400,
			message: "This reservation is already seated",
		});
	}
	next();
}

//CRUDL functions

async function create(req, res) {
	const newTable = await service.create(req.body.data);
	res.status(201).json({
		data: newTable,
	});
}

function read(req, res) {
	const data = res.locals.table;
	res.json({ data });
}

//update table by assinging a reservation id to it and change reservation status to seated

async function update(req, res, next) {
	const updatedTable = {
		...res.locals.table,
		table_id: res.locals.table.table_id,
		reservation_id: res.locals.reservation.reservation_id,
	};

	const updatedReservation = {
		...res.locals.reservation,
		reservation_id: res.locals.reservation.reservation_id,
		status: "seated",
	};

	await reservationsService.update(updatedReservation);

	const data = await service.update(updatedTable);
	res.json({ data });
}

//change table's reservation_id to null and reservation's status to finished

async function finish(req, res, next) {
	const table = await service.read(req.params.table_id);

	const reservation = await reservationsService.read(table.reservation_id);

	const updatedTable = {
		...table,
		reservation_id: null,
	};

	const updatedReservation = {
		...reservation,
		status: "finished",
	};

	await reservationsService.update(updatedReservation);
	const data = await service.update(updatedTable);

	res.json({ data });
}

async function list(req, res) {
	const data = await service.list();

	res.json({
		data,
	});
}

module.exports = {
	create: [
		hasData,
		hasRequiredProperties,
		tableNameIsValid,
		validCapacity,
		asyncErrorBoundary(create),
	],
	read: [asyncErrorBoundary(tableExists), read],
	update: [
		hasData,
		hasReservationId,
		asyncErrorBoundary(tableExists),
		asyncErrorBoundary(reservationExists),
		isSeated,
		tableCanFitAllPeople,
		tableIsOccupied,
		asyncErrorBoundary(update),
	],
	delete: [
		asyncErrorBoundary(tableExists),
		tableIsUnoccupied,
		asyncErrorBoundary(finish),
	],
	list: asyncErrorBoundary(list),
};
