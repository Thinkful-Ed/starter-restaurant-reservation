const service = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

//////MIDDLEWARE OPERATIONS//////
function validateBody(req, res, next) {
    if (!req.body.data.table_name || req.body.data.table_name === "") {
        return next({ status: 400, message: "'table_name' field cannot be empty"})
    }

    if (req.body.data.table_name.length < 2) {
        return next({ status: 400, message: "'table_name' field must be at least two characters"})
    }

    if (!req.body.data.capacity || req.body.data.capacity === "") {
        return next({ status: 400, message: "'capacity' field cannot be empty"})
    }

    if (typeof req.body.data.capacity !== "number") {
        return next({ status: 400, message: "'capacity' field must be a number"})
    }

    if (req.body.data.capacity < 1) {
        return next({ status: 400, message: "'capacity' field must be at least one"})
    }

    next()
}


//////CRUD OPERATIONS//////

async function list(req, res) {
    const response = await service.list()

    res.json({ data: response })
}

async function create(req, res) {
    req.body.data.status = "free"

    const response = await service.create(req.body.data)

    res.status(201).response({ data: response })
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [validateBody, asyncErrorBoundary(create)]
}