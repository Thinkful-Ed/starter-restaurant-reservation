import React from "react";
import { Link } from "react-router-dom"

function ReservationsList({reservations}){
    const rows = reservations.map(({ reservation_id, first_name, last_name, mobile_number, people, reservation_time, reservation_date }, index) => (
        <tr key={index}>
          <td>{first_name}</td>
          <td>{last_name}</td>
          <td>{mobile_number}</td>
          <td>{people}</td>
          <td>{reservation_date}</td>
          <td>{reservation_time}</td>
          <td><button name="seat" className="btn btn-primary"><Link href="/reservations/${reservation_id}/seat" to={`/reservations/${reservation_id}/seat`} style={{color: 'white'}}>Seat</Link></button></td>
        </tr>
    ));
    return (
        <div className="reservations-list">
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone #</th>
                <th>Party Size</th>
                <th>Reservation Date</th>
                <th>Reservation Time</th>
              </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
          </table>
        </div>
      );
}

export default ReservationsList;