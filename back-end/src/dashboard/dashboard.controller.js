const service = require("./dashboard.service")

async function list(req, res) {
    const list = await service.list()
    res.json({data: list})
}

module.exports = {
    list
}