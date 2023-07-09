/** @format */

const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

////////////////
// MIDDLEWARE //
////////////////

async function tableExists(request, response, next) {
	const { table_id } = request.params;

	let table = await service.read(table_id);

	const error = { status: 404, message: `Table ${table_id} cannot be found.` };

	if (table) {
		response.locals.table = table;
		return next();
	}

	next(error);
}

async function validateNewTable(request, response, next) {
	if (!request.body.data)
		return next({ status: 400, message: "Data Missing!" });
	const { table_name, capacity, reservation_id } = request.body.data;
	if (!table_name || !capacity)
		return next({
			status: 400,
			message: "Please complete the following: table_name, capacity.",
		});

	if (table_name.length <= 1)
		return next({
			status: 400,
			message: "table_name must be at least two characters",
		});

	response.locals.table = {
		table_name,
		capacity,
		reservation_id,
	};
	next();
}

////////////////////
// END MIDDLEWARE //
////////////////////

// Create
async function create(_, response) {
	const data = await service.create(response.locals.table);
	response.status(201).json({
		data: data[0],
	});
}

// Read
async function read(_, response) {
	response.json({
		data: response.locals.table,
	});
}

// List
async function list(_, response) {
	const tables = await service.list();

	response.json({ data: tables });
}

module.exports = {
	create: [asyncErrorBoundary(validateNewTable), asyncErrorBoundary(create)],
	read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
	list: [asyncErrorBoundary(list)],
	tableExists,
};
