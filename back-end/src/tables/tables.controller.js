const service = require('./tables.service');
const reservationService = require('../reservations/reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const { table } = require('../db/connection');
const requiredFields = ['table_name', 'capacity'];
const seatsRequiredFields = ['reservation_id'];

//Middleware Functions
async function tableExists(req, res, next) {
	const { table_id } = req.params;
	const table = await service.read(table_id);
	
	if (table) {
		res.locals.table = table;
		return next();
	}
	return res.status(404).json({ error: `table ${table_id} not found` });
}

async function reservationExists(req, res, next) {
	const { reservation_id } = req.body.data;
	const reservation = await reservationService.read(reservation_id);
	if (reservation) {
		res.locals.reservation = reservation;
		return next();
	}
	return res
		.status(404)
		.json({ error: `reservation ${reservation_id} not found` });
}


function hasData(req, res, next) {
	const { data } = req.body;
	
	if (!data) {
		return res.status(400).json({ error: 'Data is missing' });
	}
	
	for (const field of requiredFields) {
		if (!data[field]) {
			return res.status(400).json({ error: `${field} is missing` });
		}
		
		if (typeof data[field] === 'string' && data[field].trim() === '') {
			return res.status(400).json({ error: `${field} cannot be empty` });
		}
	}

	next();
}

function seatsHasData(req, res, next) {
	const { data } = req.body;

	if (!data) {
		return res.status(400).json({ error: 'Data is missing' });
	}

	for (const field of seatsRequiredFields) {
		if (!data[field]) {
			return res.status(400).json({ error: `${field} is missing` });
		}

		if (typeof data[field] === 'string' && data[field].trim() === '') {
			return res.status(400).json({ error: `${field} cannot be empty` });
		}
	}

	next();
}

//return 400 id table_name is 1 character or less
function hasValidName(req, res, next) {
	const { table_name } = req.body.data;

	if (table_name.length < 2) {
		return res
			.status(400)
			.json({ error: `table_name must be at least 2 characters` });
	}

	next();
}

//return 400 if capacity is not a number
function hasValidCapacity(req, res, next) {
	const { capacity } = req.body.data;

	if (typeof capacity !== 'number') {
		return res.status(400).json({ error: `capacity must be a number` });
	}

	next();
}



function isNotSeated(req, res, next) {
	const { status } = res.locals.reservation;
	if (status !== 'seated') {
		return next();
	} else {
		return next(
			res.status(400).json({ error: 'reservation is already seated' })
		);
	}
}

function hasEnoughCapacity(req, res, next) {
	const { people } = res.locals.reservation;
	const { capacity } = res.locals.table;
	if (people <= capacity) {
		return next();
	} else {
		return next(
			res.status(400).json({ error: 'Table does not have sufficient capacity' })
		);
	}
}

function isOccupied(req, res, next) {
	const { reservation_id } = res.locals.table;
	if (reservation_id === null) {
		return next();
	} else {
		return next(res.status(400).json({ error: 'Table is currently occupied' }));
	}
}

function isNotOccupied(req, res, next) {
	const { reservation_id } = res.locals.table;
	if (reservation_id !== null) {
		return next();
	} else {
		return next(res.status(400).json({ error: 'Table is not occupied' }));
	}
}

//crudl///////////////////////////////////////////////////crudl//

async function listTables(req, res) {
	const data = await service.listAll();
	res.json({ data });
}

async function createTable(req, res) {
	const data = await service.create(req.body.data);
	res.status(201).json({ data });
}

async function readTable(req, res) {
	const { table_id } = req.params;
	const data = await service.read(table_id);
	res.status(200).json({ data });
}

async function seatReservation(req, res) {
	const { table_id } = req.params;
	const { reservation_id } = req.body.data;
	const data = await service.seat(table_id, reservation_id);
	const status = await reservationService.update( reservation_id, 'seated');
	res.status(200).json({ data: data, status });
}

async function unseatResevation(req, res) {
	const { table_id } = req.params;
	const data = await service.unseat(table_id);
	res.status(200).json({ data });
}

async function finishReservation(req, res) {
	const { table_id } = req.params;
	console.log(table_id);
	const { reservation_id } = res.locals.table;
	console.log(reservation_id);
	const data = await service.unseat(table_id);
	const status = await reservationService.update( reservation_id, 'finished');
	res.status(200).json({ data: data, status });







	
}

module.exports = {
	list: asyncErrorBoundary(listTables),
	create: [hasData, hasValidName, hasValidCapacity, asyncErrorBoundary(createTable)],
	read: [
		asyncErrorBoundary(tableExists),
		asyncErrorBoundary(reservationExists),
		asyncErrorBoundary(readTable),
	],
	seat: [
		seatsHasData,
		asyncErrorBoundary(reservationExists),
		isNotSeated,
		asyncErrorBoundary(tableExists),
		hasEnoughCapacity,
		isOccupied,
		asyncErrorBoundary(seatReservation),
	],
	unseat: [tableExists, isNotOccupied, asyncErrorBoundary(unseatResevation)],
	finish: [tableExists, isNotOccupied, asyncErrorBoundary(finishReservation)],

};	
