import ErrorAlert from "../layout/ErrorAlert";
import React, { useState, useEffect } from "react";
import { listReservations } from "../utils/api";
import { Link } from "react-router-dom";


const ReservationsTable = ({ date }) => {

    const [reservations, setReservations] = useState([]);
    const [reservationsError, setReservationsError] = useState(null);
  
    useEffect(loadReservations, [date]);
  
  
    function loadReservations() {
      const abortController = new AbortController();
      setReservationsError(null);
      listReservations({ date }, abortController.signal)
        .then(setReservations)
        .catch(setReservationsError);
      return () => abortController.abort();
    }

    function renderTable (reservations) {


        return (
          <div className="row g-2">
            <table className="table table-dark">
      <thead>
        <tr>
          <th scope="col">Last Name</th>
          <th scope="col">First Name</th>
          <th scope="col">Mobile Number</th>
          <th scope="col">Time</th>
          <th scope="col">Party Of</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
      {reservations.filter((reservation) => reservation.reservation_date === date)
      .map((reservation) => 
      (
                <tr key={reservation.reservation_id}>
                <td>{reservation.last_name}</td>
                <td>{reservation.first_name}</td>
                <td>{reservation.mobile_number}</td>
                <td>{reservation.reservation_time}</td>
                <td>{reservation.people}</td>
                <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
                {reservation.status === "booked" && <td><Link to={`/reservations/${reservation.reservation_id}/seat`} type="button" className="btn btn-success">Seat</Link></td>}
              </tr>
        ))}
      </tbody>
    </table>
    
          </div> 
        )
      }

    return ( 
        <div>
        <ErrorAlert error={reservationsError}/>
        {renderTable(reservations)}
        </div>
     );
}
 
export default ReservationsTable;