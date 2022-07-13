/**
 * List handler for reservation resources
 */
const service = require("./reservations.service")

async function list(req, res) {
  const data = await service.list()
  res.json({
    data: data
  });
}

async function create(req,res,next){
  const {data} = req.body
  const responseData = await service.create(data)
  res.send({data:responseData})
}

module.exports = {
  list,
  create,
};
