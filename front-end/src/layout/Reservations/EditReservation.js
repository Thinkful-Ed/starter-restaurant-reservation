import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router'
import { readReservation, updateReservation } from '../../utils/api'
import { formatAsDate } from '../../utils/date-time'
import ReservationForm from './ReservationForm'

function EditReservation() {
    const history = useHistory()
    const {reservation_id} = useParams()
    const initialFormState = {
        first_name:"",
        last_name:"",
        mobile_number:"",
        reservation_date:"",
        reservation_time:"",
        people:"",
    }
    const [form, setForm] = useState(initialFormState)
    const [error, setError] = useState(null);

    useEffect(loadReservation,[reservation_id])

    function loadReservation(){
        const abortController = new AbortController();
        setError(null);
        readReservation(reservation_id, abortController.signal)
          .then(setForm)
          .catch(setError);
        return () => abortController.abort();
      }
    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.id]: e.target.value,
        });
        console.log(form)
      };
      const handleNumberChange = (e) => {
        setForm({
          ...form,
          [e.target.id]: Number(e.target.value),
        });
      };
      const handleSubmission =async (e)=>{
          e.preventDefault()
          const AC = new AbortController()
          updateReservation(form,AC.signal)
          .then(()=>history.push(`/dashboard?date=${form.reservation_date}`))
          .catch(setError)
          return () => AC.abort();
      }
      if(form.first_name){
          form.reservation_date = formatAsDate(form.reservation_date)
      }
    return (
      <div style={{marginTop:"75px"}}>
        <ReservationForm handleSubmission={handleSubmission} handleChange={handleChange} error={error} handleNumberChange={handleNumberChange} form={form}/>
        </div>
    )
}

export default EditReservation