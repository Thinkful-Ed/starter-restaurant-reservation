import React from "react";
import {useHistory} from "react-router-dom";


function ReservationForm ({reservationFormData, handleReservationChange, handleReservationSubmit}){
const history = useHistory();
    return (

        <form name="createReservation" onSubmit={handleReservationSubmit}>
          <table className="table table-bordered"> 
          <tbody>
          <tr><th>Add/Edit a Reservation</th></tr>
          <tr><td>
            <label className="p-3" htmlFor="id">Reservation ID</label>
            <input name="id"
                    id="id"
                    placeholder="Reservation Id"
                    onChange={handleReservationChange}
                    value={reservationFormData.reservationId} required readOnly/>
                    </td></tr>
            <tr><td>
            <label className="p-3" htmlFor="first_name">First Name</label>
            <input name="first_name"
                    id="first_name"
                    placeholder="first_name"
                    type="text"
                    onChange={handleReservationChange}
                    value={reservationFormData.first_name} required/>
                    </td></tr>
                    <tr><td>
            <label className="pr-3" htmlFor="last_name">Last Name</label>
            <input name="last_name"
                    id="last_name"
                    placeholder="last_name"
                    type="text"
                    onChange={handleReservationChange}
                    value={reservationFormData.last_name} required/>
                    </td></tr>
                    <tr><td>
            <label className="pr-3" htmlFor="phone">Phone</label>
            <input name="phone"
                    id="phone"
                    placeholder="phone"
                    type="text"
                    onChange={handleReservationChange}
                    value={reservationFormData.phone} required/>
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