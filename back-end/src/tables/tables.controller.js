const services = require("./tables.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasOnlyValidProperties = require("../errors/hasOnlyValidProperties");
const P = require("pino");


const VALID_PROPERTIES = ["table_name", "capacity"];

const hasRequiredProperties = hasProperties(VALID_PROPERTIES);

const isNonzeroNumber = (req, res, next) => {
    const { data: { capacity } } = req.body;
    if (typeof(capacity) !== "number") {
        next({ status: 400, message: "capacity must be a nonzero number" });
    } else if (capacity === 0) {
        next({ status: 400, message: "capacity must not be zero" });
    }
    next();
}

const nameProperLength = (req, res, next) => {
    const { data: { table_name } } = req.body;
    if (table_name.length < 2) {
        next({ status: 400, message: "table_name must be at least two characters" })
    }
    next();
}

async function create(req, res, next) {
    const data = await services.create(req.body.data)
    res.status(201).json({ data });
}

module.exports = {
    create: [hasOnlyValidProperties(VALID_PROPERTIES), hasRequiredProperties, nameProperLength, isNonzeroNumber, asyncErrorBoundary(create)],
}
