const service = require("./tables.service");
const asyncErrorBoundry = require("../errors/asyncErrorBoundary");


async function create(req, res){
    req.log.debug({__filename, methodName:"create"});
    const newTable = req.body.data;
    const data = await service.create(newTable);
    req.log.trace({__filename, methodName:"create", data,});
    res.status(201).json({ data, });
}

async function update(req, res){
    const { reservation_id } = req.body.data;
    const table_id  = Number(req.params.table_id);
    req.log.debug({fileName: "tables.controller.js", methodName: "update",reservation_id,table_id,});
    const data = await service.update(table_id, reservation_id);
    res.json({ data, });
}

async function list(req, res){
    const data = await service.list();
    res.json({ data, });
}

module.exports ={
    create: [asyncErrorBoundry(create)],
    update: [asyncErrorBoundry(update)],
    list: [asyncErrorBoundry(list)],
}