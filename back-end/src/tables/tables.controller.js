const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const bodyDataHas = require("../errors/bodyDataHas");

async function list(req, res){
    const data = await service.list();
    res.json({data});
}

async function create(req, res){
    const data = await service.create(req.body.data);
    res.status(201).json({data});
}

module.exports = {
    list: [list],
    create: [create]
}