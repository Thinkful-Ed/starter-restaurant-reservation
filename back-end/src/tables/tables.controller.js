const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Validation middleware

//Executive functions

//Executive function to create a new Table
async function create(req, res) {
  const newTable = await service.create(req.body.data);

  res.status(201).json({ data: newTable });
}

//Executive function to list Tables
async function list(req, res) {
  const data = await service.list();
  console.log("Table Data:", data);
  res.json({ data });
}
module.exports = {
  list: asyncErrorBoundary(list),
  create: asyncErrorBoundary(create),
};
