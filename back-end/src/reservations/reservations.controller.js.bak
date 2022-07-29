/**
 * List handler for reservation resources
 */
const service = require("./reservations.service.js");
const knex = require("../db/connection");
async function list(req, res) {
  //get all reservations from the postgresql database
  //send the list of reservations to the client
  const date = req.query.date;
  const mobile_number = req.query.mobile_number;
  const output = await service.getAllReservations(date);
  res.json({
    data:output
  });

}

async function createReservation(newReservation, abortSignal) {
  //use knex to create a new reservation on the postgresql database
  //return the new reservation
  const response = await knex("reservations")
    .insert(newReservation)
    .returning("*")
    .catch((err) => {
      console.log(err);
      if (err.code === "22007"){
        return { error: "reservation_date is invalid" };
      }else{
        return { error: "internal_application_error: create", message: err.code};
      }
    }
    );
  return response;

}

async function newRes(req, res) {
  console.log("received")
  //send a form to create a new reservation
  //fields: firstName, lastName, phone, date, time, partySize
  //on submit, update the database with the new reservation
  if(!req.body.data) {
    return res.status(400).json({
      error: "No data sent"
    });
  }
  if(!req.body.data.people){
    return res.status(400).json({
      error: "people is required"
    });
  }
  if(!req.body.data.reservation_date){
    return res.status(400).json({
      error: "reservation_date is required"
    });
  }
  let { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = req.body.data;
  
  //console.log(first_name, last_name, mobile_number, reservation_date, reservation_time, people);
  const abortController = new AbortController();
  const abortSignal = abortController.signal;
  const newReservation = {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  };
  console.log("validating")
  let check = await _formValidator(newReservation);
  if(check.isValid){
    //remove the seconds from the reservation_time
    reservation_time = reservation_time.split(":");
    reservation_time = [reservation_time[0], reservation_time[1]].join(":");
    const response = await createReservation(newReservation, abortSignal);
    if(response.error){
      return res.status(400).json({
        error: response.error
      });
    }
    res.status(201);
    res.json({ data: response[0] });
    //redirect to the new reservation
  }
  else{
    console.log(check.error);
    res.status(400);
    res.json({ domain: "internal_application_error: newRes",error: check.error });
  }
  

}

async function _formValidator(form){
  //internal function to validate the form data
  //returns true if the form is valid
  //returns false if the form is invalid
  const { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = form;
  const formMap = ["first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"];
  for(let i=0; i<formMap.length; i++){
    if(!form[formMap[i]]){
      return {isValid: false, error: `${formMap[i]} is required`};
    }
  }
  // if(!mobile_number.match(/^\d{10}$/)){
  //   return false;
  // }
  // if(!reservation_date.match(/^\d{4}-\d{2}-\d{2}$/)){
  //   return false;
  // }
  // if(!reservation_time.match(/^\d{2}:\d{2}$/)){
  //   return false;
  // }
  //check that the date is in the future and not on a tuesday
  let dateSplit = reservation_date.split("-");
  let currentDate = new Date();
  let currentDateSplit = currentDate.toISOString().split("-");
  if(dateSplit[0] < currentDateSplit[0] || (dateSplit[0] == currentDateSplit[0] && dateSplit[1] < currentDateSplit[1]) || (dateSplit[0] == currentDateSplit[0] && dateSplit[1] == currentDateSplit[1] && dateSplit[2] < currentDateSplit[2])){
    return {isValid: false, error: "Date must be in the future"};
  }
  let day = new Date(reservation_date).getDay();
  if(day == 1){
    return {isValid: false, error: "The restaurant is closed on Tuesday"};
  }
  //check that reservation time is a valid time and is not empty
  const reservationTime = new Date(reservation_time);
  const reservationTimeHours = reservationTime.getHours();
  const reservationTimeMinutes = reservationTime.getMinutes();
  if(reservationTimeHours < 0 || reservationTimeHours > 23){
    return {isValid: false, error: "Invalid reservation_time"};
  }
  else if(reservationTimeMinutes < 0 || reservationTimeMinutes > 59){
    return {isValid: false, error: "Invalid reservation_time"};
  }
  else if(reservationTimeHours === 0 && reservationTimeMinutes === 0){
    return {isValid: false, error: "Invalid reservation_time"};
  }
  
  //check that reservation_time is a time
  if(!reservation_time.match(/^\d{2}:\d{2}$/)){
    return {isValid: false, error: "Invalid reservation_time"};
  }
  //check that people is not a string
  if(typeof people !== "number"){
    return {isValid: false, error: "people must be a number"};
  }

  //check that the given time is not already taken
  const reservations = await service.getAllReservations(reservation_date);
  for(let i=0; i<reservations.length; i++){
    console.log(reservations[i].reservation_time);
    let checkTimeSplit = reservations[i].reservation_time.split(":");
    let reservationTimeString = reservationTimeHours[0] + ":" + reservationTimeMinutes[1];
    let checkTimeString = checkTimeSplit[0] + ":" + checkTimeSplit[1];
    if(checkTimeString === reservationTimeString){
      return {isValid: false, error: "reservation_time is already taken"};
    }
  }



  return {isValid:true};

}

async function getRes(req, res) {
  //get reservation for a given id
  //return the reservation with 200 if it exists
  //return 404 if it does not exist
  const id = req.params.reservation_id;
  const reservation = await service.getReservation(id);
  if(reservation){
    res.status(200);
    let response = { data: reservation }
    console.log(response)
    res.json(response);
  }
  else{
    res.status(404);
    res.json({ error: "Reservation not found" });
  }
}

async function update(req, res) {
  //update a reservation
  //return the reservation with 200 if it exists
  //return 404 if it does not exist
  const id = req.params.reservation_id
  console.log(req.body.data);
  const reservation = await service.getReservation(id);
  if(reservation){
    let { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = req.body.data;
    const abortController = new AbortController();
    const abortSignal = abortController.signal;
    const newReservation = {
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
    };
    let check = _formValidator(newReservation);
    if(check.isValid){
      //remove the seconds from the reservation_time
      reservation_time = reservation_time.split(":");
      reservation_time = [reservation_time[0], reservation_time[1]].join(":");
      const response = await updateReservation(id, newReservation, abortSignal);
      if(response.error){
        return res.status(400).json({
          error: response.error
        });
      }
      res.status(200);
      res.json({ data: newReservation });
    }
    else{
      console.log(check.error);
      res.status(400);
      res.json({ domain: "internal_application_error: update",error: check.error });
    }
  }
  else{
    res.status(404);
    res.json({ error: "Reservation not found" });
  }
}


module.exports = {
  list,
  newRes,
  getRes,
  update,
};
