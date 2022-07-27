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
  console.log(output);
  res.json({
    data:output
  });

}

async function createReservation(newReservation, abortSignal) {
  //use knex to create a new reservation on the postgresql database
  //return the new reservation
  console.log("creating reservation");
  const response = await knex("reservations")
    .insert(newReservation)
    .returning("*")
    .catch((err) => {
      console.log(err);
    }
    );
  return response;

}

async function newRes(req, res) {
  //send a form to create a new reservation
  //fields: firstName, lastName, phone, date, time, partySize
  //on submit, update the database with the new reservation
  let { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = req.body.data;
  console.log(req.body);
  console.log(first_name, last_name, mobile_number, reservation_date, reservation_time, people);
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
    console.log("validated")
    const response = await createReservation(newReservation, abortSignal);
    res.status(201);
    res.json({ data: newReservation });
    //redirect to the new reservation
  }
  else{
    res.status(400);
    res.json({ error: check.error });
  }
  

}

function _formValidator(form){
  console.log("validating");
  //internal function to validate the form data
  //returns true if the form is valid
  //returns false if the form is invalid
  const { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = form;
  const formMap = ["first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"];
  for(let i=0; i<formMap.length; i++){
    if(!form[formMap[i]]){
      console.log("invalid");
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
    return {isValid: false, error: "Date cannot be on a Tuesday"};
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

  //check that people is a valid number
  if(isNaN(people)){
    return {isValid: false, error: "Invalid people"};
  }



  
  return {isValid:true};

}


module.exports = {
  list,
  newRes,
};
