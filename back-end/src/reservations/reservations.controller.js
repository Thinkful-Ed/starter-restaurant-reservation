/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { response } = require("express");
const hasProperties = require("../db/utils/hasProperties");
const hasRequiredProperties = hasProperties("first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people");
const validateTypes = require("../db/utils/validateTypes");
const validateInputTypes = validateTypes();


//DON'T FORGET TO REMOVE/EDIT ANY UNUSED next VARS


async function list(req, res, _next) {
  let { date }  = req.query;
  const listing = await service.list(date)
  res.json({ data: listing})
}



async function create(req, res, next) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}




module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasRequiredProperties, validateInputTypes, asyncErrorBoundary(create)],

};
