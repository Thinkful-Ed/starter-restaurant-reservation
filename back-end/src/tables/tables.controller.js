
const service = require("./tables.service")

//----------HELPER FUNCTIONS-------

//----------CRUD FUNCTIONS---------
async function list(req,res,next){
    const data = await service.list()
    res.json({data})
}


module.exports = {
    list,
}