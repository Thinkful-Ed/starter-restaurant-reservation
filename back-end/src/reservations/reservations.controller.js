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
  const { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = req.body;
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
  if(_formValidator(newReservation)){
    console.log("validated")
    const response = await createReservation(newReservation, abortSignal);
    
    //redirect to the new reservation
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
      return false;
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
  
  return true;

}


module.exports = {
  list,
  newRes,
};
