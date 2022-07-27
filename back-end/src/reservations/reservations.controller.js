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
  console.log(req.body);
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
  let check = _formValidator(newReservation);
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
    res.json({ data: newReservation });
    //redirect to the new reservation
  }
  else{
    console.log(check.error);
    res.status(400);
    res.json({ domain: "internal_application_error",error: check.error });
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
    let reservationTimeSplit = reservations[i].reservation_time.split(":");
    let reservationTimeHours = reservationTimeSplit[0];
    let reservationTimeMinutes = reservationTimeSplit[1];
    let reservationTime = new Date(reservationTimeHours, reservationTimeMinutes);
    if(reservationTime.getTime() === reservationTime.getTime()){
      return {isValid: false, error: "reservation_time is already taken"};
    }
  }



  
  return {isValid:true};

}


module.exports = {
  list,
  newRes,
};
