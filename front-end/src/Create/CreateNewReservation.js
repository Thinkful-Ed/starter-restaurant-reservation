import React, {useState, useEffect} from "react";
import {useParams, Link, useHistory} from "react-router-dom"
import { createReservation } from "../utils/api";


export default function CreateNewReservation(){
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_time: "",
    reservation_date: "",
    people: 0
  }
  const [formData, setFormData] = useState({...initialFormState})
  const [errorMessages, setErrorMessages] = useState("");
  const history = useHistory();



  function handleSubmit(event){
    event.preventDefault();
    async function addReservationToList(){
      try{
        await createReservation(formData);
        history.push(`/dashboard?date=${formData.reservation_date}`)

      }catch (error){
        if (error.name === "AbortError"){
          console.log("Aborted");
        }
        else{
          setErrorMessages(error.message)
          throw error;

        }
      }
    }
    addReservationToList();

  }
  function changeHandler(event){
    let stateValue = event.target.value;
    if(event.target.name === "people") {
      console.log("stateValue", stateValue)
      console.log("typeof stateValue before", typeof stateValue)

      stateValue = parseInt(stateValue, 10)

      console.log("typeof stateValue after", typeof stateValue)
    }
    setFormData({...formData, [event.target.name]: stateValue})
  }
  return(
    <>
    {errorMessages && <p className = "alert alert-danger" >{errorMessages}</p>}
    <form onSubmit={handleSubmit}>
      <div className = "form-group">
        <label> First Name</label>
        <input
        name = "first_name"
        type = "text"
        //required = {true}
        value = {formData.first_name} onChange={changeHandler}
        />
        <label>Last Name</label>
        <input
        name = "last_name"
        type = "text"
        required = {true}
        value = {formData.last_name} onChange = {changeHandler}
        />
        <label>Mobile Number</label>
        <input
        name = "mobile_number"
        type = "text"
        required = {true}
        value = {formData.mobile_number} onChange = {changeHandler}
        />
        <label>Reservation Date</label>
        <input
        name = "reservation_date"
        type = "date"
        required = {true}
        value = {formData.reservation_date} onChange = {changeHandler}
        />
        <label>Reservation Time</label>
        <input
        name = "reservation_time"
        type = "time"
        required = {true}
        value = {formData.reservation_time} onChange = {changeHandler}
        />
        <label>People</label>
        <input
        name = "people"
        type = "number"
        required = {true}
        value = {formData.people} onChange = {changeHandler}
        />
        <button type="submit">Submit</button>
        <button type= "button" onClick ={()=>history.goBack()}>Cancel</button>
      </div>
    </form>
    </>

  )
}

//table to store reservations (migrations)
//backend post route that can receive information and save it into db
// can test with porstman ^