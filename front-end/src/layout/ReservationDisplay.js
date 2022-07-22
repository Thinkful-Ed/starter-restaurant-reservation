import React from "react";

export default function ReservationDisplay(reservation){
    const {
        reservation_id,
        first_name,
        last_name,
        mobile_number,
        reservation_date,
        reservation_time,
        people,
      } = reservation.reservation;


    return (
        <table>
            <tr>
                <th>Reservation ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Mobile Number</th>
                <th>Reservation Date</th>
                <th>Reservation Time</th>
                <th>Number of People</th>
            </tr>
            <tr>
                <td>{reservation_id}</td>
                <td>{first_name}</td>
                <td>{last_name}</td>
                <td>{mobile_number}</td>
                <td>{reservation_date}</td>
                <td>{reservation_time}</td>
                <td>{people}</td>
                <td>
                    <a
                    type="button" 
                    className="btn btn-dark"
                    href={`/reservations/${reservation_id}/seat`}
                    >
                        Seat
                    </a>
                </td>
            </tr>
        </table>
    )
    
    // <h1>{first_name}</h1>
}