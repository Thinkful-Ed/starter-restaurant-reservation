const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

async function list(req, res) {
    res.json({
        data: await service.list(),
    })
}

async function create(req, res) {
    const data = await service.create(req.body.data);
    res.status(201).json({data});
}

async function seat(req, res) {
    console.log(req.params);
    console.log(req.body.data);
    // let reservation = req.body.data;
    let {table} = req.params;
    console.log(table);
}

async function tableExists(req, res, next) {
    const {table_id} = req.params;
    const table = await service.read(table_id);
    console.log(table)
    next();
}

function validateSeating(req, res, next) {
    let reservation = req.body.data;
    let {table} = req.params;


}

function validateTable(req, res, next) {
    let errors = [];
    const { data } = req.body;
    if (!data) return next({status:400, message: "Data is missing"});

    const requiredFields = [
        "table_name",
        "capacity",
    ]

    requiredFields.forEach(field => {
        if (!Object.keys(data).includes(field)) {
            errors.push(`Table must include a ${field}`);
        }
    })

    if (data.table_name && data.table_name.length < 2) errors.push("table_name must be at least 2 characters long");

    if (!Number.isInteger(data.capacity) || data.capacity < 1) errors.push(`capacity must be a number of at least 1`);

    if (errors.length) {
        next({
            status: 400,
            message: errors.join(", "),
        })
    }

    next();
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [validateTable, asyncErrorBoundary(create)],
    seat: [tableExists, validateSeating, asyncErrorBoundary(seat)],
}