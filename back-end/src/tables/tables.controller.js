const {json} = require("express")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const service = require("./tables.service")

async function list(req, res){
    const data = await service.list()
    res.json({data})
}

async function create(req, res, next){
    const {data: {table_name, capacity} = {}} = req.body

    const newTable = {
        table_name,
        capacity
    }

    console.log("wow you made a table!")
    const response = await service.create(newTable)
    console.log("response: ", response)
    res.status(201).json({ data: newTable })
}

function validateData(req, res, next){
    const {table_name, capacity} = req.body.data

    if (table_name.length < 2){
        next({
            status: 400,
            message: "Please enter at least 2 characters meow."
        })
    }
    if(isNaN(parseInt(capacity))){
        next({
            status: 400,
            message: "Please enter a valid number"
        })
    }
    if (Number(capacity) < 1){
        next({
            status: 400,
            message: "Must be at least 1 person."
        })
    }
    next()
}

module.exports = {
    list,
    create:[
        validateData,
        asyncErrorBoundary(create)
        
    ]
}