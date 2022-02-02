import React, { useState }  from 'react'
import { useHistory } from 'react-router-dom'
import {asDateString} from "../../utils/date-time"
import { createReservation } from "../../utils/api.js"
import ReservationForm from './ReservationForm'
function NewReservation() {
    const date = new Date()
    const history = useHistory()
    
    const initialFormState = {
        first_name:"",
        last_name:"",
        mobile_number:"",
        reservation_date:asDateString(date),
        reservation_time:date.toTimeString().slice(0,5),
        people:"",
    }

    const [form, setForm] = useState({...initialFormState})
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.id]: e.target.value,
        });
      };
      const handleNumberChange = (e) => {
        setForm({
          ...form,
          [e.target.id]: Number(e.target.value),
        });
        // console.log( typeof Number(e.target.value))
      };
      const handleSubmission =async (e)=>{
          e.preventDefault()
          const AC = new AbortController()
          createReservation(form,AC.signal)
          .then(()=>history.push(`/dashboard?date=${form.reservation_date}`))
          .catch(setError)
          return () => AC.abort();
      }
    return (
      <div style={{marginTop:"75px"}}>
      <ReservationForm handleSubmission={handleSubmission} handleChange={handleChange} error={error} handleNumberChange={handleNumberChange} form={form}/>
      </div>
      )
}

export default NewReservation