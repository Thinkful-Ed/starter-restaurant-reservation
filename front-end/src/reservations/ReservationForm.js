import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationForm ({reservationFormData, handleReservationChange, handleReservationSubmit}){
const history = useHistory();
const [formErrors, setFormErrors] = useState([]);

const validDate = (reservation) =>{
const rDate = reservation.reservation_date;
const rTime = reservation.reservation_time;
  const d = new Date(`${rDate}T${rTime}`);
  const errors = [];
  const tooday = new Date();
  const toodayToLocaleString = tooday.toLocaleDateString();
  const dateToLocaleString = d.toLocaleDateString();
  let day = d.getDay();
  let t = d.toLocaleTimeString();
let now = tooday.toLocaleTimeString();

if((dateToLocaleString < toodayToLocaleString) || (dateToLocaleString === toodayToLocaleString && t < now)){
        errors.push({key:1, message:'Form: Reservation must be in the future'})
}
if(day === 2){
  errors.push({key:2, message:'Form: We are closed on Tuesday'})
}
 return errors;
  
}

const formValidation = (event)=>{
        event.preventDefault();
       const dateError = validDate(reservationFormData);
       setFormErrors([dateError])
        if(formErrors.length === 0){
        handleReservationSubmit(event);
}}

    return (
        <div>
        {formErrors && formErrors.map((formError)=>(
                <ErrorAlert error={formError} />
               ))}
        <form name="Reservations" onSubmit={formValidation}>
        <table className="table table-bordered table-condensed table-striped">
          <tbody>
          <tr><th colSpan={"3"}>Add/Edit a Reservation</th></tr>
            <tr>
                <td><label htmlFor="first_name">First Name</label></td>
                <td><label htmlFor="last_name">Last Name</label></td>
                <td><label htmlFor="mobile_number">Mobile Number</label></td>
            </tr>
            <tr>
                <td><input name="first_name"
                    id="first_name"
                    placeholder="First Name"
                    type="text"
                    onChange={handleReservationChange}
                    value={reservationFormData.first_name} required/>
                    </td>
                <td><input name="last_name"
                    id="last_name"
                    placeholder="Last Name"
                    type="text"
                    onChange={handleReservationChange}
                    value={reservationFormData.last_name} required/>
                    </td>
                <td><input name="mobile_number"
                    id="mobile_number"
                    placeholder="Mobile Number"
                    type="text"
                    onChange={handleReservationChange}
                    value={reservationFormData.mobile_number} required/>
                    </td>
                    </tr>
           <tr>
                <td><label htmlFor="reservation_date">Date of Reservation</label></td>
                <td> <label htmlFor="reservation_time">Time of Reservation</label></td>
                <td><label htmlFor="people"># of People</label></td>
                </tr>
          <tr>
                <td><input name="reservation_date"
                    id="reservation_date"
                    placeholder="Reservation Date"
                    type="date"
                    onChange={handleReservationChange}
                    value={reservationFormData.reservation_date} required/>
                    </td>
                <td><input name="reservation_time"
                    id="reservation_time"
                    placeholder="Reservation Time"
                    type="time"
                    onChange={handleReservationChange}
                    value={reservationFormData.reservation_time} required/>
                    </td>
                <td><input name="people"
                    id="people"
                    placeholder="# of People"
                    type="number"
                    onChange={handleReservationChange}
                    value={reservationFormData.people} required/>
                    </td></tr>
                    <tr><td>
                    <button type="submit" className="btn btn-primary mr-3">Submit</button>
                    <button  type="button" onClick={()=> history.goBack()} className="btn btn-danger">Cancel</button>

                    </td></tr>
                    </tbody>
            </table>
        </form>
        </div>
    );
}
export default ReservationForm;