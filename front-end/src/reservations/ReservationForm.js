import React from "react";
import {useHistory} from "react-router-dom";

function ReservationForm ({reservationFormData, handleReservationChange, handleReservationSubmit}){
const history = useHistory();
    return (

        <form name="Reservations" onSubmit={handleReservationSubmit}>
          <table className="table table-bordered"> 
          <tbody>
          <tr><th>Add/Edit a Reservation</th></tr>
          <tr><td>
            <label className="p-3" htmlFor="ireservation_id">Reservation ID</label>
            <input name="reservation_id"
                    id="reservation_id"
                    type="number"
                    placeholder="Reservation Id"
                    onChange={handleReservationChange}
                    value={reservationFormData.reservation_id} required readOnly/>
                    </td></tr>
            <tr><td>
            <label className="p-3" htmlFor="first_name">First Name</label>
            <input name="first_name"
                    id="first_name"
                    placeholder="First Name"
                    type="text"
                    onChange={handleReservationChange}
                    value={reservationFormData.first_name} required/>
                    </td></tr>
                    <tr><td>
            <label className="pr-3" htmlFor="last_name">Last Name</label>
            <input name="last_name"
                    id="last_name"
                    placeholder="Last Name"
                    type="text"
                    onChange={handleReservationChange}
                    value={reservationFormData.last_name} required/>
                    </td></tr>
                    <tr><td>
            <label className="pr-3" htmlFor="mobile_number">Mobile Number</label>
            <input name="mobile_number"
                    id="mobile_number"
                    placeholder="Mobile Number"
                    type="text"
                    onChange={handleReservationChange}
                    value={reservationFormData.mobile_number} required/>
                    </td></tr>
                    <tr><td>
            <label className="pr-3" htmlFor="reservation_date">Date of Reservation</label>
            <input name="reservation_date"
                    id="reservation_date"
                    placeholder="Reservation Date"
                    type="date"
                    onChange={handleReservationChange}
                    value={reservationFormData.reservation_date} required/>
                    </td></tr>
                    <tr><td>
            <label className="pr-3" htmlFor="reservation_time">Time of Reservation</label>
            <input name="reservation_time"
                    id="reservation_time"
                    placeholder="Reservation Time"
                    type="time"
                    onChange={handleReservationChange}
                    value={reservationFormData.reservation_time} required/>
                    </td></tr>
                    <tr><td>
            <label className="pr-3" htmlFor="people"># of People</label>
            <input name="people"
                    id="people"
                    placeholder="people"
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
    );
}
export default ReservationForm;