const reservationService = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const hasProperties = require("../errors/hasProperties")
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  // console.log("req", req)
  const { date } = req.query;
  let data;

  if(date){

    data= await reservationService.listByQuery(date);
  }
  else {
    data= await reservationService.list();
  }

  res.json({data})
  // console.log(data)
}

async function hasOnlyValidProperties(req, res, next){
  console.log("hello valid properties")
  const VALID_PROPERTIES = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people"
  ]
  console.log("valid properties", VALID_PROPERTIES)
  const {data = {}} = req.body;
  const invalidFields = Object.keys(data).filter((field) => !VALID_PROPERTIES.includes(field));
  if(invalidFields.length){
    return next({
      status:400,
      message: `Invalid field(s): ${invalidFields.join(", ")},`
    });
  }
  next();
}

const hasRequiredProperties = hasProperties("first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people")

async function create(req, res, next){
  console.log("create")
  await reservationService.create(req.body.data)
  .then((data) => {
    console.log("data in reservations create", data)
    return res.status(201).json({data})
  })
  .catch(next)
}


module.exports = {
  list: asyncErrorBoundary(list),
  create: [asyncErrorBoundary(hasRequiredProperties), asyncErrorBoundary(hasOnlyValidProperties), asyncErrorBoundary(create)]
};
