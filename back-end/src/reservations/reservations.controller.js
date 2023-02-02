const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../utils/hasProperties");
const hasRequiredProperties = hasProperties("first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people");
const validateTypes = require("../utils/validateReservationInput");
const validateInputTypes = validateTypes();


//DON'T FORGET TO REMOVE/EDIT ANY UNUSED next VARS
//TODO remove unused code
//TODO split larger functions into helper functions
//TODO underscore before unused req, res, next vars

async function searchPhoneNum(req, res, next) {
  const { mobile_number } = req.query;

  if(mobile_number){
    const listing = await service.search(mobile_number);
    res.status(200).json({ data: listing });
  } else {
    next();
  };
};

function getTodaysDate() {
  const TodayDate = new Date(Date.now());
  const year = TodayDate.getFullYear();
  const month = TodayDate.getMonth() + 1;
  const day = TodayDate.getDate();
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

async function list(req, res, _next) {
  const { date } = req.query;

  if(!date) {
    date = getTodaysDate();
  };

  const listing = await service.list(date);

  let filtered = listing.filter((eachRes) => 
    eachRes.status !== 'finished'
  );

  res.json({ data: filtered});
};

async function create(req, res, next) {
  const reqStatus = req.body.data.status;

  if(reqStatus === 'seated' || reqStatus === 'finished') {
    next({ status: 400, message: `Status is ${reqStatus}`});
  };

  const data = await service.create(req.body.data);

  res.status(201).json({ data });
};

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;

  const foundReservation = await service.read(reservation_id);

  if(!foundReservation) {
    next({ status:404, message:`Reservation with id ${reservation_id} not found`});
  };

  res.locals.foundReservation = foundReservation;

  next();
};

async function read(req, res, _next) {
  const { reservation_id } = req.params;
  const foundReservation = await service.read(reservation_id);
  res.json({ data: foundReservation });
};

function validateStatusChange(req, res, next) {
    const resStatus = res.locals.foundReservation.status;
    const updateStatus = req.body.data.status;
  
    if(resStatus === 'finished'){
      next({ status: 400, message:`${res.locals.foundReservation.reservation_id} has status: ${resStatus}`});
    };
    if(updateStatus === 'unknown') {
      next({ status: 400, message: `Cannot enter a status of ${updateStatus}`});
    };
    next();
};

async function updateStatus(req, res, _next) {
  const updatedRes = {
    ...res.locals.foundReservation,
    status: req.body.data.status,
  };

  const updated = await service.update(updatedRes);

  res.status(200).json({ data: updated });
};


function validateReservationForUpdate(req, _res, next) {
  const {first_name, last_name, people, reservation_date, reservation_time, mobile_number } = req.body.data;
  let errorField = "";

    switch (true) {
      case (!first_name || first_name.length < 1):
        errorField = 'first_name';
        break;
      case (!last_name || last_name.length < 1):
        errorField = 'last_name';
        break;
      case (!mobile_number || mobile_number.length < 1):
        errorField = 'mobile_number';
        break;
      case (!reservation_time):
        errorField = 'reservation_time';
        break;
      case(!reservation_date):
        errorField = 'reservation_date';
        break;
      case(people === 0):
        errorField = 'people';
        break;
      default:
        break;  
    };

  if(errorField) {
    next({status:400, message:`${errorField} is invalid.`})
  };

  next();
};

async function update(req, res, _next) {
  const { foundReservation } = res.locals;
  const updatedReservation = req.body.data;

  const updatedRes = {
    ...req.body.data,
    reservation_id: foundReservation.reservation_id,
  };

  const updated = await service.update(updatedRes);

  res.status(200).json({ data: updated });
};

module.exports = {
  list: [asyncErrorBoundary(searchPhoneNum), asyncErrorBoundary(list)],
  create: [hasRequiredProperties, validateInputTypes, asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  updateStatus: [asyncErrorBoundary(reservationExists), validateStatusChange, asyncErrorBoundary(updateStatus)],
  update: [asyncErrorBoundary(reservationExists), validateReservationForUpdate, validateInputTypes, asyncErrorBoundary(update)],
};
