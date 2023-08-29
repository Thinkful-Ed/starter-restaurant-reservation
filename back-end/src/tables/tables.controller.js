const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const response = await service.list();
    res.status(200).json({ data: response })
}

module.exports = {
    list: asyncErrorBoundary(list)
}