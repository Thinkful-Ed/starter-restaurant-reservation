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
    
        </tr>
      </thead>
      <tbody>
      {reservations.filter(({ reservation_date }) => reservation_date === date).map(({reservation_id, first_name, last_name, mobile_number, reservation_time, people}) => (
                <tr key={reservation_id}>
                <td>{last_name}</td>
                <td>{first_name}</td>
                <td>{mobile_number}</td>
                <td>{reservation_time}</td>
                <td>{people}</td>
                <td><Link to={`/reservations/${reservation_id}/seat`} type="button" className="btn btn-success">Seat</Link></td>
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