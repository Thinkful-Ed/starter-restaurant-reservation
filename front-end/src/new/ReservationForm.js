import React, {useState} from "react";
import { useHistory} 
    //useParams} 
    from "react-router-dom"
import {postReservation} from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert";

function ReservationForm(){
    //const {reservation_id} = useParams()
    const [reservationsError, setReservationsError] = useState([]);
    const history= useHistory();


    const initialFormState= {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    }

    const [form, setForm] = useState({...initialFormState})
    
    //make reservations error


    const handleChange = ({target}) => {
        let value = target.value;
        if(target.name==="people" && typeof value === "string"){
            value = +value
        }

        if(target.name==="reservation_date"){
        const date = new Date(form.reservation_date);
        const today = new Date();
        const dayOfReservation = date.getUTCDay();
      
        if(dayOfReservation===2 && date < today){
          setReservationsError([
              "The restaurant is closed on Tuesdays.",
              "Reservations must be made for a future date."
         ]) 
        } else if(dayOfReservation === 2){
            setReservationsError(["The restaurant is closed on Tuesdays."])
        } else if(date < today){
            setReservationsError(["Reservations must be made for a future date."])
        } else {
            setReservationsError([])
        }
      }
        setForm({
            ...form, 
            [target.name]: target.value,
        })
        console.log(target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        setReservationsError([]);

        postReservation(form, abortController.signal)
        .then(()=> history.push(`/dashboard?date=${form.reservation_date}`))
        .catch(setReservationsError)      
        
        return ()=> abortController.abort();
    }

    return (
        <>
        <ErrorAlert error = {reservationsError}/>
        <h1>Make a Reservation</h1>
        <form onSubmit = {handleSubmit}>
            <div className="container">
            <div className="form-group">
                <label htmlFor="first_name">
                    First Name:
                    <input 
                        type="text" 
                        id="first_name" 
                        name="first_name"
                        placeholder="First Name"
                        onChange = {handleChange}
                        required = {true}
                        value = {form.first_name}
                    />
                </label>
            </div>
            
            <div className="form-group">
                <label htmlFor="last_name">
                    Last Name:
                    <input 
                        type="text" 
                        id="last_name" 
                        name="last_name"
                        placeholder= "Last Name"
                        onChange = {handleChange}
                        required = {true}
                        value = {form.last_name}
                    />
                </label>
            </div>

            <div className="form-group">
                <label htmlFor="mobile_number">
                    Phone number: 
                    <input 
                        type="tel" 
                        id="telNo" 
                        name="mobile_number" 
                        placeholder="1234567890"
                        onChange = {handleChange}
                        required = {true}
                        value = {form.mobile_number}
                    />
                </label>
            </div>

            <div className="form-group">
                <label htmlFor="reservation_date">
                    Reservation Date: 
                    <input 
                        type="date" 
                        id="reservation_date" 
                        name="reservation_date"
                        onChange= {handleChange}
                        required = {true}
                        value = {form.reservation_date}
                    />
                </label>
            </div>

            <div className="form-group">
                <label htmlFor="reservation_time">
                    Reservation Time: 
                    <input 
                        type="time" 
                        id="reservation_time" 
                        name="reservation_time"
                        onChange = {handleChange}
                        required = {true}
                        value = {form.reservation_time} 
                    />
                </label>
            </div>

            <div className="form-group">
                <label htmlFor="people">
                    Number of People in Party: 
                    <input 
                        type="number" 
                        id="people" 
                        name="people"
                        min="1" 
                        required = {true}
                        onChange= {handleChange}
                        value= {form.people}
                    />
                </label>
            </div>
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
            <button type="button" className="btn btn-secondary" onClick={()=> history.goBack()}>Cancel</button>
            
 
        </form>
        </>
    )
 /*
 any error messages returned from API
*/
}

export default ReservationForm;