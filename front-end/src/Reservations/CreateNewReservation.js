import React, {useState, useEffect} from "react";
import {useParams, Link, useHistory} from "react-router-dom"
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

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

    if(event.target.name === "people" && stateValue) {
      // console.log("stateValue", stateValue)
      // console.log("typeof stateValue before", typeof stateValue)

      stateValue = parseInt(stateValue, 10)

      // console.log("typeof stateValue after", typeof stateValue)
    }
    setFormData({...formData, [event.target.name]: stateValue})
  }

  return(
    <ReservationForm eventType="create" />
  )
}

