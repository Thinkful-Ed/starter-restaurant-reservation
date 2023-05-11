const tablesService = require('./tables.service');

async function list(req, res){
    res.json({ data: await tablesService.list() })
}

module.exports = {
    list,
}