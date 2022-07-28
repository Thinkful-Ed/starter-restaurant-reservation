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
    // console.log("reqbodydata", req.body.data)
    // console.log("capacity:, ", capacity)
    // console.log("parseInt capacity:, ", parseInt(capacity))
    // console.log("isNaNparseInt capacity:, ", isNaN(parseInt(capacity)))

    if (table_name.length < 2){
        return next({
            status: 400,
            message: "table_name must be at least 2 characters."
        })
    }
    if(typeof capacity !== "number"){
        return next({
            status: 400,
            message: "Please enter a valid number for the capacity"
        })
    }
    if (Number(capacity) < 1){
        return next({
            status: 400,
            message: "Must be at least 1 person."
        })
    }
    next()
}

async function reservationIdExists(req, res, next){
    console.log("asdf1")
    const reservation = await service.readReservationId(req.body.data.reservation_id)
    console.log("reservertioniddidid: ", req.body.data.reservation_id)
    console.log("reserzervation:", reservation)
    if(reservation){
        
        return next()
    }
    next({
        status: 404,
        message: `${req.body.data.reservation_id}: reservation_id not found!`
    })

    // service.read(req.params.table_id)
    // .then((table)=>{
    //     if(!table.reservation_id){
    //         next({ status: 404, message: "reservation_id not found!"})
    //     }
    //     return next()
    // })
}

async function validTableCapacity(req, res, next){
    const getTableInfo = await service.read(req.params.table_id)
    const getReservationInfo = await service.readReservationId(req.body.data.reservation_id)
    if (getTableInfo.capacity < getReservationInfo.people){
        return next({
            status: 400,
            message: `Too many people, capacity is ${getTableInfo.capacity}`
        })
    }
    if(getTableInfo.reservation_id){
        return next({
            status: 400,
            message: `Table is already occupied`
        })
    }
    next()
}

function tableExists(req, res, next){
    service.read(req.params.table_id)
    .then((table)=>{
        if(table){
            res.locals.table = table
            return next()
        }
        next({ status: 404, message: `Table cannot be found!`})
    })
    .catch(next)
}

function bodyHasData(propertyName){
    return function (req, res, next){
      const { data = {} } = req.body
      data[propertyName] && propertyName.length > 0 ? next() : next({ status: 400, message: `Table must have: ${propertyName}.`})
    }
  }



function read(req, res, next){
    res.json({ data: res.locals.table })
}

async function update(req, res){
    // console.log("body data: ", req.body.data)
    const {reservation_id} = req.body.data
    const {table_id} = req.params
    await service.update(table_id, reservation_id)
    res.status(200).json({ data: reservation_id})
}

//destroy something
function destroy(req, res, next){
    console.log("helloback")  // this is working
    // service.destroy(req.params.table_id)
    // .then(()=> res.sendStatus(200))
    // // const deletedTable = await service.delete(table_id)
    // //res.status(200).json({ data: deletedtable})
    // .catch(next)
}

module.exports = {
    list,
    create:[
        asyncErrorBoundary(bodyHasData("table_name")),
        asyncErrorBoundary(bodyHasData("capacity")),
        validateData,
        asyncErrorBoundary(create)
    ],
    read: [
        tableExists,
        asyncErrorBoundary(read)
    ],
    update:[
        bodyHasData("reservation_id"),
        reservationIdExists,
        validTableCapacity,
        tableExists,
        asyncErrorBoundary(update)
        
    ],
    delete:[
        reservationIdExists,
        asyncErrorBoundary(destroy)
    ]
    
}