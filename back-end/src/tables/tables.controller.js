const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("table_name", "capacity");

function isValid(req, res, next) {
  const tableName = req.params.data.table_name;
  console.log(tableName.split(" "));
  const capacity = req.params.data.capacity;

  if (tableName.split(" ").length <= 1) {
    next({
      status: 400,
      message: `Invalid or missing table name.`,
    });
  }

  if (typeof capacity !== "number" || capacity === 0) {
    next({
      status: 400,
      message: `Invalid capacity entry. Must be at minimum 1 person.`,
    });
  }
  next();
}

async function reservationExists(req, res, next) {
	const { reservation_id } = req.body.data;
	const reservation = await reservationsService.read(reservation_id);

	if (reservation) {
		res.locals.reservation = reservation;
		console.log(reservation);
		return next();
	}
	next({
		status: 404,
		message: `Reservation_id does not exist`,
	});
}

async function tableExists(req, res, next) {
	const { table_id } = req.params;
	const table = await service.read(table_id);
	
	if (table) {
		res.locals.table = table;
		console.log(table);
		next();
	} else {
		next({ 
      status: 404, 
      message: `Table_id is already in use` });
	}
}

async function list(req, res, next) {
  const data = await service.list();
  res.json({ data });
}

async function create(req, res, next) {
  const data = await service.create(table);
  res.status(201).json({ data: data });
}

async function read(req, res) {
	const data = res.locals.reservation;
	res.status(200).json({
		data,
	});
}

async function update(req, res, next) {
  const table = res.locals.table;
  const updatedTable = {
    ...req.body.data,
    table_id: table.table_id,
  };
  const data = await service.update(updatedTable);
  return res.json({ data });
};

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [hasRequiredProperties, isValid, asyncErrorBoundary(create)],
  read: [tableExists, asyncErrorBoundary(read)],
  update: [tableExists, hasRequiredProperties, isValid, asyncErrorBoundary(update)]
};
