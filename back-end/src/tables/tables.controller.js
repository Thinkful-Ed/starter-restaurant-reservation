const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../utils/hasProperties");
const hasRequiredProperties = hasProperties("table_name", "capacity");
const validTable = require("../utils/validateTable");
const validateTable = validTable();
const tableHasProperties = hasProperties("reservation_id")
const validateTableUpdate = require("../utils/validateTableUpdate");
const validateTableInfo = validateTableUpdate();
const {update: updateReservation, read: readReservation } = require("../reservations/reservations.service");



async function list(_req, res, _next) {
    const tablesList = await service.list();
    res.json({ data: tablesList});
}


async function tableExists(req, res, next) {
    const table = await service.read(req.params.table_id);

    if(table) {
        res.locals.foundTable = table;
        return next();
    };

    next({ status:404, message: `Table with id: ${req.params.table_id} not found.`});
}


async function read(req, res, _next) {
    const table = await service.read(req.params.table_id);
    res.json({ data: table });
}


async function create(req, res, _next) {
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
}

async function update(_req, res, next) {
    const { foundTable, thisReservation } = res.locals;

    const updatedTable = {
        reservation_id: thisReservation.reservation_id,
        table_id: foundTable.table_id,
        status: 'occupied',
    };

    const updated = await service.update(updatedTable);

    if(thisReservation.status == 'seated') {
        next({ status: 400, message: `Reservation is ${thisReservation.status}.`});
    };

    await updateReservation({
        ...thisReservation,
        status: 'seated',
    });

    res.status(200).json({ data: updated });
}

async function destroy(req, res, next) {
    const { foundTable } = res.locals;

    foundTable.reservation_id === null ? next({ status: 400, message: 'Table is not occupied.'}) : await service.delete(foundTable.table_id);

    const foundReservation = await readReservation(foundTable.reservation_id);

    const updatedRes = await updateReservation({
        ...foundReservation,
        status: 'finished',
    });
    //TODO delete unused code
    // await service.list();
    res.status(200).json({data: updatedRes});
}



module.exports = {
    list: [asyncErrorBoundary(list)],
    create: [
        hasRequiredProperties,
        validateTable,
        asyncErrorBoundary(create),
    ],
    read: [
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(read),
    ],
    update: [
        asyncErrorBoundary(tableExists),
        tableHasProperties,
        asyncErrorBoundary(validateTableInfo),
        asyncErrorBoundary(update),
    ],
    delete: [
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(destroy),
    ]
}