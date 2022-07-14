/**
 * List handler for reservation resources
 */
async function list(req, res) {
  res.json({
    data: [],
  });
}

//get the service

async function create(req, res){
  
  console.log("hello there")
  // res.json(req.body.data)
  //validate the data

  //pass data to service here
  //const data = await service.create(req.body.data)
  //return res.status(201).json({ data })


  //await service
//  .create(req.body.date)
//  .then((data )=> res.status(201).json({ data }))
//  .catch(next)
  // res.send({ data: "hello from the server"})
  
}

module.exports = {
  list,
  create
};
