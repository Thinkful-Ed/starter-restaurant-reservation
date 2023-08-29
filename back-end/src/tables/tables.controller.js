const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const response = await service.list();
    res.status(200).json({ data: response })
}

//create table
async function create(req, res) {
    if (req.body.data.reservation_id) {
        req.body.data.status = "occupied";
        await service.updateReservation(req.body.data.reservation_id, "seated");
    } else {
        req.body.data.status = "free";
    }
    const response = await service.create(req.body.data);

    res.status(201).json({ data: response[0] });
}

async function validateData(req, res, next) {
    if (!req.body.data) {
        return next({status: 400, message: "Body must include data object" });
    }

    next();
}

async function validateBody(req, res, next) {
    if (!req.body.data.table_name || req.body.data.table_name === "") {
        return next({ status: 400, message: "table_name field can't be empty"});
    }

    if (req.body.data.table_name.length < 2) {
        return next({
            status: 400,
            message: "table_name field must be at least 2 characters"
        });
    }

    if (!req.body.data.capacity || req.body.data.capacity === "") {
        return next({
            status: 400,
            message: "capacity field cannot be empty"
        });
    }

    if (req.body.data.capacity < 1) {
        return next({
            status: 400,
            message: "capacity must be at least 1"
        });
    }

    if (typeof req.body.data.capacity !== "number") {
        return next({
            status: 400,
            message: "capacity must be a number"
        })
    }

    next();
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [
        asyncErrorBoundary(validateData),
        asyncErrorBoundary(validateBody),
        asyncErrorBoundary(create)
    ]
}